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

  httpService = inject(HttpService);
  imgSrcs: string[] = [];
  storiesArray: {
    date: string;
    story: string;
  }[] = [];
  story!: string;
  imgsrcArray: any[] = [];
  date!: Date | undefined;

  ngOnInit() {
    this.httpService.getAllDayChats().subscribe((chats: any) => {
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
      console.log('this.storiesArray: ', this.storiesArray);
      console.log('this.imgsrcArray: ', this.imgsrcArray);
    });
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  // onGenerateClick() {
  //   const taskInterventionPdf = this.pdf.nativeElement;
  //   const pdf = new jsPDF('p', 'mm', 'a4');

  //   const pageHeight = pdf.internal.pageSize.getHeight();

  //   // Positioning the table
  //   const x = 3;
  //   const y = 0;
  //   // Scale the table to fit the PDF width
  //   const scale = 0.19;
  //   const marginTopBottom = 28;
  //   const marginLeftRight = 0;
  //   const storiesArray = this.storiesArray;
  //   const pdfTemplate = this.pdf.nativeElement;
  //   const removeEmoji = this.removeEmojis;
  //   const sharingService = this.sharingService;
  //   const imgsrcArray = this.imgsrcArray;
  //   let imgSrcs = this.imgSrcs;
  //   function addTableCopyToPDF(pageIndex: number, doc: jsPDF) {
  //     if (pageIndex >= storiesArray.length) {
  //       pdf.save(`ebook.pdf`);
  //       return;
  //     }
  //     pdfTemplate.querySelector('p').innerHTML = removeEmoji(
  //       storiesArray[pageIndex].story
  //     );
  //     imgSrcs = imgsrcArray[pageIndex];
  //     sharingService.updateDate(new Date(storiesArray[pageIndex].date));

  //     pdf.html(pdfTemplate, {
  //       callback: function (pdfInstance) {
  //         if (pageIndex <= storiesArray.length - 1) {
  //           pdfInstance.addPage('a4', 'p');
  //         }
  //         addTableCopyToPDF(pageIndex + 1, pdf);
  //       },
  //       x: x,
  //       y: pageIndex * pageHeight + y,
  //       html2canvas: { scale },
  //     });
  //   }
  //   addTableCopyToPDF(0, pdf);

  //   // doc.html(taskInterventionPdf, {
  //   //   x, // Set x position
  //   //   y, // Set y position
  //   //   html2canvas: { scale },
  //   //   callback: (doc) => {
  //   //     doc.save('report');
  //   //   },
  //   // });
  // }

  onGenerateClick() {
    const taskInterventionPdf = this.pdf.nativeElement;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Positioning the table
    const x = 3;
    const y = 0;
    // Scale the table to fit the PDF width
    const scale = 0.19;
    const marginTopBottom = 28;
    const marginLeftRight = 0;
    const storiesArray = this.storiesArray;
    const pdfTemplate = this.pdf.nativeElement;
    const removeEmoji = this.removeEmojis;
    const sharingService = this.sharingService;
    const imgsrcArray = this.imgsrcArray;

    const addTableCopyToPDF = (pageIndex: number, doc: jsPDF) => {
      if (pageIndex >= storiesArray.length) {
        pdf.save(`ebook.pdf`);

        return;
      }

      this.story = removeEmoji(storiesArray[pageIndex].story);
      this.imgSrcs = imgsrcArray[pageIndex];
      this.date = new Date(storiesArray[pageIndex].date);

      setTimeout(() => {
        pdf.html(pdfTemplate, {
          callback: (pdfInstance) => {
            setTimeout(() => {
              if (pageIndex <= storiesArray.length - 1) {
                pdfInstance.addPage('a4', 'p');
              }
              addTableCopyToPDF(pageIndex + 1, pdf);
            }, 500);
          },
          x: x,
          y: pageIndex * pageHeight + y,
          html2canvas: { scale },
        });
      }, 500);
    };
    addTableCopyToPDF(0, pdf);
  }

  removeEmojis(input: string) {
    // Regular expression to match emojis
    const emojiAndSpecialCharsRegex = /[\p{C}\p{S}]/gu; // \p{C} for other characters, \p{S} for symbols
    // Replace with an empty string
    return input?.replace(emojiAndSpecialCharsRegex, '');
  }
}
