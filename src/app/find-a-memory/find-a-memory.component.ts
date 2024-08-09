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
import { VoiceRecorder } from 'capacitor-voice-recorder';
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
    VoiceRecorder.requestAudioRecordingPermission().then((result) => {
      console.log(result);
    });
    this.httpService.getAllDayChats().subscribe((response: any) => {
      this.contextArray = response.map((resp: any) => {
        return { date: resp.date, story: resp.story, id: resp._id };
      });
      this.contextString = JSON.stringify(this.contextArray);
    });
  }
  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }
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

  transcribeAudioBlob(formData: FormData) {
    this.showLoaders = true;
    this.showImageLoader = true;
    this.changeDetectorRef.detectChanges();
    this.httpService.transcribeAudio(formData).subscribe(
      (response: any) => {
        console.log(response);
        this.newMessage = response.transcripts[0];

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

  startRecording() {
    if (this.isRecording) {
      return;
    }
    this.showLoaders = true;
    this.showRecordingLoader = true;
    this.isRecording = true;
    VoiceRecorder.startRecording();
  }

  async stopRecording() {
    if (!this.isRecording) {
      return;
    }
    this.showLoaders = false;
    this.showRecordingLoader = false;
    this.isRecording = false;
    VoiceRecorder.stopRecording().then(async (result) => {
      console.log({ result });
      if (result.value && result.value.recordDataBase64) {
        const recordData = result.value.recordDataBase64;
        const mimeType = result.value.mimeType;
        const file = this.base64ToFile(recordData, 'audio.aac', mimeType);
        // this.transcribeAudio(recordData);
        const formData = new FormData();
        formData.append('audio', file);
        this.transcribeAudioBlob(formData);
        console.log(file);
      }
    });
  }
  base64ToFile(base64: string, filename: string, mimeType: string): File {
    const blob = this.base64ToBlob(base64, mimeType);
    return new File([blob], filename, { type: mimeType });
  }

  base64ToBlob(base64: string, mimeType: string): Blob {
    const binaryString = atob(base64); // Remove the data URL prefix if present
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);

    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return new Blob([bytes], { type: mimeType });
  }
}
