import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { HttpService } from '../services/http.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharingService } from '../services/sharing.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  eyeIconSrc: any;
  httpService = inject(HttpService);
  destroyRef = inject(DestroyRef);
  sharingService = inject(SharingService);
  router = inject(Router);
  showLoaders = false;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  passwordShowIcon = false;
  toastService = inject(ToastrService);

  onLoginClick() {
    this.router.navigateByUrl('login');
  }

  onRegisterClick() {
    this.showLoaders = true;
    const isValidEmail = this.registerForm.controls.email.valid;
    const isValidPassword = this.registerForm.controls.password.valid;

    if (!isValidEmail || !isValidPassword) {
      if (!isValidEmail) {
        this.toastService.error('Please enter a valid email address');
      }
      if (!isValidPassword) {
        this.toastService.error('Password must be at least 6 characters');
      }
      this.showLoaders = false;
      return;
    }

    this.httpService
      .register(this.registerForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (data: any) => {
          this.showLoaders = false;
          localStorage.setItem('mylife-token', data.token);

          const email = this.registerForm.get('email')?.value;
          this.httpService
            .sendVerificationEmail({ email })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data: any) => {
              console.log(data);
              this.router.navigateByUrl('check-email');
            });

          this.sharingService.updateUserEmail(email as string);
        },
        (error: any) => {
          this.showLoaders = false;
          console.log(error.error.message);
          this.toastService.error(error.error.message);
        }
      );
  }

  togglePasswordVisibility() {
    if (this.passwordInput.nativeElement.type === 'password') {
      this.passwordInput.nativeElement.type = 'text';
      this.passwordShowIcon = true;
    } else {
      this.passwordInput.nativeElement.type = 'password';
      this.passwordShowIcon = false;
    }
  }
}
