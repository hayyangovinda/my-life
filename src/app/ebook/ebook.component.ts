import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { startOfYear, endOfYear, add, set } from 'date-fns';
import { SharingService } from '../services/sharing.service';
import { HttpService } from '../services/http.service';
import jsPDF from 'jspdf';
import { PdfComponent } from '../pdf/pdf.component';
import { LoaderComponent } from '../loader/loader.component';
import { UtilsService } from '../services/utils.service';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Capacitor, PermissionState } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { FileOpener } from '@capacitor-community/file-opener';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-ebook',
  standalone: true,
  imports: [
    DatePipe,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    PdfComponent,
    LoaderComponent,
  ],
  templateUrl: './ebook.component.html',
  styleUrls: [
    '../chat/chat.component.css',
    '../daily-stories/daily-stories.component.css',
    './ebook.component.css',
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class EbookComponent implements OnInit {
  @ViewChild('pdf') pdf!: ElementRef;
  currentYear = new Date();
  firstDayOfYear = startOfYear(this.currentYear);
  lastDayOfYear = endOfYear(this.currentYear);
  sharingService = inject(SharingService);
  range = new FormGroup({
    start: new FormControl<Date | null>(this.firstDayOfYear),
    end: new FormControl<Date | null>(this.lastDayOfYear),
  });
  showLoaders = false;

  httpService = inject(HttpService);
  utilsService = inject(UtilsService);
  imgSrcs: string[] = [];
  storiesArray: {
    date: string;
    story: string;
  }[] = [];
  story!: string;
  imgsrcArray: any[] = [];
  date!: Date | undefined;

  ngOnInit() {
    this.getAllChats();
    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (notification) => {
        const filePath = notification.notification.extra.filePath;
        console.log({ filePath });
        this.openPdf(filePath);
      }
    );
  }

  async openPdf(filePath: string) {
    if (Capacitor.getPlatform() === 'android') {
      try {
        console.log('Attempting to open file:', filePath);

        // Get the file URI
        const fileInfo = await Filesystem.getUri({
          path: filePath,
          directory: Directory.Documents,
        });
        console.log('File URI:', fileInfo.uri);

        // Try File Opener first
        try {
          await FileOpener.open({
            filePath: fileInfo.uri,
            contentType: 'application/pdf',
          });
        } catch (fileOpenerError) {
          console.error('File Opener failed:', fileOpenerError);

          // Fallback to using Browser.open
          await Browser.open({ url: fileInfo.uri });
        }
      } catch (error) {
        console.error('Error opening PDF:', JSON.stringify(error, null, 2));
        alert('Unable to open PDF. Please check the console for details.');
      }
    } else {
      console.log('Opening PDF not implemented for this platform');
    }
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  async onGenerateClick() {
    this.showLoaders = true;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.getHeight();
    const x = 3;
    const y = 0;
    const scale = 0.19;
    const storiesArray = this.storiesArray;
    const pdfTemplate = this.pdf.nativeElement;
    const removeEmoji = this.removeEmojis;
    const imgsrcArray = this.imgsrcArray;

    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    };

    const savePDF = async (pdf: jsPDF): Promise<void> => {
      try {
        const pdfOutput = pdf.output('arraybuffer');
        const base64Data = arrayBufferToBase64(pdfOutput);
        const randomNumber = Math.floor(Math.random() * 100000);
        const fileName = `ebook-${randomNumber}.pdf`;
        const filePath = `${Directory.Documents}/${fileName}`;
        console.log(filePath);

        await Filesystem.writeFile({
          path: filePath,
          data: base64Data,
          directory: Directory.Documents,
          recursive: true,
        });

        this.showNotification(fileName, filePath);
      } catch (error) {
        console.error('Unable to save file', error);
        alert('Error saving PDF. Please try again.');
      } finally {
        this.showLoaders = false;
      }
    };

    const addPageToPDF = async (pageIndex: number): Promise<void> => {
      if (pageIndex >= storiesArray.length) {
        await savePDF(pdf);
        return;
      }

      console.log('processing page ' + pageIndex);
      this.story = removeEmoji(storiesArray[pageIndex].story);
      this.imgSrcs = imgsrcArray[pageIndex];
      this.date = new Date(storiesArray[pageIndex].date);

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          pdf.html(pdfTemplate, {
            callback: (pdfInstance) => {
              if (pageIndex < storiesArray.length - 1) {
                pdfInstance.addPage('a4', 'p');
              }
              resolve();
            },
            x: x,
            y: pageIndex * pageHeight + y,
            html2canvas: { scale },
          });
        }, 500);
      }).then(() => addPageToPDF(pageIndex + 1));
    };

    try {
      await addPageToPDF(0);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
      this.showLoaders = false;
    }
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  onDateChange(event: any) {
    const startValue = this.range.value.start;
    const endValue = this.range.value.end;
    if (startValue && endValue) {
      const dateParams: any = this.utilsService.getCorrectDateFormat(
        startValue,
        endValue
      );
      if (dateParams) {
        dateParams.sorted = true;
      }

      this.getAllChats(dateParams);
    }
  }

  private async showNotification(fileName: string, filePath: string) {
    console.log(filePath);
    const notificationId = Math.floor(Math.random() * 100000); // Generate a random integer

    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'PDF Download Complete',
          body: `Your file ${fileName} is ready to view`,
          id: notificationId,
          extra: {
            filePath: filePath,
          },
        },
      ],
    });
  }

  getAllChats(params = { sorted: true }) {
    this.showLoaders = true;
    this.httpService.getAllDayChats(params).subscribe(
      (chats: any) => {
        console.log(chats);
        this.storiesArray = chats.map((chat: any) => {
          return { date: chat.date, story: chat.story };
        });

        chats.forEach((chat: any) => {
          const dayImgArray: any = [];
          chat.inputs.forEach((input: any) => {
            if (input.type === 'sent' && input.image) {
              dayImgArray.push(input.image);
            }
          });
          this.imgsrcArray.push(dayImgArray);
        });
        this.showLoaders = false;
      },
      (error) => {
        console.log(error);
        this.showLoaders = false;
      }
    );
  }

  removeEmojis(input: string) {
    // Regular expression to match emojis
    const emojiAndSpecialCharsRegex = /[\p{C}\p{S}]/gu; // \p{C} for other characters, \p{S} for symbols
    // Replace with an empty string
    return input?.replace(emojiAndSpecialCharsRegex, '');
  }
}
