import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceRecordComponent } from './attendance-record/attendance-record.component';

export const routes: Routes = [
  { path: 'Signin', component: SigninComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'records', component: AttendanceRecordComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
];
