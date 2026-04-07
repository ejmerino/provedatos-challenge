import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Province } from '../../provinces/entities/province.entity';

@Entity('Empleado')
export class Employee {
  @PrimaryGeneratedColumn()
  id_empleado!: number;

  @Column({ unique: true })
  codigo_empleado!: string;

  @Column()
  nombres!: string;

  @Column()
  apellidos!: string;

  @Column()
  cedula!: string;

  @Column({ type: 'longblob', nullable: true })
  fotografia!: Buffer;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sueldo!: number;

  @Column({ default: '1 VIGENTE' })
  estado!: string;

  @Column({ nullable: true })
  cargo!: string;

  @Column({ nullable: true })
  departamento!: string;

  @Column({ default: false })
  jornada_parcial!: boolean;

  @Column({ nullable: true })
  fecha_ingreso!: string;

  // Usa una función flecha para evitar la circularidad
  @ManyToOne(() => Province)
  @JoinColumn({ name: 'id_provincia_residencia' })
  provincia_residencia!: Province;

  @ManyToOne(() => Province)
  @JoinColumn({ name: 'id_provincia_laboral' })
  provincia_laboral!: Province;
}