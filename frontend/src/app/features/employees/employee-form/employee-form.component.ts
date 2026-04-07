import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { EmployeeService, Province } from '../../../core/services/employee.service';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  activeTab = signal<'personal' | 'laboral'>('personal');
  isEdit = signal<boolean>(false);
  empId = signal<number | null>(null);
  employeeForm: FormGroup;
  provinces: Province[] = [];
  imagePreview = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.initForm();
  }

  ngOnInit() {
  this.service.getProvinces().subscribe(p => this.provinces = p);
  
  const id = this.route.snapshot.params['id'];
  if (id) {
    this.isEdit.set(true);
    this.empId.set(+id);
    
    this.service.getEmployeeById(+id).subscribe({
      next: (emp: any) => {
        // REGLA SENIOR: Aplanamos los objetos para el Formulario
        this.employeeForm.patchValue({
          ...emp,
          // Sacamos el ID del objeto que manda el backend
          id_provincia_residencia: emp.provincia_residencia?.id_provincia,
          id_provincia_laboral: emp.provincia_laboral?.id_provincia,
          // Forzamos campos que podrían venir nulos
          cargo: emp.cargo || '',
          departamento: emp.departamento || 'OPERACIONES',
          estado: emp.estado || '1 VIGENTE'
        });

        if (emp.fotografia) this.imagePreview.set(emp.fotografia);
      }
    });
  } else {
    this.employeeForm.patchValue({ codigo_empleado: this.generateCode() });
  }
}

  generateCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  // VALIDACIÓN: Mayor de 18 años
  validarMayoriaEdad(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const fechaNac = new Date(control.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad >= 18 ? null : { menorDeEdad: true };
  }

  initForm() {
    return this.fb.group({
      codigo_empleado: [{ value: '', disabled: false }, [Validators.required]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      fecha_nacimiento: ['', [Validators.required, this.validarMayoriaEdad]],
      email: ['', [Validators.email]],
      id_provincia_residencia: ['', Validators.required],
      foto: [''],
      cargo: ['', Validators.required],
      sueldo: [460, [Validators.required, Validators.min(460)]],
      jornada_parcial: [false],
      id_provincia_laboral: ['', Validators.required],
      fecha_ingreso: [new Date().toISOString().split('T')[0], Validators.required],
      estado: ['1 VIGENTE'],
      departamento: ['OPERACIONES']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
        this.employeeForm.patchValue({ foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.employeeForm.invalid) return alert('Revisa el formulario, ve.');
    const rawData = this.employeeForm.getRawValue();

    const { id_empleado, ...payload } = rawData; 

    const cleanPayload = {
      ...payload,
      fecha_ingreso: rawData.fecha_ingreso ? rawData.fecha_ingreso.split('T')[0] : null,
      fecha_nacimiento: rawData.fecha_nacimiento ? rawData.fecha_nacimiento.split('T')[0] : null,
      id_provincia_residencia: +payload.id_provincia_residencia,
      id_provincia_laboral: +payload.id_provincia_laboral,
      sueldo: +payload.sueldo
    };

    const obs = this.isEdit() 
      ? this.service.updateEmployee(this.empId()!, cleanPayload)
      : this.service.createEmployee(cleanPayload);

    obs.subscribe({
      next: () => {
        alert('¡Datos actualizados correctamente!');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Servidor gritando:', err);
        alert('Error 500: Revisa que no estés duplicando la cédula o que el backend esté arriba.');
      }
    });
  }
}