import { Component, inject } from '@angular/core';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-daily-stories',
  standalone: true,
  imports: [],
  templateUrl: './daily-stories.component.html',
  styleUrls: ['../chat/chat.component.css', './daily-stories.component.css'],
})
export class DailyStoriesComponent {
  sharingService = inject(SharingService);

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
}
