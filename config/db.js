import _mysql from 'mysql2/promise'; // Usamos la versión con Promesas

const pool = _mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '45909423',
  database: 'actividad2',
  waitForConnections: true,
  connectionLimit: 8,
  queueLimit: 0
});

export default pool;