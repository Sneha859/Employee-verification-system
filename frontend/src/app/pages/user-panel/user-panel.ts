import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-panel',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './user-panel.html',

  styleUrls: ['./user-panel.scss']
})

export class UserPanelComponent implements OnInit {

  user: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}



  ngOnInit(): void {

    this.user = this.authService.getUser();

  }



  logout() {

    this.authService.logout();

    this.router.navigate(['/']);

  }

}