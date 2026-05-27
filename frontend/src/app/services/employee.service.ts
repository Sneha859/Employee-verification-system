import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private apiUrl = 'http://localhost:5000/api/employees';

  constructor(private http: HttpClient) {}

  // GET EMPLOYEES
  getEmployees(): Observable<any> {

    return this.http.get<any>(this.apiUrl);

  }

  // ADD EMPLOYEE
  addEmployee(employeeData: any): Observable<any> {

    return this.http.post<any>(this.apiUrl, employeeData);

  }

  // VERIFY EMPLOYEE
  verifyEmployee(id: string): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/verify/${id}`,
      {}
    );

  }

  // DELETE EMPLOYEE
  deleteEmployee(id: string): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );

  }

}