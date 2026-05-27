import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  const router = inject(Router);



  // CHECK LOGIN

  if (!authService.isLoggedIn()) {

    alert('Please Login First');

    router.navigate(['/']);

    return false;

  }



  // GET USER

  const user = authService.getUser();



  // ADMIN ROUTE PROTECTION

  if (

    state.url === '/admin' &&

    user.role !== 'Admin'

  ) {

    alert('Access Denied');

    router.navigate(['/user']);

    return false;

  }



  // GENERAL USER ROUTE PROTECTION

  if (

    state.url === '/user' &&

    user.role !== 'General User'

  ) {

    alert('Access Denied');

    router.navigate(['/admin']);

    return false;

  }



  return true;

};