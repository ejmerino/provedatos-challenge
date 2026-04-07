import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Usamos Signals (Angular 18+) para un estado reactivo y moderno
  isLoggedIn = signal<boolean>(localStorage.getItem('isLoggedIn') === 'true');

  constructor(private router: Router) {}

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === 'admin') {
      this.isLoggedIn.set(true);
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn.set(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}