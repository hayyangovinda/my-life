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
  themes = [
    { name: 'Original', color: '#55ad92' },
    { name: 'Candy', color: '#F5004F' },
    { name: 'Sky', color: '#19A7CE' },
    { name: 'Sunset', color: '#EB5B00' },
    { name: 'Tropical', color: '#14C38E' },
    { name: 'Gold', color: '#dfb325' },
    { name: 'Coral', color: '#FF6969' },
    { name: 'Olive', color: '#829460' },
    { name: 'Sun', color: '#FFC436' },
  ];

  onThemeSelected(theme: any) {
    this.sharingService.setTheme(theme.name);
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
}
