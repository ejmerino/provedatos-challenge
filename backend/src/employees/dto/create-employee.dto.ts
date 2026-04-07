import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsOptional, IsBoolean, IsDateString, MaxLength } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: '01999' })
  @IsString()
  codigo_empleado!: string;

  @ApiProperty({ example: 'Juan Pedro' })
  @IsString()
  nombres!: string;

  @ApiProperty({ example: 'Rodriguez Ischa' })
  @IsString()
  apellidos!: string;

  @IsString()
  @IsOptional()
  foto?: string;

  @IsString()
  @IsOptional()
  cargo?: string;

  @IsString()
  @IsOptional()
  fecha_nacimiento?: string;

  @ApiProperty({ example: '1722222222' })
  @IsString()
  @MaxLength(10)
  cedula!: string;

  @ApiProperty({ example: 'juan@email.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;
  

  @ApiProperty({ example: 475.50 })
  @IsNumber()
  sueldo!: number;

  @ApiProperty({ example: 10, description: 'ID de la Provincia de Residencia' })
  @IsNumber()
  id_provincia_residencia!: number;

  @ApiProperty({ example: 19, description: 'ID de la Provincia Laboral' })
  @IsNumber()
  id_provincia_laboral!: number;

  @ApiProperty({ example: '2024-04-06' })
  @IsDateString()
  fecha_ingreso!: string;

  @IsBoolean()
  @IsOptional()
  jornada_parcial?: boolean;

  @IsString()
  @IsOptional()
  departamento?: string;

  @IsString()
  @IsOptional()
  estado?: string;
}