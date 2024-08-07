import { Component, inject, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [],
  templateUrl: './people.component.html',
  styleUrls: ['../chat/chat.component.css', './people.component.css'],
})
export class PeopleComponent implements OnInit {
  sharingService = inject(SharingService);
  httpService = inject(HttpService);
  router = inject(Router);

  context = '';
  people: any[] = [];

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  ngOnInit() {
    this.httpService.getAllDayChats().subscribe((resp: any) => {
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
    });
  }

  getAllPeople() {
    this.httpService.getAllPeople().subscribe((resp: any) => {
      this.people = resp;
      console.log(this.people);
    });
  }
  askGemini() {
    const prompt =
      'Base on the above context, return a list of people in the context,in the following format: [{name: "name", about: "about",mentions: [id,id,id]},...],where id is the dayId, and about is a long description(do not include ids in the descriptions,u can use emojis in descriptions) of the person and their relationship in regards to me , and a summary of our memories together,Do not return anything other than the array of objs. Return the array so that it can be assigned directly to a variable in js.';

    const promptToSend = this.context + '\n' + prompt;
    this.httpService
      .generateStory({ prompt: promptToSend })
      .subscribe((response: any) => {
        console.log(response);
        const people = JSON.parse(response.generatedText);
        this.people = people;
      });
  }

  goToPeople(peep: any) {
    this.sharingService.updatePeepToView(peep);
    this.router.navigateByUrl('peep-profile');
  }
}
