import express from 'express';
import cors from 'cors';
import rutas from './routes/routes.js';  

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', rutas);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
