import { Component, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SharingService } from './services/sharing.service';
import { SidenavComponent } from './sidenav/sidenav.component';

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

  ngOnInit(): void {
    this.sharingService.toogleSidenav$.subscribe((value) => {
      this.isSidenavOpen = value;
    });
  }
}
