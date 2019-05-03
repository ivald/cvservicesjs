module.exports = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'testdb',
    host: 'localhost',
    dialect: 'postgres',
    port: '5432',
    server_port: 3000,
    jwt_secret_key: process.env.SECRET_KEY,
    guest_password: process.env.GUEST_PASSWORD
  },
  testing: {
    username: 'postgres',
    password: 'admin',
    database: 'testdb',
    host: 'localhost',
    dialect: 'postgres',
    port: '5432',
    server_port: 3030,
    jwt_secret_key: process.env.SECRET_KEY,
    guest_password: process.env.GUEST_PASSWORD
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    port: '5432',
    jwt_secret_key: process.env.SECRET_KEY,
    guest_password: process.env.GUEST_PASSWORD
  },
  ports: {
    client_port: 9090,
    server_port: 9091
  }
};
