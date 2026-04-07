import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(data: CreateEmployeeDto) {
  const duplicado = await this.employeeRepository.findOneBy({ cedula: data.cedula });
  if (duplicado) {
    throw new BadRequestException('¡Error! Esta cédula ya pertenece a un empleado registrado.');
  }
  const nuevo = this.employeeRepository.create(data);
  return await this.employeeRepository.save(nuevo);
}

  async updateStatus(id: number, nuevoEstado: string) {
    const employee = await this.findOne(id);
    employee.estado = nuevoEstado;
    return await this.employeeRepository.save(employee);
  }

  async findAll(search?: string, sortBy: string = 'nombres', order: 'ASC' | 'DESC' = 'ASC', status?: string) {
    const query = this.employeeRepository.createQueryBuilder('employee')
      .leftJoinAndSelect('employee.provincia_residencia', 'res')
      .leftJoinAndSelect('employee.provincia_laboral', 'lab');

    // FILTRO DE BÚSQUEDA (Texto)
    if (search) {
      query.andWhere(
        '(employee.nombres LIKE :s OR employee.apellidos LIKE :s OR employee.cedula LIKE :s)',
        { s: `%${search}%` }
      );
    }

    // FILTRO DE ESTADO (1 o 9)
    if (status && status !== 'TODOS') {
      query.andWhere('employee.estado LIKE :status', { status: `${status}%` });
    }

    const validColumns = ['nombres', 'apellidos', 'cedula', 'sueldo', 'estado'];
    const sortColumn = validColumns.includes(sortBy) ? `employee.${sortBy}` : 'employee.nombres';

    return await query.orderBy(sortColumn, order).getMany();
  }

  private validarCedula(cedula: string): boolean {
    if (cedula.length !== 10) return false;
    const digito_region = parseInt(cedula.substring(0, 2));
    if (digito_region < 1 || digito_region > 24) return false;
    
    const ultimo_digito = parseInt(cedula.substring(9, 10));
    const pares = parseInt(cedula[1]) + parseInt(cedula[3]) + parseInt(cedula[5]) + parseInt(cedula[7]);
    let impares = 0;
    for (let i = 0; i < 9; i += 2) {
      let res = parseInt(cedula[i]) * 2;
      if (res > 9) res -= 9;
      impares += res;
    }
    const suma_total = pares + impares;
    const digito_validador = suma_total % 10 ? 10 - (suma_total % 10) : 0;
    return digito_validador === ultimo_digito;
  }

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({ 
      where: { id_empleado: id },
      relations: ['provincia_residencia', 'provincia_laboral'] 
    });
    if (!employee) throw new NotFoundException('Empleado no encontrado');
    return employee;
  }

  async savePhoto(id: number, photoBuffer: Buffer) {
    const employee = await this.findOne(id);
    employee.fotografia = photoBuffer;
    return await this.employeeRepository.save(employee);
  }

  // --- MÉTODOS CORREGIDOS USANDO 'employeeRepository' ---

  async update(id: number, data: any) {
  const employee = await this.employeeRepository.findOne({ 
    where: { id_empleado: id } 
  });
  if (!employee) throw new NotFoundException('No existe');
  const { id_provincia_residencia, id_provincia_laboral, ...rest } = data;

  Object.assign(employee, rest);

  if (id_provincia_residencia) {
    employee.provincia_residencia = { id_provincia: +id_provincia_residencia } as any;
  }
  if (id_provincia_laboral) {
    employee.provincia_laboral = { id_provincia: +id_provincia_laboral } as any;
  }

  return await this.employeeRepository.save(employee);
}

  async remove(id: number) {
    // CORREGIDO: 'this.repo' -> 'this.employeeRepository'
    const emp = await this.employeeRepository.findOneBy({ id_empleado: id });
    if (!emp) throw new NotFoundException('No existe el empleado, ve.');
    return await this.employeeRepository.remove(emp);
  }

  async getReport(sortBy: string = 'apellidos', order: 'ASC' | 'DESC' = 'ASC') {
    return await this.employeeRepository.find({
      relations: ['provincia_residencia', 'provincia_laboral'],
      order: { [sortBy]: order },
    });
  }
}