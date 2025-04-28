const express = require('express');
const app = express();
const libroRoutes = require('./routes/libroRoutes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', libroRoutes);

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));