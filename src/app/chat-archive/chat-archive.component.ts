import { Component, inject } from '@angular/core';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-chat-archive',
  standalone: true,
  imports: [],
  templateUrl: './chat-archive.component.html',
  styleUrls: ['../chat/chat.component.css', './chat-archive.component.css'],
})
export class ChatArchiveComponent {
  sharingService = inject(SharingService);
  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
}
