import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));


  const config = new DocumentBuilder()
    .setTitle('PROVEDATOS API - RRHH')
    .setDescription('API por Josué Merino Calderón para la gestión de empleados y provincias')
    .setVersion('1.0')
    .addTag('employees')
    .addTag('provincias')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 2. Validaciones Globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors();
  await app.listen(3000);
  console.log(`Swagger docs at: http://localhost:3000/api/docs`);
}
bootstrap();