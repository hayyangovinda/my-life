import { Component, inject, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [DatePipe, LoaderComponent],
  templateUrl: './group-details.component.html',
  styleUrls: ['../chat/chat.component.css', './group-details.component.css'],
})
export class GroupDetailsComponent implements OnInit {
  sharingService = inject(SharingService);
  httpService = inject(HttpService);
  router = inject(Router);
  group: any;
  context = '';
  results: any = [];
  dayChats: any = [];
  showLoaders = false;

  ngOnInit(): void {
    this.sharingService.groupToView$.subscribe((group: any) => {
      this.group = group;
      const storedResults = this.getItemAndCheckDate(this.group._id);
      if (storedResults) {
        this.results = storedResults;
        return;
      }
      this.getContext();
    });
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  getContext() {
    this.showLoaders = true;
    this.httpService.getAllDayChats().subscribe(
      (resp: any) => {
        this.dayChats = resp;
        const responseInputs = resp.map((resp: any) => {
          const inputString = resp.inputs
            .filter((input: any) => input.type === 'sent')
            .map((input: any) => input.text)
            .join(',');
          return {
            dayId: resp._id,
            inputs: inputString,
          };
        });
        this.context = JSON.stringify(responseInputs);
        this.askGemini();
      },
      (error: any) => {
        this.showLoaders = false;
        console.log(error);
      }
    );
  }

  askGemini() {
    const prompt =
      'Base on the above context, answer the following question, by returning only only only(not even /n,or whitespaces) an array of id or ids of the day chats that are relevantto the group name and group description. If no relevant day chats are found, return an empty array. Do not invent your own story, base it on the given prompts. Do not return anything other than the array of ids. Return the array so that it can be assigned directly to a variable in js.';

    const promptToSend =
      this.context +
      'group name: ' +
      this.group.name +
      'group description: ' +
      this.group.description +
      prompt;

    this.httpService.generateStory({ prompt: promptToSend }).subscribe(
      (response: any) => {
        console.log(response);
        const dayIdArray = JSON.parse(response.generatedText);

        dayIdArray.forEach((dayId: any) => {
          const day = this.dayChats.find((day: any) => day._id === dayId);
          if (day) {
            this.results.push(day);
          }
        });
        this.saveItemWithDate(this.group._id, this.results);
        this.showLoaders = false;
      },
      (error: any) => {
        this.showLoaders = false;
        console.log(error);
      }
    );
  }

  saveItemWithDate(key: string, value: any) {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize to midnight
    const item = {
      value: value,
      date: now.getTime(),
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  getItemAndCheckDate(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const savedDate = new Date(item.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize to midnight

    // Check if the item was added today
    if (savedDate.getTime() !== currentDate.getTime()) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }

  goToResult(story: any) {
    this.sharingService.updateDayToGenerate(story);
    this.sharingService.updateComingFrom('group');
    this.router.navigateByUrl('story/' + story._id);
  }

  onBackClick() {
    this.router.navigateByUrl('groups');
  }
}
