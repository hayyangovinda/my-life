import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
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

  {
    path: 'daily-stories',
    loadComponent: () =>
      import('./daily-stories/daily-stories.component').then(
        (m) => m.DailyStoriesComponent
      ),
  },
];
