import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  router = inject(Router);
  sharingService = inject(SharingService);
  goToChat() {
    this.router.navigateByUrl('home');
    this.sharingService.toggleSidenav();
  }
  goToDailyStories() {
    this.router.navigateByUrl('daily-stories');
    this.sharingService.toggleSidenav();
  }
}
