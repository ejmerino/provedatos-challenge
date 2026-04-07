import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './core/services/employee.service';
import { Employee } from './models/employee.model';
import { RouterOutlet } from '@angular/router'; // <--- 1. Importa esto

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // <-- Para usar *ngFor
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        console.log('Empleados cargados:', data);
      },
      error: (err) => console.error('El backend está apagado o hay CORS error', err)
    });
  }
}