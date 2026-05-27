import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({

  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],

  templateUrl: './login.html',

  styleUrls: ['./login.scss']

})

export class LoginComponent {

  email = '';

  password = '';

  role = 'General User';

  constructor(

    private authService: AuthService,
    private router: Router

  ) {}



  login() {

    const loginData = {

      email: this.email,
      password: this.password,
      role: this.role

    };



    this.authService.login(loginData)

      .subscribe({

        next: (response: any) => {

          this.authService.setToken(
            response.token
          );

          this.authService.saveUser(
            response.user
          );

          // ADMIN
          if (response.user.role === 'Admin') {

            this.router.navigate(['/admin']);

          }

          // GENERAL USER
          else {

            this.router.navigate(['/user']);

          }

        },

        error: (error: any) => {

          console.log(error);

          alert(error.error.message);

        }

      });

  }

}