const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const itemRoutes = require('./routes/itemRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/items', itemRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});