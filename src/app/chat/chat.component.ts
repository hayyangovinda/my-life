import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UtilsService } from '../services/utils.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharingService } from '../services/sharing.service';
import { LongPressDirective } from '../directives/long-press.directive';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatSidenavModule, LongPressDirective],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  inputs: string[] = [];
  todayDate: Date = new Date('2023-5-1');
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
  messages: { text: string; type: 'received' | 'sent' }[] = [
    { text: "Hello! What's new today?", type: 'received' },
  ];
  response: string = '';
  audioSrc: string = '';
  ngOnInit(): void {
    const todayDate = this.utilsService.formatDateToStartOfDayUTC(
      this.todayDate
    );
    this.setUpAudio();
    this.httpService.getDayChat(todayDate).subscribe((response: any) => {
      if (response.length) {
        this.todayChat = response[0];
        console.log(this.todayChat);
        this.messages = this.todayChat.inputs;
      } else {
        this.httpService
          .createDayChat({
            date: todayDate,
            inputs: [{ text: "Hello! What's new today?", type: 'received' }],
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
      this.messages.push({ text: this.newMessage, type: 'sent' });

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

      this.messages.push({ text: randomResponse, type: 'received' });

      this.todayChat.inputs = this.messages;

      this.httpService
        .updateDayChat(this.todayChat._id, {
          inputs: this.todayChat.inputs,
        })
        .subscribe((response: any) => {
          console.log('update', response);
        });
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
  }

  setUpAudio() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = (e) => {
          this.chunks.push(e.data);
        };

        this.recorder.onstop = () => {
          const blob = new Blob(this.chunks, { type: 'audio/wav' });
          this.chunks = [];
          const audioUrl = URL.createObjectURL(blob);

          this.audioSrc = audioUrl;
          this.selectedFile = new File([blob], 'recording.wav', {
            type: 'audio/wav',
          });
          this.transcribeAudio();
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
      console.log('recording stopped');
      this.isRecording = false;
    } else {
      this.recorder?.start();
      console.log('recording started');
      this.isRecording = true;
    }
  }

  transcribeAudio() {
    if (!this.selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('audio', this.selectedFile);
    this.httpService.transcribeAudio(formData).subscribe((response: any) => {
      console.log(response);
      this.response = response;
    });
  }
}
