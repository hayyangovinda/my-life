import { Component, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { SharingService } from './services/sharing.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'my-life';
  sharingService = inject(SharingService);
  isSidenavOpen = false;
  selectedTheme = localStorage.getItem('theme');
  isDarkMode = localStorage.getItem('darkMode') === 'true' ? true : false;
  hasToken = false;
  router = inject(Router);
  ngOnInit(): void {
    this.requestNotificationPermission();
    const token = localStorage.getItem('mylife-token');
    if (token) {
      this.hasToken = true;
      this.router.navigateByUrl('home');
    } else {
      this.hasToken = false;
      this.router.navigateByUrl('login');
    }
    console.log('isDarkMode', this.isDarkMode);
    if (!this.selectedTheme) {
      this.selectedTheme = 'Original';
      localStorage.setItem('theme', this.selectedTheme);
    }
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    this.sharingService.setTheme(this.selectedTheme);
    this.sharingService.toogleSidenav$.subscribe((value) => {
      this.isSidenavOpen = value;
    });
  }

  async requestNotificationPermission() {
    if (Capacitor.getPlatform() === 'android') {
      const { display } = await LocalNotifications.checkPermissions();
      if (display !== 'granted') {
        await LocalNotifications.requestPermissions();
      }
    }
  }
}
