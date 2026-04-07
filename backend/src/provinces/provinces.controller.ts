import { Controller, Get } from '@nestjs/common';
import { ProvincesService } from './provinces.service';

@Controller('provincias')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Get()
  findAll() {
    return this.provincesService.findAll();
  }
}