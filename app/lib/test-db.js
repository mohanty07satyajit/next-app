import mysql from "mysql2/promise";

const testConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "", // Replace with your MySQL root password
      database: "nextapp", // Replace with your DB name
    });

    console.log("Connected to MySQL successfully!");
    connection.end();
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
  }
};

testConnection();
