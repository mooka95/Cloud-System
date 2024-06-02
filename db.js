const { Pool } = require('pg');
const config = {
  connectionString: 'postgres://postgres:Torm22torm*@localhost:5432/cloudsystem?sslmode=disable',
  max: 10, // Set the maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Set the maximum idle time (30 seconds)
  connectionTimeoutMillis: 2000, // Set the maximum wait time for a new connection (2 seconds)
};

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('Database connection pool established');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: async () => {
    const client = await pool.connect();
    const release = client.release.bind(client);
    client.release = () => {
      release();
    };
    return client;
  },
};
