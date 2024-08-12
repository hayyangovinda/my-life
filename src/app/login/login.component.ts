import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  private router = inject(Router);
  httpService = inject(HttpService);
  destroyRef = inject(DestroyRef);
  showLoaders = false;

  loginForm = new FormGroup({
    email: new FormControl('my.life.test.gemini@gmail.com', Validators.email),
    password: new FormControl('gemini123', Validators.minLength(6)),
  });
  passwordShowIcon = false;
  toastrService = inject(ToastrService);
  ngOnInit(): void {}

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  onRegisterClick() {
    this.router.navigateByUrl('register');
  }

  onLoginClick() {
    this.showLoaders = true;

    const isValidEmail = this.loginForm.controls.email.valid;
    const isValidPassword = this.loginForm.controls.password.valid;

    if (!isValidEmail || !isValidPassword) {
      if (!isValidEmail) {
        this.toastrService.error('Please enter a valid email address');
      }
      if (!isValidPassword) {
        this.toastrService.error('Password must be at least 6 characters');
      }
      this.showLoaders = false;
      return;
    }
    this.httpService
      .login(this.loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (data: any) => {
          this.showLoaders = false;
          localStorage.setItem('mylife-token', data.token);
          console.log(data.token);
          this.router.navigateByUrl('home');
        },
        (error: any) => {
          this.showLoaders = false;
          console.log(error.error.error);
          this.toastrService.error(error.error.error);
        }
      );
  }

  onForgotPwClick() {
    this.router.navigateByUrl('forgot-password');
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
