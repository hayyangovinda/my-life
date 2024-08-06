import { Component, inject, Input, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-day-story',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './day-story.component.html',
  styleUrls: ['../chat/chat.component.css', './day-story.component.css'],
})
export class DayStoryComponent implements OnInit {
  sharingService = inject(SharingService);
  generatedStory: string = '';
  dayPrompts: any;
  httpService = inject(HttpService);
  date: any;
  dayChatId: any;

  promptToSend =
    'rewrite the following as an entry in a diary/journal in a proper tone,  write it in the first person,u can use emojis, write good easy simple english.give me only the story,no title no date, no other details ,do not invent your own story,base iton the given prompts \n\n';
  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
  @Input() storyId: string = '';

  ngOnInit(): void {
    this.sharingService.dayToGenerate$.subscribe((dayChat: any) => {
      this.date = dayChat.date;
      this.dayChatId = dayChat._id;
      this.dayPrompts = dayChat.inputs;

      if (dayChat.story) {
        this.generatedStory = dayChat.story;
        return;
      }

      this.dayPrompts = this.dayPrompts
        .filter((prompt: any) => prompt.type === 'sent')
        .map((prompt: any) => prompt.text)
        .join(',');

      console.log('dayPrompts', this.dayPrompts);

      this.promptToSend = this.promptToSend + this.dayPrompts;

      this.httpService
        .generateStory({ prompt: this.promptToSend })
        .subscribe((response: any) => {
          this.generatedStory = response.generatedText;
          this.httpService
            .updateDayChat(this.dayChatId, {
              story: this.generatedStory,
            })
            .subscribe((response: any) => {});
        });
    });
  }

  updateStory() {
    const editedStory = document.getElementById('story-body')?.innerText;
    this.httpService
      .updateDayChat(this.dayChatId, {
        story: editedStory,
      })
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
