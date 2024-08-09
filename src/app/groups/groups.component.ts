import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';
import { HttpService } from '../services/http.service';
import { LoaderComponent } from '../loader/loader.component';
import { LongPressDirective } from '../directives/long-press.directive';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [LoaderComponent, LongPressDirective],
  templateUrl: './groups.component.html',
  styleUrls: ['../chat/chat.component.css', './groups.component.css'],
})
export class GroupsComponent implements OnInit {
  router = inject(Router);
  sharingService = inject(SharingService);
  httpService = inject(HttpService);
  groups: any;
  showLoaders = false;
  showUtilsIcons = false;
  ngOnInit(): void {
    this.showLoaders = true;
    this.getGroups();
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      !target.classList.contains('delete-icon') &&
      !target.classList.contains('sent')
    ) {
      this.showUtilsIcons = false;
    }
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
  onEditClick(event: any, group: any) {
    event.stopPropagation();
    this.sharingService.updateGroupToEdit(group);
    this.router.navigateByUrl('group-form');
  }
  onDeleteClick(event: any, group: any) {
    event.stopPropagation();
    localStorage.removeItem(group._id);
    this.showLoaders = true;
    this.httpService.deleteGroup(group._id).subscribe(
      (response: any) => {
        this.getGroups();
        console.log(response);
      },
      (error: any) => {
        this.showLoaders = false;
        console.log(error);
      }
    );
  }
  onGroupClick(group: any) {
    console.log(group);
    this.sharingService.updateGroupToView(group);
    this.router.navigateByUrl('group-details');
  }

  onLongPress(event: any, group: any) {
    console.log(group);
    this.showUtilsIcons = true;
  }
}
