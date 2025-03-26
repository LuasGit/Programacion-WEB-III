const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Query the database using a pooled connection
pool.query('SELECT * FROM users', (err, results, fields) => {
  if (err) throw err;
  console.log(results);
});
