import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  public userData = {
    email: '',
    password: '',
  };
  errorMessage = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  signin(): void {
    if (this.userData.email && this.userData.password) {
      this.http
        .post('http://localhost:3000/api/employee/signin', this.userData)
        .subscribe(
          (resp: any) => {
            localStorage.setItem('token', resp.token);
            this.router.navigate(['/attendance']);
          },
          (error) => {
            this.errorMessage =
              error.error.message || 'Incorrect Email Or Password! ';
          }
        );
    }
  }

  // Reset form method
  resetForm(): void {
    this.signinForm.reset();
  }
}
