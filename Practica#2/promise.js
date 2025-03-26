const mysql = require('mysql2/promise');

async function main() {
  try {
    // Connect to the database using promises
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'testdb'
    });
    
    console.log('Connected to MySQL Database!');
    
    // Execute a query using promise
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    console.log('Query Result:', rows);
    
    // Close the connection
    await connection.end();
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
