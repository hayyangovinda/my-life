import { Component, inject, Input, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-day-story',
  standalone: true,
  imports: [DatePipe, LoaderComponent],
  templateUrl: './day-story.component.html',
  styleUrls: ['../chat/chat.component.css', './day-story.component.css'],
})
export class DayStoryComponent implements OnInit {
  sharingService = inject(SharingService);
  router = inject(Router);
  generatedStory: string = '';
  dayPrompts: any;
  httpService = inject(HttpService);
  date: any;
  dayChatId: any;
  comingFrom: string = '';
  promptToSend =
    'rewrite the following as an entry in a diary/journal in a proper tone,  write it in the first person,u can use emojis, write good easy simple english.give me only the story,no title no date, no other details ,do not invent your own story,base iton the given prompts \n\n';
  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
  @Input() storyId: string | null = null;

  showLoaders = false;

  ngOnInit() {
    this.sharingService.comingFrom$.subscribe((from: any) => {
      this.comingFrom = from;
    });
    this.sharingService.dayToGenerate$.subscribe((dayChat: any) => {
      this.date = dayChat.date;
      this.dayChatId = dayChat._id;
      this.dayPrompts = dayChat.inputs;

      if (dayChat.story) {
        this.generatedStory = dayChat.story;
        return;
      }
      this.showLoaders = true;

      this.dayPrompts = this.dayPrompts
        .filter((prompt: any) => prompt.type === 'sent')
        .map((prompt: any) => prompt.text)
        .join(',');

      console.log('dayPrompts', this.dayPrompts);

      this.promptToSend = this.promptToSend + this.dayPrompts;

      this.httpService
        .generateStory({ prompt: this.promptToSend })
        .subscribe((response: any) => {
          this.showLoaders = false;
          this.generatedStory = response.generatedText;
          if (
            this.generatedStory.includes('diary') &&
            this.generatedStory.includes('prompts') &&
            this.generatedStory.includes('provide') &&
            this.generatedStory.includes('entry')
          ) {
            this.generatedStory =
              this.generatedStory +
              "Add this day's story in the chat archive,then come back.";
            return;
          }

          this.httpService
            .updateDayChat(this.dayChatId, {
              story: this.generatedStory,
            })
            .subscribe((response: any) => {});
        });
    });
  }

  updateStory() {
    this.showLoaders = true;
    const editedStory = document.getElementById('story-body')?.innerText;
    this.httpService
      .updateDayChat(this.dayChatId, {
        story: editedStory,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.showLoaders = false;
        },
        (error: any) => {
          this.showLoaders = false;
          console.log(error);
        }
      );
  }

  onBackClick() {
    if (this.comingFrom === 'stories') {
      this.router.navigateByUrl('daily-stories');
    } else if (this.comingFrom === 'group') {
      this.router.navigateByUrl('group-details');
    } else if (this.comingFrom === 'peep') {
      this.router.navigateByUrl('peep-profile');
    } else if (this.comingFrom === 'find-a-memory') {
      this.router.navigateByUrl('find-a-memory');
    }
  }
}
