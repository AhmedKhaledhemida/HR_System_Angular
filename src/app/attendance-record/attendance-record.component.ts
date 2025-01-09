import { Router } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-attendance-record',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './attendance-record.component.html',
  styleUrl: './attendance-record.component.css',
})
export class AttendanceRecordComponent implements OnInit {
  attendanceRecords: any[] = [];

  isSignedIn: boolean = true;


  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.getAttendance();
  }

  getAttendance(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isSignedIn = false;
      this.router.navigate(['/Signin']);
      return;
    }

    const headers = new HttpHeaders().set('token', token);

    this.http
      .get('http://localhost:3000/api/employee/attendance', { headers })
      .subscribe((response: any) => {
        this.attendanceRecords = response.attendance;
      });
  }
}
