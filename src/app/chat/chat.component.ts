import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
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
  newMessage: string = '';
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Add user's message
      this.messages.push({ text: this.newMessage, type: 'sent' });

      // Array of possible responses
      const responses = [
        'Got it!',
        'Understood!',
        'Noted!',
        'Message received!',
        'Roger that!',
        'Gotcha!',
      ];

      // Select a random response
      const randomIndex = Math.floor(Math.random() * responses.length);
      const randomResponse = responses[randomIndex];

      // Auto reply with the random response
      this.messages.push({ text: randomResponse, type: 'received' });

      // Clear the input field after sending
      this.newMessage = '';

      // Scroll to the bottom of the chat
      this.scrollChatToBottom();
    }
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line in textarea
      this.sendMessage();
    }
  }

  // Scrolls chat to bottom after new message is added
  private scrollChatToBottom() {
    setTimeout(() => {
      const chatBody = document.getElementById('chatBody');
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 0);
  }
}
