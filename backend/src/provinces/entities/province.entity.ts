import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Provincia')
export class Province {
  @PrimaryGeneratedColumn()
  id_provincia!: number;

  @Column()
  nombre_provincia!: string;

  @Column({ nullable: true })
  capital_provincia!: string;

  @Column({ type: 'text', nullable: true })
  descripcion_provincia!: string;

  @Column({ nullable: true })
  poblacion_provincia!: string;

  @Column({ nullable: true })
  superficie_provincia!: string;

  @Column({ nullable: true })
  latitud_provincia!: string;

  @Column({ nullable: true })
  longitud_provincia!: string;

  @Column({ nullable: true })
  id_region!: number;
}