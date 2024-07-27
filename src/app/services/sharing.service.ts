import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  goToStory(story: any) {
    throw new Error('Method not implemented.');
  }
  constructor() {}

  userEmail = new BehaviorSubject('');

  userEmail$ = this.userEmail.asObservable();

  updateUserEmail(email: string) {
    this.userEmail.next(email);
  }

  toogleSidenav = new BehaviorSubject(false);

  toogleSidenav$ = this.toogleSidenav.asObservable();

  toggleSidenav() {
    this.toogleSidenav.next(!this.toogleSidenav.value);
  }

  dayToGenerate = new BehaviorSubject(null);
  dayToGenerate$ = this.dayToGenerate.asObservable();

  updateDayToGenerate(day: any) {
    this.dayToGenerate.next(day);
  }

  imgSrcs = new BehaviorSubject<string[] | null>([]);
  imgSrcs$ = this.imgSrcs.asObservable();

  updateImgSrcs(srcs: string[]) {
    this.imgSrcs.next(srcs);
  }

  date = new BehaviorSubject<Date | null>(null);

  date$ = this.date.asObservable();

  updateDate(date: Date) {
    this.date.next(date);
  }
}
