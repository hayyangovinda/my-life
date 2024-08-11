import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api/v1/';
  // private baseUrl = 'https://my-life-api.onrender.com/api/v1/';

  getDayChat(date: any) {
    const params = new HttpParams().set('date', date);
    return this.http.get(this.baseUrl + 'day-chat/date', { params });
  }
  createDayChat(body: any) {
    return this.http.post(`${this.baseUrl}day-chat`, body);
  }

  updateDayChat(id: string, body: any) {
    return this.http.patch(`${this.baseUrl}day-chat/${id}`, body);
  }

  getAllDayChats(params?: any) {
    return this.http.get(`${this.baseUrl}day-chat`, { params });
  }

  register(body: any) {
    return this.http.post(`${this.baseUrl}auth/register`, body);
  }

  sendVerificationEmail(body: any) {
    return this.http.post(`${this.baseUrl}auth/send-email`, body);
  }

  checkVerificationStatus(body: any) {
    return this.http.post(
      `${this.baseUrl}auth/check-verification-status`,
      body
    );
  }

  login(body: any) {
    return this.http.post(`${this.baseUrl}auth/login`, body);
  }

  generateStory(body: any) {
    return this.http.post(`${this.baseUrl}ai`, body);
  }

  transcribeAudio(body: any) {
    return this.http.post(`${this.baseUrl}transcribe`, body);
  }

  forgotPassword(body: any) {
    return this.http.post(`${this.baseUrl}auth/forgot-password`, body);
  }

  uploadImage(formdata: FormData) {
    // add header

    return this.http.post(`${this.baseUrl}day-chat/image`, formdata);
  }

  getAllGroups() {
    return this.http.get(`${this.baseUrl}group`);
  }

  getGroupById(id: string) {
    return this.http.get(`${this.baseUrl}group/${id}`);
  }

  updateGroup(id: string, body: any) {
    return this.http.patch(`${this.baseUrl}group/${id}`, body);
  }

  deleteGroup(id: string) {
    return this.http.delete(`${this.baseUrl}group/${id}`);
  }

  createGroup(body: any) {
    return this.http.post(`${this.baseUrl}group`, body);
  }

  deleteUser() {
    return this.http.delete(`${this.baseUrl}users/active-user`);
  }
}
