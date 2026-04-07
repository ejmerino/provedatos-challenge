export interface Province {
  id_provincia: number;
  nombre_provincia: string;
}

export interface Employee {
  id_empleado?: number;
  codigo_empleado: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  fecha_nacimiento?: string;
  email?: string;
  observaciones_personales?: string;
  foto?: any;
  fecha_ingreso: string;
  cargo: string;
  departamento: string;
  sueldo: number;
  jornada_parcial: boolean;
  observaciones_laborales?: string;
  id_provincia_residencia: number;
  id_provincia_laboral: number;
  estado: string;
}