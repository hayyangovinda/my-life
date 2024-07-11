import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UtilsService } from '../services/utils.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatSidenavModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  inputs: string[] = [];
  todayDate: Date = new Date();
  newMessage: string = '';
  httpService = inject(HttpService);
  utilsService = inject(UtilsService);
  sharingService = inject(SharingService);
  todayChat: any;

  ngOnInit(): void {
    const todayDate = this.utilsService.formatDateToStartOfDayUTC(
      this.todayDate
    );
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

  messages: { text: string; type: 'received' | 'sent' }[] = [
    { text: "Hello! What's new today?", type: 'received' },
  ];

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
}
