import { Component, inject, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './people.component.html',
  styleUrls: ['../chat/chat.component.css', './people.component.css'],
})
export class PeopleComponent implements OnInit {
  sharingService = inject(SharingService);
  httpService = inject(HttpService);
  router = inject(Router);
  showLoaders = false;

  context = '';
  people: any[] = [];

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  ngOnInit() {
    this.showLoaders = true;
    const storedPeople = this.getItemAndCheckDate('people');

    if (storedPeople) {
      this.people = storedPeople;
      this.showLoaders = false;
      return;
    }
    this.httpService.getAllDayChats().subscribe(
      (resp: any) => {
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
      }
    );
  }

  askGemini() {
    const prompt =
      'Base on the above context, return a list of people in the context,in the following format: [{name: "name", about: "about",mentions: [id,id,id]},...],where id is the dayId, and about is a long description(do not include ids in the descriptions,u can use emojis in descriptions) of the person and their relationship in regards to me , and a summary of our memories together,Do not return anything other than the array of objs. Return the array so that it can be assigned directly to a variable in js.';

    const promptToSend = this.context + '\n' + prompt;
    this.httpService.generateStory({ prompt: promptToSend }).subscribe(
      (response: any) => {
        console.log(response);
        this.showLoaders = false;
        const people = JSON.parse(response.generatedText);
        this.people = people;
        this.saveItemWithDate('people', people);
      },
      (error: any) => {
        this.showLoaders = false;
      }
    );
  }

  goToPeople(peep: any) {
    this.sharingService.updatePeepToView(peep);
    this.router.navigateByUrl('peep-profile');
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

  saveItemWithDate(key: string, value: any) {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize to midnight
    const item = {
      value: value,
      date: now.getTime(),
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
}
