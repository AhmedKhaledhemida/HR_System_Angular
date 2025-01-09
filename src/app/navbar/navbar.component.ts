import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isNavOpen = false;
  token: string | null = '';
  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  ngOnInit(): void {}

  tokencheck() {
    return (this.token = localStorage.getItem('token'));
  }

  signout() {
    localStorage.clear();
    this.token = null;
  }

  
}
