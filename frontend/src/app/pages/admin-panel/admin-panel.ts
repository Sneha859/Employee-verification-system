import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-panel',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],

  templateUrl: './admin-panel.html',

  styleUrls: ['./admin-panel.scss']
})

export class AdminPanelComponent implements OnInit {

  users: any[] = [];

  filteredUsers: any[] = [];

  totalUsers = 0;

  verifiedUsers = 0;

  pendingUsers = 0;

  searchText = '';



  // LOADING SPINNER

  isLoading = false;



  // ADD USER FORM

  newUser = {

    name: '',

    email: '',

    password: '',

    role: 'General User'

  };



  constructor(

    private authService: AuthService,

    private cdr: ChangeDetectorRef

  ) {}



  ngOnInit(): void {

    this.loadUsers();

  }



  // ================= LOAD USERS =================

  loadUsers() {

    this.isLoading = true;

    this.authService.getUsers()

      .subscribe({

        next: (response: any) => {

          console.log('Users:', response);

          this.users = [...response];

          this.filteredUsers = [...response];

          this.updateCounts();

          this.isLoading = false;

          this.cdr.detectChanges();

        },

        error: (error: any) => {

          console.log(error);

          this.isLoading = false;

          alert('Failed to load users');

        }

      });

  }



  // ================= UPDATE COUNTS =================

  updateCounts() {

    this.totalUsers = this.filteredUsers.length;

    this.verifiedUsers =
      this.filteredUsers.filter(
        user => user.verified
      ).length;

    this.pendingUsers =
      this.filteredUsers.filter(
        user => !user.verified
      ).length;

  }



  // ================= SEARCH USER =================

  searchUser() {

    const search =
      this.searchText.toLowerCase();

    this.filteredUsers =
      this.users.filter((user) => {

        return (

          user.name.toLowerCase().includes(search) ||

          user.email.toLowerCase().includes(search)

        );

      });

    this.updateCounts();

  }



  // ================= VERIFY USER =================

  verifyUser(id: string) {

    this.isLoading = true;

    this.authService.verifyUser(id)

      .subscribe({

        next: () => {

          this.loadUsers();

        },

        error: (error: any) => {

          console.log(error);

          this.isLoading = false;

          alert('Verification Failed');

        }

      });

  }



  // ================= DELETE USER =================

  deleteUser(id: string) {

    const confirmDelete = confirm(
      'Are you sure you want to delete this user?'
    );

    if (!confirmDelete) {

      return;

    }

    this.isLoading = true;

    this.authService.deleteUser(id)

      .subscribe({

        next: () => {

          this.loadUsers();

        },

        error: (error: any) => {

          console.log(error);

          this.isLoading = false;

          alert('Delete Failed');

        }

      });

  }



  // ================= ADD USER =================

  addUser() {

    this.isLoading = true;

    this.authService.register(this.newUser)

      .subscribe({

        next: () => {

          this.newUser = {

            name: '',

            email: '',

            password: '',

            role: 'General User'

          };

          this.loadUsers();

          alert('User Added Successfully');

        },

        error: (error: any) => {

          console.log(error);

          this.isLoading = false;

          alert(error.error.message);

        }

      });

  }

}