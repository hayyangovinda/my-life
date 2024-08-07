import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peep-profile',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './peep-profile.component.html',
  styleUrls: ['../chat/chat.component.css', './peep-profile.component.css'],
})
export class PeepProfileComponent implements OnInit {
  sharingService = inject(SharingService);
  destroyRef = inject(DestroyRef);
  peep: any = {};
  httpService = inject(HttpService);
  router = inject(Router);
  dayChats: any = [];
  ngOnInit(): void {
    this.httpService.getAllDayChats().subscribe((resp: any) => {
      this.dayChats = resp;
      console.log(this.dayChats);
      this.sharingService.peepToView$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((peep: any) => {
          const people = peep;
          console.log(people);
          people.dayChats = [];
          people.mentions.forEach((mention: any) => {
            console.log(mention);
            const dayChat = this.dayChats.find(
              (dayChat: any) => dayChat._id === mention.trim()
            );
            console.log(dayChat);

            if (dayChat) {
              people.dayChats.push(dayChat);
            }
          });
          console.log(people);
          this.peep = people;
        });
    });
  }

  goToStory(story: any) {
    console.log(story);
    this.sharingService.updateDayToGenerate(story);
    this.router.navigateByUrl('story/' + story._id);
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
}
