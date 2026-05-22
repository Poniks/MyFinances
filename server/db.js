const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // nazwa użytkownika w pgAdmin (standardowo postgres)
  password: "TWOJE_HASLO", //  hasło do pgAdmin
  host: "localhost",
  port: 5432, // Standardowy port PostgreSQL
  database: "myfinances_db",
});

module.exports = pool;
