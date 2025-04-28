import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/api/items');
    const data = await res.json();
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`http://localhost:5000/api/items/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setEditingId(null);
    } else {
      await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    }
    setFormData({ name: '' });
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ name: item.name });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/items/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">CRUD React + Node.js (MVC)</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            required
          />
          <button className="btn btn-primary" type="submit">
            {editingId ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
      <ul className="list-group">
        {items.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name}
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(item)}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;