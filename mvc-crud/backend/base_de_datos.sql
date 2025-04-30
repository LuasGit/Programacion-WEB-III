CREATE DATABASE IF NOT EXISTS mvc_autores;
USE mvc_autores;

CREATE TABLE IF NOT EXISTS autor (
  id_autor INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  nacionalidad VARCHAR(100),
  fecha_nacimiento DATE,
  biografia TEXT
);

CREATE TABLE IF NOT EXISTS libro (
  id_lubro INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  anio_publicacion INT,
  genero VARCHAR(100),
  resumen TEXT,
  id_autor INT,
  FOREIGN KEY (id_autor) REFERENCES autor(id_autor)
);

INSERT INTO autor (nombre, nacionalidad, fecha_nacimiento, biografia) VALUES
('Gabriel García Márquez', 'Colombiana', '1927-03-06', 'Autor de realismo mágico, famoso por "Cien Años de Soledad".'),
('Isabel Allende', 'Chilena', '1942-08-02', 'Autora de novelas como "La Casa de los Espíritus".'),
('Mario Vargas Llosa', 'Peruana', '1936-03-28', 'Premio Nobel de Literatura 2010.');

INSERT INTO libro (titulo, anio_publicacion, genero, resumen, id_autor) VALUES
('Cien Años de Soledad', 1967, 'Realismo mágico', 'Novela emblemática del realismo mágico y la saga de la familia Buendía.', 1),
('El Amor en los Tiempos del Cólera', 1985, 'Romance', 'Historia de amor perdurable ambientada en la costa caribeña.', 1),
('La Casa de los Espíritus', 1982, 'Realismo mágico', 'Saga familiar que mezcla lo sobrenatural con la historia de Chile.', 2),
('Eva Luna', 1987, 'Realismo mágico', 'Novela centrada en la vida de una cuentista llamada Eva Luna.', 2);
