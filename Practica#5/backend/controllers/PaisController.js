import pool from '../config/bd.js';  

const validarPais = (pais) => {
  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/; //AQUI SE USA VALIDACION REGULAR
  const capitalRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/; 
  return nombreRegex.test(pais.nombre) && capitalRegex.test(pais.capital);
};

export const getPaises = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pais');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPais = async (req, res) => {
  const { nombre, capital, continente } = req.body;
  if (!validarPais({ nombre, capital })) {
    return res.status(400).json({ error: 'Validación fallida para nombre o capital' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO pais (nombre, capital, continente) VALUES (?, ?, ?)',
      [nombre, capital, continente]
    );
    res.json({ id: result.insertId, nombre, capital, continente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePais = async (req, res) => {
  const { id } = req.params;
  const { nombre, capital, continente } = req.body;
  if (!validarPais({ nombre, capital })) {
    return res.status(400).json({ error: 'Validación fallida para nombre o capital' });
  }
  try {
    await pool.query(
      'UPDATE pais SET nombre = ?, capital = ?, continente = ? WHERE id_pais = ?',
      [nombre, capital, continente, id]
    );
    res.json({ id, nombre, capital, continente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePais = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM pais WHERE id_pais = ?', [id]);
    res.json({ message: 'País eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
