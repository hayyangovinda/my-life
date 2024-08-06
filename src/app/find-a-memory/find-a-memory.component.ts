import { Component, inject } from '@angular/core';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-find-a-memory',
  standalone: true,
  imports: [],
  templateUrl: './find-a-memory.component.html',
  styleUrls: ['../chat/chat.component.css', './find-a-memory.component.css'],
})
export class FindAMemoryComponent {
  sharingService = inject(SharingService);
  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
}
