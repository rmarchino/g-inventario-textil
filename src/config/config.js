require("dotenv").config();

module.exports ={
  development: {
    username: "postgres",
    password: "root",
    database: "db_gestion",
    port: 5432,
    host: "localhost",
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: { ssl: { required: true, rejectUnauthorized: false } },
  },
}
