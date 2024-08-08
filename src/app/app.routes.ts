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
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
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

  {
    path: 'story/:storyId',
    loadComponent: () =>
      import('./day-story/day-story.component').then(
        (m) => m.DayStoryComponent
      ),
  },
  {
    path: 'find-a-memory',
    loadComponent: () =>
      import('./find-a-memory/find-a-memory.component').then(
        (m) => m.FindAMemoryComponent
      ),
  },
  {
    path: 'ebook',
    loadComponent: () =>
      import('./ebook/ebook.component').then((m) => m.EbookComponent),
  },

  {
    path: 'people',
    loadComponent: () =>
      import('./people/people.component').then((m) => m.PeopleComponent),
  },

  {
    path: 'groups',
    loadComponent: () =>
      import('./groups/groups.component').then((m) => m.GroupsComponent),
  },

  {
    path: 'group-form',
    loadComponent: () =>
      import('./group-form/group-form.component').then(
        (m) => m.GroupFormComponent
      ),
  },
  {
    path: 'group-details',
    loadComponent: () =>
      import('./group-details/group-details.component').then(
        (m) => m.GroupDetailsComponent
      ),
  },
  {
    path: 'peep-profile',
    loadComponent: () =>
      import('./peep-profile/peep-profile.component').then(
        (m) => m.PeepProfileComponent
      ),
  },
  {
    path: 'chat-archive',
    loadComponent: () =>
      import('./chat-archive/chat-archive.component').then(
        (m) => m.ChatArchiveComponent
      ),
  },
  {
    path: 'themes',
    loadComponent: () =>
      import('./themes/themes.component').then((m) => m.ThemesComponent),
  },
];
