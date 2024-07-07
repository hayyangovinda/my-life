import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'check-email',
    loadComponent: () =>
      import('./check-email/check-email.component').then(
        (m) => m.CheckEmailComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./chat/chat.component').then((m) => m.ChatComponent),
  },
];
