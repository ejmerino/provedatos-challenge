SET NAMES 'utf8';
SET CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS Provincia (
    id_provincia INT AUTO_INCREMENT PRIMARY KEY,
    nombre_provincia VARCHAR(100) NOT NULL,
    capital_provincia VARCHAR(100),
    descripcion_provincia TEXT,
    poblacion_provincia VARCHAR(50),
    superficie_provincia VARCHAR(50),
    latitud_provincia VARCHAR(50),
    longitud_provincia VARCHAR(50),
    id_region INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO Provincia 
(nombre_provincia, capital_provincia, descripcion_provincia, poblacion_provincia, superficie_provincia, latitud_provincia, longitud_provincia, id_region) 
VALUES 
('Azuay', 'Cuenca', 'Llamada la Atenas del Ecuador por su arquitectura, su diversidad cultural, su aporte a las artes, ciencias y letras...', '569.42', '122.00', '-2.902222', '-79.005261', 1),
('Bolivar', 'Guaranda', 'Provincia del centro de Ecuador, en la cordillera occidental de los Andes. Su capital es la ciudad de Guaranda.', '183 641', '3254.00', '-1.6', '-79', 1),
('Cañar', 'Azoguez', 'Destaca como uno de los sitios turísticos más importantes del país, como la Fortaleza de Ingapirca.', '33848.00', '3908.00', '-2.733333', '-78.833333', 1),
('Carchi', 'Tulcán', 'Provincia ecuatoriana situada al norte en la frontera con Colombia. Forma parte de la región 1.', '82734.00', '3783.00', '0.811667', '-77.718611', 1),
('Chimborazo', 'Riobamba', 'Se encuentran varias de las cumbres más elevadas del país, como el Carihuairazo y el Altar.', '223586.00', '6487.00', '-1.666667', '-78.65', 1),
('Cotopaxi', 'Latacunga', 'La provincia toma el nombre del volcán más grande e importante de su territorio.', '409 205', '6569.00', '-0.933333', '-78.616667', 1),
('El Oro', 'Machala', 'La capital de la provincia es Machala, considerada como la capital bananera del mundo.', '260528.00', '6188.00', '-3.266669', '-79.9667', 2),
('Esmeraldas', 'Esmeraldas', 'Provincia verde. Su capital es uno de los puertos principales del Ecuador.', '189504.00', '15 954', '-0.966667', '-79.65', 2),
('Galápagos', 'P. Baquerizo Moreno', 'Mayor centro turístico del Ecuador y una de las reservas ecológicas más grandes del planeta.', '5600.00', '8010.00', '-0.666667', '90.55', 3),
('Guayas', 'Guayaquil', 'Mayor centro comercial e industrial del Ecuador. Es la provincia más poblada del país.', '2526927.00', '17139.00', '-2.2', '79.9667', 2),
('Imbabura', 'Ibarra', 'Conocida por sus contrastes poblacionales y núcleo de artesanías y cultura.', '181722.00', '4599.00', '0.35', '-78.133333', 1),
('Loja', 'Loja', 'Conocida como la capital musical y cultural del Ecuador.', '206.83', '57.00', '-3.833', '-80.067', 1),
('Los Rios', 'Babahoyo', 'Uno de los más importantes centros agrícolas del Ecuador.', '778115.00', '6254.00', '-1.766669', '-79.45', 2),
('Manabí', 'Portoviejo', 'Provincia localizada en el centro-noroeste del Ecuador continental.', '1369780.00', '18400.00', '-1.052219', '-80.4506', 2),
('Morona Santiago', 'Macas', 'Provincia de la Amazonía ecuatoriana. Su capital es la ciudad de Macas.', '147940.00', '25690.00', '-2.366667', '78.133333', 4),
('Napo', 'Tena', 'Situada en la región amazónica ecuatoriana. Toma su nombre del río Napo.', '103697.00', '13271.00', '0.989', '-77.8159', 4),
('Orellana', 'Francisco de Orellana', 'Provincia 22, creada en 1998 al ser separada de Napo.', '136396.00', '20773.00', '-0.933333', '75.666667', 4),
('Pastaza', 'Puyo', 'Situada en la Región Amazónica del Ecuador. Recibe su nombre del río Pastaza.', '83933.00', '29520.00', '-1.066667', '-78.001111', 4),
('Pichincha', 'Quito', 'Ubicada al norte del país, en la zona conocida como sierra. Su capital es Quito.', '2576287.00', '9612.00', '-0.25', '-78.583333', 1),
('Santa Elena', 'Santa Elena', 'Provincia de la costa creada en 2007, la más reciente del país.', '308693.00', '3763.00', '-2.2267', '-80.8583', 2),
('Santo Domingo de los Tsáchilas', 'Santo Domingo', 'Forma parte de la Región Costa. Su territorio está en zona de trópico húmedo.', '410937.00', '4180.00', '-0.333333', '-79.25', 2),
('Sucumbios', 'Nueva Loja', 'Provincia del nor-oriente. Provee al Estado del petróleo para exportaciones.', '176472.00', '18612.00', '-0.083333', '-76.883333', 4),
('Tungurahua', 'Ambato', 'Se encuentra al centro del país, en la región geográfica conocida como sierra.', '504583.00', '3334.00', '-1.233333', '-78.616667', 1),
('Zamora Chimchipe', 'Zamora', 'Ubicada en el sur-oriente de la Amazonía ecuatoriana.', '91376.00', '10556.00', '-2.883333', '-79', 4);

CREATE TABLE IF NOT EXISTS Empleado (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    codigo_empleado VARCHAR(10) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    cedula VARCHAR(10) NOT NULL,
    id_provincia_residencia INT,
    fecha_nacimiento DATE,
    email VARCHAR(100),
    observaciones_personales TEXT,
    fotografia LONGBLOB,
    fecha_ingreso DATE,
    cargo VARCHAR(100),
    departamento VARCHAR(100),
    id_provincia_laboral INT,
    sueldo DECIMAL(10,2),
    jornada_parcial BOOLEAN DEFAULT FALSE,
    observaciones_laborales TEXT,
    estado VARCHAR(20) DEFAULT '1 VIGENTE',
    CONSTRAINT fk_residencia FOREIGN KEY (id_provincia_residencia) REFERENCES Provincia(id_provincia),
    CONSTRAINT fk_laboral FOREIGN KEY (id_provincia_laboral) REFERENCES Provincia(id_provincia)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO Empleado (codigo_empleado, nombres, apellidos, cedula, id_provincia_residencia, fecha_nacimiento, email, observaciones_personales, fecha_ingreso, cargo, departamento, id_provincia_laboral, sueldo, jornada_parcial, estado) 
VALUES 
('01999', 'Juan Pedro', 'Rodriguez Ischa', '1722222222', 10, '2000-03-27', 'juanpRod@hotmail.com', 'Recomendado de PRUEBAS S.A.', '2009-11-16', 'Jefe de Bodega', 'Bodegas', 19, 475.00, 0, '1 VIGENTE'),
('00466', 'JOE PAUL', 'ABAD CEVALLOS', '1711111111', 1, '1990-01-01', 'joe.abad@email.com', NULL, '2020-05-15', 'Analista', 'Sistemas', 1, 530.00, 0, '9 RETIRADO'),
('02105', 'Maria Fernanda', 'Lopez Castro', '0912345678', 9, '1995-06-12', 'm.lopez@provedatos.com', 'Excelentes referencias', '2021-03-01', 'Contadora', 'Finanzas', 9, 850.00, 0, '1 VIGENTE'),
('03482', 'Carlos Andres', 'Torres Mendoza', '1309876543', 13, '1988-11-20', 'carlos.torres@gmail.com', NULL, '2015-08-10', 'Asesor Comercial', 'Ventas', 1, 600.00, 1, '1 VIGENTE'),
('04591', 'Ana Lucia', 'Garcia Solis', '1715623489', 17, '1992-02-14', 'ana.garcia@outlook.com', 'Capacitación en CRM', '2022-01-15', 'Asistente Administrativa', 'Administracion', 17, 460.00, 0, '1 VIGENTE'),
('05672', 'Luis Alberto', 'Mendez Ruiz', '0105432167', 1, '1985-09-05', 'l.mendez@provedatos.com', NULL, '2010-02-20', 'Gerente Regional', 'Gerencia', 1, 2500.00, 0, '1 VIGENTE'),
('06783', 'Diana Carolina', 'Pazmiño Vera', '1802345671', 18, '1998-07-22', 'diana.paz@email.com', 'Pasante anterior', '2023-06-01', 'Desarrollador Web', 'Sistemas', 17, 1100.00, 0, '1 VIGENTE'),
('07894', 'Roberto Javier', 'Castro Ortega', '0701122334', 7, '1980-04-30', 'r.castro@hotmail.com', 'Especialista en Logística', '2012-10-12', 'Supervisor de Planta', 'Operaciones', 7, 1200.00, 0, '9 RETIRADO'),
('08905', 'Elena Beatriz', 'Rojas Lima', '1109988776', 11, '1994-12-05', 'elena.rojas@provedatos.com', NULL, '2019-11-01', 'Analista de Talento Humano', 'Administracion', 17, 950.00, 1, '1 VIGENTE'),
('09016', 'Jorge Luis', 'Espinosa Galarza', '1723456789', 17, '1987-01-18', 'j.espinosa@gmail.com', 'Ex-empleado reingreso', '2024-02-10', 'Arquitecto de Software', 'Sistemas', 17, 1800.00, 0, '1 VIGENTE');