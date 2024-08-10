import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { HttpService } from '../services/http.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharingService } from '../services/sharing.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  passwordShowIcon = false;

  onLoginClick() {
    this.router.navigateByUrl('login');
  }

  onRegisterClick() {
    console.log(this.registerForm.value);

    this.httpService
      .register(this.registerForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: any) => {
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
      });
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
