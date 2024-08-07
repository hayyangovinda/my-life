import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [],
  templateUrl: './groups.component.html',
  styleUrls: ['../chat/chat.component.css', './groups.component.css'],
})
export class GroupsComponent {
  router = inject(Router);
  sharingService = inject(SharingService);

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
  onAddClick() {
    this.router.navigateByUrl('group-form');
  }
  groups: any;
  onBackClick() {
    throw new Error('Method not implemented.');
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
}
