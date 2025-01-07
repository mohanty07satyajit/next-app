// app/dashboard/add-employee/page.tsx
"use client";

import { useState } from "react";
  import { useRouter } from 'next/navigation'; // Use for App Router

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/add_employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
  
      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to add employee.");
        return;
      }
  
      const result = await response.json();
      alert(result.message);
      console.log("Added Employee:", result.employee);
      router.push('/dashboard/show-employee'); // Redirect after successful add
      // Reset form
      setEmployee({ name: "", email: "", phone: "", department: "" });
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="container">
      <h1>Add Employee Details</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 600px;
          margin: auto;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        label {
          display: flex;
          flex-direction: column;
          font-size: 16px;
        }
        input {
          padding: 8px;
          font-size: 14px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        button {
          padding: 10px;
          font-size: 16px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default AddEmployee;
