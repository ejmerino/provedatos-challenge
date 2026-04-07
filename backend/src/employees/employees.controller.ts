import { Controller, Get, Post, Body, Param, Query, Put, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo empleado' })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listado de empleados con filtro opcional' })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('status') status?: string,
  ) {
    return this.employeesService.findAll(search, sortBy, order, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un empleado por ID' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Actualizar estado (Vigente/Retirado)' })
  updateStatus(@Param('id') id: string, @Body('estado') estado: string) {
    return this.employeesService.updateStatus(+id, estado);
  }

  @Post(':id/photo')
  @ApiOperation({ summary: 'Subir fotografía del empleado' })
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.employeesService.savePhoto(+id, file.buffer);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar datos generales del empleado' })
  update(@Param('id') id: string, @Body() data: any) {
    // CORREGIDO: Usando el nombre correcto 'employeesService'
    return this.employeesService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un empleado' })
  remove(@Param('id') id: string) {
    // CORREGIDO: Usando el nombre correcto 'employeesService'
    return this.employeesService.remove(+id);
  }
}