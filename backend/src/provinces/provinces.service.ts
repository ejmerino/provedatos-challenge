import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './entities/province.entity';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) {}

  async findAll() {
    // Retorna todas las provincias ordenadas alfabéticamente
    return await this.provinceRepository.find({
      order: { nombre_provincia: 'ASC' }
    });
  }
}