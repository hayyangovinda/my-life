import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './group-form.component.html',
  styleUrls: ['../chat/chat.component.css', './group-form.component.css'],
})
export class GroupFormComponent {
  onSaveClick() {
    throw new Error('Method not implemented.');
  }
  sharingService = inject(SharingService);

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
  onIconFocus($event: FocusEvent) {
    throw new Error('Method not implemented.');
  }
  categoryForm: any;
  onBackClick() {
    throw new Error('Method not implemented.');
  }
}
