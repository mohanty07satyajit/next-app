"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const EditEmployee = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use for query parameters if needed
  const id = searchParams.get('id'); // Alternatively, use dynamic routes for /[id] structure
  
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: ""
  });

  useEffect(() => {
    if (id) {
      const fetchEmployeeData = async () => {
        try {
            console.log('----===================-----------');

          const response = await fetch(`/api/get_employee/${id}`);
          const data = await response.json();
          if (data) {
            setEmployee(data);
          } else {
            alert("Employee not found!");
          }
        } catch (error) {
          console.error("Error fetching employee details:", error);
        }
      };
      fetchEmployeeData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/update_employee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        alert("Employee updated successfully!");
        router.push("/dashboard/show-employee"); // Navigate back to the employee list
      } else {
        alert("Failed to update employee.");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <h1>Edit Employee</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
