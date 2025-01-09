import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage = '';
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  signup() {
    if (this.registerForm.valid) {
      this.http
        .post(
          'http://localhost:3000/api/employee/signup',
          this.registerForm.value
        )
        .subscribe(
          (resp: any) => {
            localStorage.setItem('token', resp.token);
            this.resetForm();
          },
          (error) => {
            this.errorMessage = error.error.message || ' Email already Exist! ';
          }
        );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.registerForm.reset();
  }
}
