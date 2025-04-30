const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const autorRoutes = require('./routes/autorRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', autorRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});