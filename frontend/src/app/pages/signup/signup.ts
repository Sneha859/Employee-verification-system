import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({

  selector: 'app-signup',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './signup.html',

  styleUrls: ['./signup.scss']

})

export class SignupComponent {

  name = '';

  email = '';

  password = '';

  role = 'General User';

  constructor(

    private authService: AuthService,
    private router: Router

  ) {}



  signup() {

    const userData = {

      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role

    };



    this.authService.register(userData)

      .subscribe({

        next: () => {

          alert('Signup Successful');

          this.router.navigate(['/']);

        },

        error: (error: any) => {

          console.log(error);

          alert(error.error.message);

        }

      });

  }

}