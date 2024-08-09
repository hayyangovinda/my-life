import { Component, inject, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { DatePipe } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { startOfYear, endOfYear } from 'date-fns';
import { HttpService } from '../services/http.service';
import {
  provideNativeDateAdapter,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-chat-archive',
  standalone: true,
  imports: [
    DatePipe,
    MatFormField,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './chat-archive.component.html',
  styleUrls: [
    '../chat/chat.component.css',
    '../daily-stories/daily-stories.component.css',
    './chat-archive.component.css',
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class ChatArchiveComponent implements OnInit {
  currentYear = new Date();
  firstDayOfYear = startOfYear(this.currentYear);
  lastDayOfYear = endOfYear(this.currentYear);
  range = new FormGroup({
    start: new FormControl<Date | null>(this.firstDayOfYear),
    end: new FormControl<Date | null>(this.lastDayOfYear),
  });
  sharingService = inject(SharingService);
  httpService = inject(HttpService);
  router = inject(Router);
  chats: any = [];
  showLoaders: boolean = false;

  ngOnInit(): void {
    this.showLoaders = true;
    this.httpService.getAllDayChats().subscribe(
      (response: any) => {
        this.chats = response;
        this.showLoaders = false;
        console.log(this.chats);
      },
      () => {
        this.showLoaders = false;
      }
    );
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  goToChat(chat: any) {
    // this.sharingService.comingFrom.next('chat-archive');
    this.router.navigateByUrl('home/' + chat.date);
  }
}
