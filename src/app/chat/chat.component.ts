import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UtilsService } from '../services/utils.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharingService } from '../services/sharing.service';
import { LongPressDirective } from '../directives/long-press.directive';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RecordLoaderComponent } from '../record-loader/record-loader.component';
import { LoaderComponent } from '../loader/loader.component';
import { VoiceRecorder } from 'capacitor-voice-recorder';

@Component({
  selector: 'app-chat',
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
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  inputs: string[] = [];
  todayDate: Date = new Date('2024-07-20');
  newMessage: string = '';
  httpService = inject(HttpService);
  utilsService = inject(UtilsService);
  sharingService = inject(SharingService);
  todayChat: any;
  showDeleteIcon: boolean = false;
  deleteIconPosition: number | null = null;
  canRecord: boolean = false;
  isRecording: boolean = false;
  recorder: MediaRecorder | null = null;
  chunks: any = [];
  selectedFile: File | null = null;
  messages: {
    text: string;
    type: 'received' | 'sent';
    image: string | null;
  }[] = [{ text: "Hello! What's new today?", type: 'received', image: null }];
  response: string = '';
  audioSrc: string = '';
  showRecordingLoader: boolean = false;
  showImageLoader: boolean = false;
  showLoaders: boolean = false;

  ngOnInit(): void {
    const todayDate = this.utilsService.formatDateToStartOfDayUTC(
      this.todayDate
    );
    VoiceRecorder.requestAudioRecordingPermission().then((result) => {
      console.log(result);
    });
    this.setUpAudio();
    this.httpService.getDayChat(todayDate).subscribe((response: any) => {
      if (response.length) {
        this.todayChat = response[0];

        this.messages = this.todayChat.inputs;
        this.scrollChatToBottom();
      } else {
        this.httpService
          .createDayChat({
            date: todayDate,
            inputs: [
              {
                text: "Hello! What's new today?",
                type: 'received',
                image: null,
              },
            ],
          })
          .subscribe((response2: any) => {
            this.todayChat = response2;
          });
      }
    });
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

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage, type: 'sent', image: null });

      const responses = [
        'Got it!',
        'Understood!',
        'Noted!',
        'Message received!',
        'Roger that!',
        'Gotcha!',
      ];

      const randomIndex = Math.floor(Math.random() * responses.length);
      const randomResponse = responses[randomIndex];

      this.messages.push({
        text: randomResponse,
        type: 'received',
        image: null,
      });

      this.todayChat.inputs = this.messages;

      this.httpService
        .updateDayChat(this.todayChat._id, {
          inputs: this.todayChat.inputs,
        })
        .subscribe((response: any) => {});
      this.newMessage = '';

      this.scrollChatToBottom();
    }
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line in textarea
      this.sendMessage();
    }
  }

  private scrollChatToBottom() {
    setTimeout(() => {
      const chatBody = document.getElementById('chatBody');
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 0);
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      !target.classList.contains('delete-icon') &&
      !target.classList.contains('sent')
    ) {
      this.showDeleteIcon = false;
      this.deleteIconPosition = null;
    }
  }

  onDeleteIconClick(i: number) {
    this.showDeleteIcon = false;
    this.deleteIconPosition = null;

    this.messages.splice(i, 2);

    this.todayChat.inputs = this.messages;
    this.httpService
      .updateDayChat(this.todayChat._id, {
        inputs: this.todayChat.inputs,
      })
      .subscribe((response: any) => {});
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

          this.audioSrc = audioUrl;

          this.selectedFile = new File([blob], 'recording.wav', {
            type: 'audio/wav',
          });
          console.log('recording-stop');
          console.log(this.selectedFile);
          const formData = new FormData();
          formData.append('audio', this.selectedFile);
          this.downloadFile(this.selectedFile);
          this.transcribeAudioBlob(formData);

          // const reader = new FileReader();
          // reader.readAsDataURL(blob);
          // reader.onloadend = () => {
          //   if (typeof reader.result === 'string') {
          //     const base64String = reader.result.split(',')[1]; // Get the base64 part of the result

          //     // Now you can send the base64String in your POST request
          //     this.transcribeAudio(base64String);
          //   } else {
          //     console.error('Error reading the file as a base64 string.');
          //   }
          // };
        };
      });
    }

    this.canRecord = true;
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

  transcribeAudio(string: string) {
    this.httpService
      .transcribeAudio({ audio: string })
      .subscribe((response: any) => {
        console.log(response);
        this.newMessage = JSON.stringify(response);
      });
  }
  transcribeAudioBlob(formData: FormData) {
    this.httpService.transcribeAudio(formData).subscribe((response: any) => {
      console.log(response);
      this.newMessage = JSON.stringify(response);
    });
  }

  openFileUploader(type: string) {
    if (type === 'camera') {
      this.fileInput.nativeElement.capture = 'environment';
    }
    if (type === 'gallery') {
      this.fileInput.nativeElement.removeAttribute('capture');
    }
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    this.showLoaders = true;
    this.showImageLoader = true;

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        // const imageUrl = e.target.result;

        const formData = new FormData();
        formData.append('image', file);
        this.httpService.uploadImage(formData).subscribe(
          (response: any) => {
            const imageUrl = response.image.src;
            this.messages.push({ text: '~img', type: 'sent', image: imageUrl });
            this.todayChat.inputs = this.messages;
            this.httpService
              .updateDayChat(this.todayChat._id, {
                inputs: this.todayChat.inputs,
              })
              .subscribe(
                (response: any) => {
                  this.showLoaders = false;
                  this.showImageLoader = false;
                  this.scrollChatToBottom();
                },
                (error: any) => {
                  this.showLoaders = false;
                  this.showImageLoader = false;
                  console.log(error);
                }
              );
          },
          (error: any) => {
            this.showLoaders = false;
            this.showImageLoader = false;
            console.log(error);
          }
        );
      };
      reader.readAsDataURL(file);
    }
  }

  downloadFile(file: any) {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  updateMessage(index: any) {
    const message = this.messages[index];

    const editedMessage = document.getElementById('sent' + index)?.innerText;

    if (editedMessage === undefined) {
      return;
    }
    this.messages[index].text = editedMessage;

    this.httpService
      .updateDayChat(this.todayChat._id, {
        inputs: this.todayChat.inputs,
      })
      .subscribe((response: any) => {});
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

        this.transcribeAudio(recordData);
      }
    });
  }
}
