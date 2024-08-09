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

  peepToView = new BehaviorSubject<any | null>(null);

  peepToView$ = this.peepToView.asObservable();

  updatePeepToView(peep: any) {
    this.peepToView.next(peep);
  }

  groupToView = new BehaviorSubject<any | null>(null);

  groupToView$ = this.groupToView.asObservable();

  updateGroupToView(group: any) {
    this.groupToView.next(group);
  }
  toggleDarkMode() {
    document.body.classList.toggle('dark');
  }

  private currentTheme: string | null = null;

  setTheme(theme: string) {
    if (this.currentTheme) {
      document.body.classList.remove(this.currentTheme);
    }
    document.body.classList.add(theme);
    this.currentTheme = theme;
  }

  groupToEdit = new BehaviorSubject<any | null>(null);

  groupToEdit$ = this.groupToEdit.asObservable();

  updateGroupToEdit(group: any) {
    this.groupToEdit.next(group);
  }

  comingFrom = new BehaviorSubject<any | null>(null);

  comingFrom$ = this.comingFrom.asObservable();

  updateComingFrom(from: any) {
    this.comingFrom.next(from);
  }
}
