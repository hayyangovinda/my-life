import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  constructor() {}

  userEmail = new BehaviorSubject('');

  userEmail$ = this.userEmail.asObservable();

  updateUserEmail(email: string) {
    this.userEmail.next(email);
  }
}
