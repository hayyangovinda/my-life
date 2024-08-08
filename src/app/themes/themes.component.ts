import { Component, inject } from '@angular/core';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [],
  templateUrl: './themes.component.html',
  styleUrls: ['../chat/chat.component.css', './themes.component.css'],
})
export class ThemesComponent {
  sharingService = inject(SharingService);

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
}
