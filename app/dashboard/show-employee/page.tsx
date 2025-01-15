"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation"; // Use next/navigation

const ShowEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();
  const editEmployee = (id) => {
    // Navigate to the edit employee page with the employee ID as a parameter
    router.push(`/dashboard/edit-employee?id=${id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/show_employees", { cache: "no-cache" });
        const result = await response.json();
        if (Array.isArray(result) && Array.isArray(result[0])) {
            setEmployees(result[0]); // Set the rows as the state
            // console.log("Extracted Rows:", result[0]);
          } else {
            console.error("Unexpected data format:", result);
          }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);
return (
    <div>
      <h1>Employee List</h1>
      {/* <button onClick={() => AddEmployee} >
                    Add
                  </button> */}
                  <Link style={{float: "right",paddingBottom: "9px"}}href="/dashboard/add-employee">
        <button>Add Employee</button>
      </Link>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
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
              <tr key={employee?.id}>
                <td>{employee?.id}</td>
                <td>{employee?.name}</td>
                <td>{employee?.email}</td>
                <td>{employee?.phone}</td>
                <td>{employee?.department}</td>
                <td>
                  <button onClick={() => alert(`Details of ${employee.name}`)}>
                    View
                  </button>
                  <button onClick={() => editEmployee(employee.id)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowEmployee;
