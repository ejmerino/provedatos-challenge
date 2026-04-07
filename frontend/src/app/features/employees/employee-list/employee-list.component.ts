import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../models/employee.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchTerm: string = '';
  sortBy: string = 'nombres';
  order: 'ASC' | 'DESC' = 'ASC';
  statusFilter: string = 'TODOS';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() { this.loadEmployees(); }

  loadEmployees() {
    this.employeeService.getEmployees(this.searchTerm, this.sortBy, this.order, this.statusFilter).subscribe({
      next: (data) => this.employees = data
    });
  }

  deleteEmployee(id: number) {
    if (confirm('¿Seguro que quieres borrar a este colaborador? Esta acción es irreversible.')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: () => alert('No se pudo eliminar el registro.')
      });
    }
  }

  toggleSort(column: string) {
    if (this.sortBy === column) {
      this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = column;
      this.order = 'ASC';
    }
    this.loadEmployees();
  }

  generateReport() {
    const doc = new jsPDF('l', 'mm', 'a4'); // 'l' para horizontal, así caben todas las columnas
    
    doc.setFontSize(18);
    doc.text('REPORTE INTEGRAL DE NÓMINA - PROVEDATOS', 14, 20);

    // Mapeamos los datos exactamente como los pediste
    const data = this.employees.map(e => [
      e.codigo_empleado,
      `${e.nombres} ${e.apellidos}`,
      e.cedula,
      e.email || 'N/A',
      e.cargo || 'N/A',
      `$${Number(e.sueldo).toFixed(2)}`,
      e.estado
    ]);

    autoTable(doc, {
      startY: 35,
      head: [['ID', 'Nombre Completo', 'Cédula', 'Email', 'Cargo', 'Sueldo', 'Estado']],
      body: data,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], fontStyle: 'bold' },
      styles: { fontSize: 8 } // Bajamos un punto para que no se amontone
    });

    doc.save(`Reporte_Provedatos_${new Date().getTime()}.pdf`);
  }
}