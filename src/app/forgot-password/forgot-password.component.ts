import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../services/http.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    '../login/login.component.css',
    './forgot-password.component.css',
  ],
})
export class ForgotPasswordComponent {
  httpService = inject(HttpService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  ngxToastr = inject(ToastrService);

  showLoader = false;
  forgotForm = new FormGroup({
    email: new FormControl(''),
  });
  onContinueClick() {
    this.showLoader = true;
    const body = this.forgotForm.value;
    this.httpService
      .forgotPassword(body)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (data: any) => {
          console.log(data.message);

          this.showLoader = false;
          this.ngxToastr.success(data.message, '', { timeOut: 2500 });
          this.router.navigateByUrl('login');
        },
        (error) => {
          this.showLoader = false;
        }
      );
  }

  onBackClick() {
    this.router.navigateByUrl('login');
  }
}
