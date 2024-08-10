import { Component, inject } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import moment from 'moment';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { startOfYear, endOfYear, format, parseISO, parse } from 'date-fns';
import { LoaderComponent } from '../loader/loader.component';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-daily-stories',
  standalone: true,
  imports: [
    DatePipe,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
  ],

  templateUrl: './daily-stories.component.html',
  styleUrls: ['../chat/chat.component.css', './daily-stories.component.css'],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class DailyStoriesComponent {
  sharingService = inject(SharingService);
  httpService = inject(HttpService);
  stories!: any[];
  router = inject(Router);
  currentYear = new Date();
  firstDayOfYear = startOfYear(this.currentYear);
  lastDayOfYear = endOfYear(this.currentYear);
  range = new FormGroup({
    start: new FormControl<Date | string | null>(this.firstDayOfYear),
    end: new FormControl<Date | string | null>(this.lastDayOfYear),
  });
  showLoaders = false;
  utilsService = inject(UtilsService);
  ngOnInit(): void {
    this.getAllChats();
  }
  getAllChats(params?: any) {
    this.showLoaders = true;

    this.httpService.getAllDayChats(params).subscribe(
      (response: any) => {
        console.log(response);
        this.showLoaders = false;
        this.stories = response;
      },
      (error: any) => {
        this.showLoaders = false;
        console.log(error);
      }
    );
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
  onDateChange(event: any) {
    const startValue = this.range.value.start;
    const endValue = this.range.value.end;
    if (startValue && endValue) {
      const dateParams = this.utilsService.getCorrectDateFormat(
        startValue,
        endValue
      );
      this.getAllChats(dateParams);
    }
  }

  goToStory(story: any) {
    this.sharingService.updateDayToGenerate(story);
    this.sharingService.updateComingFrom('stories');
    this.router.navigateByUrl('story/' + story._id);
  }
}
