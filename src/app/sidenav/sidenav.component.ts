import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  router = inject(Router);
  sharingService = inject(SharingService);

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  onLogout() {
    this.toggleSidenav();
    localStorage.removeItem('mylife-token');
    this.router.navigateByUrl('login');
  }

  toggleDarkMode() {
    this.sharingService.toggleDarkMode();
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('darkMode', 'true');
    } else {
      localStorage.setItem('darkMode', 'false');
    }
  }
}
