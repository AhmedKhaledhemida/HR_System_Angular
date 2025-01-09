import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css',
})
export class AddemployeeComponent {
  employees: any[] = [];
  newEmployee = { name: '', email: '' };
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  addEmployee(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      this.router.navigate(['/signin']);
      return;
    }

    const headers = new HttpHeaders().set('token', token);

    this.http
      .post('http://localhost:3000/api/employee/add', this.newEmployee, {
        headers,
      })
      .subscribe(
        (response: any) => {
          this.employees.push(response.employees);
          this.newEmployee = { name: '', email: '' };
          window.location.reload();
        },
        (error) => {
          this.errorMessage =
            error.error.message ||
            'An error occurred while adding the employee';
        }
      );
  }
}
