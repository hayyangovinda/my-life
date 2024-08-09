import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';
import { HttpService } from '../services/http.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './groups.component.html',
  styleUrls: ['../chat/chat.component.css', './groups.component.css'],
})
export class GroupsComponent implements OnInit {
  router = inject(Router);
  sharingService = inject(SharingService);
  httpService = inject(HttpService);
  groups: any;
  showLoaders = false;

  ngOnInit(): void {
    this.showLoaders = true;
    this.getGroups();
  }

  getGroups() {
    this.httpService.getAllGroups().subscribe(
      (response: any) => {
        this.groups = response;
        console.log(this.groups);
        this.showLoaders = false;
      },
      (error: any) => {
        this.showLoaders = false;
        console.log(error);
      }
    );
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
  onAddClick() {
    this.router.navigateByUrl('group-form');
  }

  drop($event: Event) {
    throw new Error('Method not implemented.');
  }
  onEditClick(_t5: any) {
    throw new Error('Method not implemented.');
  }
  onDeleteClick($event: MouseEvent, _t5: any) {
    throw new Error('Method not implemented.');
  }
  onGroupClick(group: any) {
    console.log(group);
    this.sharingService.updateGroupToView(group);
    this.router.navigateByUrl('group-details');
  }
}
