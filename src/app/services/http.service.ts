import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api/v1/';

  getDayChat(date: any) {
    const params = new HttpParams().set('date', date);
    return this.http.get(this.baseUrl + 'day-chat/date');
  }
}
