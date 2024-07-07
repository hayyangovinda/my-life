import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  private router = inject(Router);
  httpService = inject(HttpService);
  destroyRef = inject(DestroyRef);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  eyeIconOffSrc = '../../assets/eye_off.png';
  eyeIconOnSrc = '../../assets/eye_on.png';
  eyeIconSrc = this.eyeIconOffSrc;
  ngOnInit(): void {}

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  onRegisterClick() {
    this.router.navigateByUrl('sign-in');
  }

  onLoginClick() {
    this.httpService
      .login(this.loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: any) => {
        localStorage.setItem('mylife-token', data.token);
        console.log(data.token);
        this.router.navigateByUrl('home');
      });
  }

  onForgotPwClick() {
    this.router.navigateByUrl('forgot-password');
  }

  togglePasswordVisibility() {
    if (this.passwordInput.nativeElement.type === 'password') {
      this.passwordInput.nativeElement.type = 'text';
      this.eyeIconSrc = this.eyeIconOnSrc;
    } else {
      this.passwordInput.nativeElement.type = 'password';
      this.eyeIconSrc = this.eyeIconOffSrc;
    }
  }
}
