# Provedatos Challenge - Josué Merino Calderon

Este proyecto es una solución integral para la gestión de nómina y personal, desarrollada para el proceso de selección de Provedatos. La aplicación permite administrar colaboradores, visualizar datos demográficos, filtrar por estados y generar reportes PDF.

## 🛠️ Stack Tecnológico

- **Frontend:** Angular 19 (Tailwind CSS)
- **Backend:** NestJS (Node.js 22)
- **Base de Datos:** MariaDB 10.6
- **Documentación:** Swagger (OpenAPI)
- **Infraestructura:** Docker & Docker Compose

## 🐋 Ejecución con Docker

La aplicación está completamente dockerizada. Esto garantiza que el entorno de base de datos, backend y frontend se levante de forma idéntica en cualquier máquina.

### Requisitos
- Docker Desktop instalado y corriendo.

### Instrucciones
1. Clone el repositorio (o descargue el ZIP).
2. Abra una terminal en la raíz del proyecto.
3. Ejecute el comando:
   ```bash
   docker-compose up --build
4. Espere a que la terminal muestre el mensaje: 
    ```bash
    Nest application successfully started.

## Puntos de Acceso
Una vez que los contenedores estén activos, podrá acceder a los diferentes servicios a través de las siguientes URLs:

1. App Web (Frontend): http://localhost:8080

2. API REST (Backend): http://localhost:3000

3. Documentación API (Swagger): http://localhost:3000/api/docs

## Información de Base de Datos

Para realizar pruebas externas o consultas directas a la base de datos, puede utilizar las siguientes credenciales:

- Host: localhost

- Puerto Local: 3311 (mapeado al puerto 3306 interno del contenedor)

- Base de Datos: provedatos_db

- Usuario: root

- Password: 1234

Nota importante: El sistema cuenta con un proceso de inicialización automática. Al levantar el contenedor de la base de datos por primera vez, se ejecuta el script init.sql (ubicado en /database), el cual crea las tablas necesarias y precarga el catálogo de provincias junto con 10 registros de prueba de colaboradores.

## Estructura del Proyecto

- **/frontend**
- **/backend**
- **/database**
- **docker-compose.yml**