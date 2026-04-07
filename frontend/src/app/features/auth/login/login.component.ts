import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div class="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl">
        <h2 class="text-3xl font-black text-slate-800 mb-2">Bienvenido</h2>
        <p class="text-slate-400 mb-8 font-medium">Ingresa tus credenciales de Provedatos</p>
        
        <div class="space-y-4">
          <input [(ngModel)]="user" type="text" placeholder="Usuario" class="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all">
          <input [(ngModel)]="pass" type="password" placeholder="Contraseña" class="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all">
          
          <button (click)="handleLogin()" class="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  user = ''; pass = '';

  constructor(private router: Router) {}

  handleLogin() {
    if (this.user === 'admin' && this.pass === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/employees']);
    } else {
      alert('Credenciales incorrectas (Usa admin/admin)');
    }
  }
}