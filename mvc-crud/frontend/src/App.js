import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Table, Form } from 'react-bootstrap';

function App() {
  const [autores, setAutores] = useState([]);
  const [libros, setLibros] = useState([]);
  const [mostrarLibros, setMostrarLibros] = useState(false);
  const [autorSeleccionado, setAutorSeleccionado] = useState(null);
  const [nuevoAutor, setNuevoAutor] = useState({
    nombre: '',
    nacionalidad: '',
    fecha_nacimiento: '',
    biografia: ''
  });

  useEffect(() => {
    obtenerAutores();
  }, []);

  const obtenerAutores = async () => {
    const res = await axios.get('http://localhost:3001/autores');
    setAutores(res.data);
  };

  const agregarAutor = async () => {
    await axios.post('http://localhost:3001/autores', nuevoAutor);
    setNuevoAutor({ nombre: '', nacionalidad: '', fecha_nacimiento: '', biografia: '' });
    obtenerAutores();
  };

  const eliminarAutor = async (id) => {
    await axios.delete(`http://localhost:3001/autores/${id}`);
    obtenerAutores();
  };

  const verLibros = async (id) => {
    const res = await axios.get(`http://localhost:3001/autores/${id}/libros`);
    setLibros(res.data);
    setAutorSeleccionado(id);
    setMostrarLibros(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">GESTIÓN DE AUTORES</h2>

      <Form className="mb-4">
        <h5>Agregar Autor</h5>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={nuevoAutor.nombre}
            onChange={(e) => setNuevoAutor({ ...nuevoAutor, nombre: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Nacionalidad"
            value={nuevoAutor.nacionalidad}
            onChange={(e) => setNuevoAutor({ ...nuevoAutor, nacionalidad: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="date"
            value={nuevoAutor.fecha_nacimiento}
            onChange={(e) => setNuevoAutor({ ...nuevoAutor, fecha_nacimiento: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            placeholder="Biografía"
            value={nuevoAutor.biografia}
            onChange={(e) => setNuevoAutor({ ...nuevoAutor, biografia: e.target.value })}
          />
        </Form.Group>
        <Button onClick={agregarAutor}>Agregar</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nacionalidad</th>
            <th>Fecha Nacimiento</th>
            <th>Biografía</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autores.map((autor) => (
            <tr key={autor.id_autor}>
              <td>{autor.nombre}</td>
              <td>{autor.nacionalidad}</td>
              <td>{new Date(autor.fecha_nacimiento).toISOString().split('T')[0]}</td>
              <td>{autor.biografia}</td>
              <td>
                <Button className="me-2" onClick={() => verLibros(autor.id_autor)}>
                  Ver Libros
                </Button>
                <Button variant="danger" onClick={() => eliminarAutor(autor.id_autor)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={mostrarLibros} onHide={() => setMostrarLibros(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Libros del Autor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {libros.map((libro) => (
              <li key={libro.id_lubro}>{libro.titulo}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setMostrarLibros(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
