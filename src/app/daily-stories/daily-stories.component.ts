import { Component, inject } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-daily-stories',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './daily-stories.component.html',
  styleUrls: ['../chat/chat.component.css', './daily-stories.component.css'],
})
export class DailyStoriesComponent {
  sharingService = inject(SharingService);
  httpService = inject(HttpService);
  stories!: any[];

  ngOnInit(): void {
    this.httpService.getAllDayChats().subscribe((response: any) => {
      console.log(response);
      this.stories = response;
    });
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
}
