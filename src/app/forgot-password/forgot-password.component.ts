import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../services/http.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
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

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  showLoaders = false;

  onContinueClick() {
    console.log(this.forgotForm.valid);
    if (!this.forgotForm.valid) {
      this.ngxToastr.error('Please enter a valid email', '', { timeOut: 2500 });
      return;
    }
    this.showLoaders = true;
    const body = this.forgotForm.value;
    this.httpService
      .forgotPassword(body)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (data: any) => {
          console.log(data.message);

          this.showLoaders = false;
          this.ngxToastr.success(data.message, '', { timeOut: 2500 });
          this.router.navigateByUrl('login');
        },
        (error) => {
          console.log(error);
          this.ngxToastr.error(error.error.error, '', { timeOut: 2500 });
          this.showLoaders = false;
        }
      );
  }

  onBackClick() {
    this.router.navigateByUrl('login');
  }
}
