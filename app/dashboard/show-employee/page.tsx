"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
}

const ShowEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const router = useRouter();

  const editEmployee = (id: number) => {
    router.push(`/dashboard/edit-employee?id=${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/show_employees", { cache: "no-cache" });
        const result: Employee[] = await response.json();
        setEmployees(result); 
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <Link style={{ float: "right", paddingBottom: "9px" }} href="/dashboard/add-employee">
        <button>Add Employee</button>
      </Link>
      <table style={{ border: "1px solid black", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email Id</th>
            <th>Mobile Number</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>
                <td>
                  <button onClick={() => alert(`Details of ${employee.name}`)}>View</button>
                  <button onClick={() => editEmployee(employee.id)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowEmployee;
