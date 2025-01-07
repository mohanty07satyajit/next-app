import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,      // e.g., 'localhost'
  user: process.env.MYSQL_USER,      // e.g., 'root'
  password: process.env.MYSQL_PASSWORD, // DB password
  database: process.env.MYSQL_DATABASE, // Your database name
});

export default connection;
