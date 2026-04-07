import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { ProvincesModule } from './provinces/provinces.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'db',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '1234',
      database: process.env.DB_NAME || 'provedatos_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true, 
      synchronize: false, 
      logging: true,
    }),
    EmployeesModule,
    ProvincesModule,
  ],
})
export class AppModule {}