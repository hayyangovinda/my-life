import { Component, inject, Input, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-day-story',
  standalone: true,
  imports: [],
  templateUrl: './day-story.component.html',
  styleUrls: ['../chat/chat.component.css', './day-story.component.css'],
})
export class DayStoryComponent implements OnInit {
  sharingService = inject(SharingService);
  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
  @Input() id: string = '';

  ngOnInit(): void {
    console.log('fasfsdahfgahdfhaju');
    console.log('id', this.id);
  }
}
