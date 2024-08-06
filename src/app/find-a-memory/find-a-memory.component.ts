import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LongPressDirective } from '../directives/long-press.directive';
import { LoaderComponent } from '../loader/loader.component';
import { RecordLoaderComponent } from '../record-loader/record-loader.component';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-a-memory',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    NgIf,
    MatSidenavModule,
    LongPressDirective,
    MatMenuModule,
    MatIconModule,
    RecordLoaderComponent,
    LoaderComponent,
    DatePipe,
  ],
  templateUrl: './find-a-memory.component.html',
  styleUrls: ['../chat/chat.component.css', './find-a-memory.component.css'],
})
export class FindAMemoryComponent implements OnInit {
  changeDetectorRef = inject(ChangeDetectorRef);
  httpService = inject(HttpService);
  router = inject(Router);
  newMessage = '';
  showRecordingLoader: boolean = false;
  showImageLoader: boolean = false;
  showLoaders: boolean = false;
  canRecord: boolean = false;
  isRecording: boolean = false;
  recorder: MediaRecorder | null = null;
  chunks: any = [];
  selectedFile: File | null = null;
  contextString: string = '';
  contextArray: any = [];
  stories: any = [];
  ngOnInit(): void {
    this.setUpAudio();
    this.httpService.getAllDayChats().subscribe((response: any) => {
      this.contextArray = response.map((resp: any) => {
        return { date: resp.date, story: resp.story, id: resp._id };
      });
      this.contextString = JSON.stringify(this.contextArray);
    });
  }
  sendMessage() {
    console.log(this.newMessage);
    this.showLoaders = true;
    this.showImageLoader = true;
    this.changeDetectorRef.detectChanges();
    const prompt =
      'Base on the above context, answer the following question, by returning only only only(not even /n,or whitespaces) an array of id or ids of the day chats that are relevant to the question. If no relevant day chats are found, return an empty array. Do not invent your own story, base it on the given prompts. Do not return anything other than the array of ids. Return the array so that it can be assigned directly to a variable in js. \n \n' +
      this.newMessage;

    const promptToSend = this.contextString + prompt;
    this.newMessage = '';

    this.httpService.generateStory({ prompt: promptToSend }).subscribe(
      (response: any) => {
        console.log('response', response);
        const responseArray = JSON.parse(response.generatedText);
        console.log('responseArray', responseArray);
        responseArray.forEach((id: any) => {
          const dayChat = this.contextArray.find((dayChat: any) => {
            return dayChat.id.trim() === id;
          });
          console.log('dayChat', dayChat);
          this.stories.push(dayChat);
        });
        this.showLoaders = false;
        this.showImageLoader = false;
        this.changeDetectorRef.detectChanges();
      },
      () => {
        this.showLoaders = false;
        this.showImageLoader = false;
        this.changeDetectorRef.detectChanges();
      }
    );
  }
  sharingService = inject(SharingService);
  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  goToStory(story: any) {
    this.sharingService.updateDayToGenerate(story);
    this.router.navigateByUrl('story/' + story.id);
  }
  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    if (textarea.value) {
      textarea.style.height = textarea.scrollHeight + 'px';
    } else {
      textarea.style.height = '40px'; // original size
    }
  }

  toggleRecording() {
    if (!this.canRecord) {
      return;
    }
    if (this.isRecording) {
      this.recorder?.stop();
      this.showLoaders = false;
      this.showRecordingLoader = false;

      this.isRecording = false;
    } else {
      this.showLoaders = true;
      this.showRecordingLoader = true;
      this.recorder?.start();

      this.isRecording = true;
    }
  }

  setUpAudio() {
    console.log('navigator', navigator.mediaDevices);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = (e) => {
          this.chunks.push(e.data);
        };

        this.recorder.onstop = () => {
          const blob = new Blob(this.chunks, { type: 'audio/aiff' });
          this.chunks = [];
          const audioUrl = URL.createObjectURL(blob);

          this.selectedFile = new File([blob], 'recording.wav', {
            type: 'audio/wav',
          });
          console.log('recording-stop');
          console.log(this.selectedFile);
          const formData = new FormData();
          formData.append('audio', this.selectedFile);
          // this.downloadFile(this.selectedFile);
          this.transcribeAudioBlob(formData);
        };
      });
    }

    this.canRecord = true;
  }

  transcribeAudioBlob(formData: FormData) {
    this.showLoaders = true;
    this.showImageLoader = true;
    this.changeDetectorRef.detectChanges();
    this.httpService.transcribeAudio(formData).subscribe(
      (response: any) => {
        console.log(response);
        this.newMessage = response.transcripts[0] + 'a';

        this.showLoaders = false;
        this.showImageLoader = false;
        this.changeDetectorRef.detectChanges();
      },
      () => {
        this.showLoaders = false;
        this.showImageLoader = false;
        this.changeDetectorRef.detectChanges();
      }
    );
  }
}
