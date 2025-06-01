import pool from '../config/bd.js'; 

const validarCiudad = (ciudad) => {
  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
  const regionRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,100}$/; //AQUI TAMBIEN SE USA LA VALIDACION REGULAR
  return nombreRegex.test(ciudad.nombre) && regionRegex.test(ciudad.region);
};

export const getCiudades = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ciudad');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCiudad = async (req, res) => {
  const { nombre, poblacion, region, id_pais } = req.body;
  if (!validarCiudad({ nombre, region })) {
    return res.status(400).json({ error: 'Validación fallida para nombre o región' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO ciudad (nombre, poblacion, region, id_pais) VALUES (?, ?, ?, ?)',
      [nombre, poblacion, region, id_pais]
    );
    res.json({ id: result.insertId, nombre, poblacion, region, id_pais });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCiudad = async (req, res) => {
  const { id } = req.params;
  const { nombre, poblacion, region, id_pais } = req.body;
  if (!validarCiudad({ nombre, region })) {
    return res.status(400).json({ error: 'Validación fallida para nombre o región' });
  }
  try {
    await pool.query(
      'UPDATE ciudad SET nombre = ?, poblacion = ?, region = ?, id_pais = ? WHERE id_ciudad = ?',
      [nombre, poblacion, region, id_pais, id]
    );
    res.json({ id, nombre, poblacion, region, id_pais });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCiudad = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM ciudad WHERE id_ciudad = ?', [id]);
    res.json({ message: 'Ciudad eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
