import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  inputs: string[] = [];
  todayDate: Date = new Date();
  newMessage: string = '';
  httpService = inject(HttpService);
  utilsService = inject(UtilsService);
  todayChat: any;

  ngOnInit(): void {
    const todayDate = this.utilsService.formatDateToStartOfDayUTC(
      this.todayDate
    );
    this.httpService.getDayChat(todayDate).subscribe((response: any) => {
      if (response.length) {
        this.todayChat = response[0];
        this.messages = this.todayChat.inputs;
      } else {
        this.httpService
          .createDayChat({
            date: todayDate,
            inputs: [],
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

      this.todayChat.inputs = this.newMessage;

      this.httpService.updateDayChat(this.todayChat.id, {
        inputs: this.todayChat.inputs,
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
}
