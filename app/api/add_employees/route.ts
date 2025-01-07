import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

// Connect to the database
const db = await mysql.createPool({
  host: "localhost",      // MySQL server host
  user: "root",      // Database user
  password:"", // Database password
  database: "nextapp", // Database name
});
export async function POST(request: Request) {
    try {
      const { name, email, phone, department } = await request.json();
  
      // Validate input
      if (!name || !email || !phone || !department) {
        return NextResponse.json(
          { error: "All fields are required." },
          { status: 400 }
        );
      }
  
      // Insert data into MySQL
      const query = `
        INSERT INTO employees (name, email, phone, department)
        VALUES (?, ?, ?, ?)
      `;
      const values = [name, email, phone, department];
  
      await db.execute(query, values);
  
      return NextResponse.json({
        message: "Employee added successfully!",
      });
    } catch (error) {
      console.error("Error inserting data:", error);
      return NextResponse.json(
        { error: "Failed to add employee. Try again later." },
        { status: 500 }
      );
    }
  }