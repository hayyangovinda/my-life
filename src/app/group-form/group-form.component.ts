import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharingService } from '../services/sharing.service';
import { NgIf } from '@angular/common';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [ReactiveFormsModule, PickerComponent, NgIf],
  templateUrl: './group-form.component.html',
  styleUrls: ['../chat/chat.component.css', './group-form.component.css'],
})
export class GroupFormComponent {
  showPicker = false;
  onSaveClick() {
    throw new Error('Method not implemented.');
  }
  sharingService = inject(SharingService);

  groupForm = new FormGroup({
    icon: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
  });

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  categoryForm: any;
  onBackClick() {
    throw new Error('Method not implemented.');
  }

  emojiClick(event: any) {
    this.categoryForm.get('icon')?.setValue(event.emoji.native);
    this.showPicker = false;
  }

  onOverlayClick() {
    this.showPicker = false;
  }

  onIconFocus(event: any) {
    event.preventDefault();
    this.showPicker = true;
  }
}
