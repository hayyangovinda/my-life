import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { SharingService } from '../services/sharing.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-check-email',
  standalone: true,
  imports: [],
  templateUrl: './check-email.component.html',
  styleUrls: ['../login/login.component.css', './check-email.component.css'],
})
export class CheckEmailComponent {
  sharingService = inject(SharingService);
  userEmail!: string;
  httpService = inject(HttpService);
  router = inject(Router);
  toastrService = inject(ToastrService);
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.sharingService.userEmail$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((email: any) => {
        this.userEmail = email;
        console.log(this.userEmail);
      });
  }

  onContinueClick() {
    this.httpService
      .checkVerificationStatus({ email: this.userEmail })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: any) => {
        console.log('isVerified: ', data);

        if (!data.isVerified) {
          this.toastrService.warning('Email is not yet verified!');
          return;
        } else {
          this.router.navigateByUrl('home');
        }
      });
  }
}
