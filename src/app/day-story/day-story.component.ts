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
  generatedStory: string = '';
  dayPrompts: any;

  promptToSend =
    'rewrite the following as an entry in a diary/journal  write it in the first person,u can use emojis, not too formal ,not too casual';
  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
  @Input() storyId: string = '';

  ngOnInit(): void {
    this.sharingService.dayToGenerate$.subscribe((dayChat: any) => {
      this.dayPrompts = dayChat.inputs;
      this.dayPrompts = this.dayPrompts
        .filter((prompt: any) => prompt.type === 'sent')
        .map((prompt: any) => prompt.text)
        .join(',');
      console.log(this.dayPrompts);
    });
  }

  getPromptFromStory(story: any) {}
}
