import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}



  // ================= REGISTER =================

  register(userData: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      userData
    );

  }



  // ================= LOGIN =================

  login(loginData: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      loginData
    );

  }



  // ================= GET USERS =================

  getUsers(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/users`
    );

  }



  // ================= VERIFY USER =================

  verifyUser(id: string): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/verify/${id}`,
      {}
    );

  }



  // ================= SAVE USER =================

  saveUser(user: any) {

    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );

  }



  // ================= GET USER =================

  getUser() {

    return JSON.parse(
      localStorage.getItem('user') || '{}'
    );

  }



  // ================= SAVE TOKEN =================

  setToken(token: string) {

    localStorage.setItem(
      'token',
      token
    );

  }



  // ================= GET TOKEN =================

  getToken() {

    return localStorage.getItem(
      'token'
    );

  }



  // ================= LOGOUT =================

  logout() {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

  }



  // ================= LOGIN STATUS =================

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }


  // ================= DELETE USER =================

deleteUser(id: string): Observable<any> {

  return this.http.delete(
    `${this.apiUrl}/delete/${id}`
  );

}
}