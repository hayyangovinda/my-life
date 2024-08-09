import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharingService } from '../services/sharing.service';
import { NgIf } from '@angular/common';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [ReactiveFormsModule, PickerComponent, NgIf, LoaderComponent],
  templateUrl: './group-form.component.html',
  styleUrls: ['../chat/chat.component.css', './group-form.component.css'],
})
export class GroupFormComponent implements OnInit {
  showPicker = false;
  sharingService = inject(SharingService);
  router = inject(Router);
  httpService = inject(HttpService);
  groupForm = new FormGroup({
    icon: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
  });
  showLoaders = false;
  groupToEdit: any;
  ngOnInit(): void {
    this.sharingService.groupToEdit$.subscribe((group) => {
      if (group) {
        this.groupToEdit = group;
        this.groupForm.get('icon')?.setValue(group.icon);
        this.groupForm.get('name')?.setValue(group.name);
        this.groupForm.get('description')?.setValue(group.description);
      }
    });
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }

  onBackClick() {
    this.router.navigateByUrl('groups');
  }

  emojiClick(event: any) {
    this.groupForm.get('icon')?.setValue(event.emoji.native);
    this.showPicker = false;
  }

  onOverlayClick() {
    this.showPicker = false;
  }

  onIconFocus(event: any) {
    event.preventDefault();
    this.showPicker = true;
  }

  onSaveClick() {
    const body = this.groupForm.value;
    this.showLoaders = true;
    if (this.groupToEdit) {
      this.httpService.updateGroup(this.groupToEdit._id, body).subscribe(
        (response: any) => {
          console.log('success', response);
          this.router.navigateByUrl('groups');
          this.showLoaders = false;
        },
        (error: any) => {
          this.showLoaders = false;
          console.log(error);
        }
      );
    } else {
      this.httpService.createGroup(body).subscribe(
        (response: any) => {
          console.log('success', response);

          this.router.navigateByUrl('groups');

          this.showLoaders = false;
        },
        (error: any) => {
          this.showLoaders = false;
          console.log(error);
        }
      );
    }
  }
}
