import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';

import { SignupComponent } from './pages/signup/signup';

import { AdminPanelComponent } from './pages/admin-panel/admin-panel';

import { UserPanelComponent } from './pages/user-panel/user-panel';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [authGuard]
  },

  {
    path: 'user',
    component: UserPanelComponent,
    canActivate: [authGuard]
  },

  // INVALID ROUTE REDIRECT

  {
    path: '**',
    redirectTo: ''
  }

];