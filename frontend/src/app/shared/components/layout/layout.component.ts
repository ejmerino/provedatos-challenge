import { Component } from '@angular/core';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterOutlet],
  template: `
    <div class="flex h-screen bg-slate-100">
      <aside class="w-72 bg-slate-900 text-white p-8 flex flex-col shadow-2xl">
        <div class="text-2xl font-black mb-12 tracking-tighter text-blue-400">PROVEDATOS</div>
        
        <nav class="flex-1 space-y-4">
          <a routerLink="/employees" routerLinkActive="bg-blue-600 shadow-lg shadow-blue-900/50" 
             class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all hover:bg-slate-800">
             <span>👥</span> Nómina de Personal
          </a>
          <a routerLink="/employees/new" routerLinkActive="bg-blue-600 shadow-lg shadow-blue-900/50"
             class="flex items-center gap-3 p-4 rounded-2xl font-bold transition-all hover:bg-slate-800">
             <span>➕</span> Nuevo Registro
          </a>
        </nav>

        <button (click)="logout()" class="mt-auto p-4 bg-red-500/10 text-red-400 font-bold rounded-2xl hover:bg-red-500 hover:text-white transition-all">
          Cerrar Sesión
        </button>
      </aside>

      <main class="flex-1 overflow-y-auto p-12">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class LayoutComponent {
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}