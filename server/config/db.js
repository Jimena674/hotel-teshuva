// Importar modulos para conectarse a la base de datos
const db = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Conexión a la base de datos
const connection = db.createConnection(
  process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
);

connection.connect((err) => {
  if (err) {
    console.error("Error al conectarse a la base de datos.", err);
    process.exit(1);
  }
  console.log("Conectado a la base de datos.");
});

module.exports = connection;
