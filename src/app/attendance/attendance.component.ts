import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AddemployeeComponent } from '../addemployee/addemployee.component';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AddemployeeComponent,
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent implements OnInit {
  employees: any[] = [];
  editEmployees: any = {};
  isSignedIn: boolean = true;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.isSignedIn = false;
      this.router.navigate(['/Signin']);
      return;
    }

    const headers = new HttpHeaders().set('token', token);

    this.http.get('http://localhost:3000/api/employee', { headers }).subscribe(
      (response: any) => {
        this.employees = response.employees;
      },
      (error) => {
        this.errorMessage =
          error.error.message || 'An error occurred while getting employee ';
      }
    );
  }

  editEmployee(): void {
    const token = localStorage.getItem('token');
    const { _id, name, email, password } = this.editEmployees;
    if (!token) {
      console.error('No token found');
      this.router.navigate(['/signin']);
      return;
    }

    const headers = new HttpHeaders().set('token', token);

    this.http
      .put(
        `http://localhost:3000/api/employee/edit/${_id}`,
        { name, email, password },
        {
          headers,
        }
      )
      .subscribe(
        (response: any) => {
          this.getEmployees();
        },
        (error) => {
          this.errorMessage =
            error.error.message || 'An error occurred while editing employee ';
        }
      );
  }

  // Open edit modal with prefilled data
  openEditModal(employee: any) {
    this.editEmployees = { ...employee };
  }

  markAttendance(employeeId: string, attendanceDate: string): void {
    if (!attendanceDate) {
      attendanceDate = new Date().toISOString();
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/signin']);
      return;
    }

    const headers = new HttpHeaders().set('token', token);
    const body = {
      date: attendanceDate,
    };

    this.http
      .post(
        `http://localhost:3000/api/employee/attendance/${employeeId}`,
        body,
        { headers }
      )
      .subscribe(
        (response: any) => {
          console.log('Attendance marked successfully', response);
          this.getEmployees();
        },
        (error) => {
          this.errorMessage =
            error.error.message ||
            'An error occurred while adding employee attendance';
        }
      );
  }
}
