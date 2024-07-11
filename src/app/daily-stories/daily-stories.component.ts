import { Component, inject } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-daily-stories',
  standalone: true,
  imports: [
    DatePipe,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  templateUrl: './daily-stories.component.html',
  styleUrls: ['../chat/chat.component.css', './daily-stories.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class DailyStoriesComponent {
  sharingService = inject(SharingService);
  httpService = inject(HttpService);
  stories!: any[];
  router = inject(Router);

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  ngOnInit(): void {
    this.httpService.getAllDayChats().subscribe((response: any) => {
      console.log(response);
      this.stories = response;
    });
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  goToStory(story: any) {
    this.sharingService.updateDayToGenerate(story);
    this.router.navigateByUrl('story/' + story._id);
  }
}
