import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

// Connect to the database
const db = await mysql.createPool({
  host: "localhost",      // MySQL server host
  user: "root",      // Database user
  password:"", // Database password
  database: "nextapp", // Database name
});

export async function GET(request: Request) {
  try {
    const query = `
     SELECT * FROM employees;`;
    const values = [""];

  const [rows] = await db.execute(query);
  return NextResponse.json([rows]);
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { error: "Failed to add employee. Try again later." },
      { status: 500 }
    );
  }
}
