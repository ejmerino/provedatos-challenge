import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './entities/employee.entity';
import { ProvincesModule } from '../provinces/provinces.module';

@Module({
  imports: [
    // Registramos la entidad de empleado
    TypeOrmModule.forFeature([Employee]),
    // Importamos el módulo de provincias para usar su repositorio
    ProvincesModule 
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}