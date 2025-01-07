// pages/dashboard/dataTable.js
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container, Typography } from '@mui/material';

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'department', headerName: 'Department', width: 180 },
    { field: 'phone', headerName: 'Phone', width: 180 },
  ];

  useEffect(() => {
    // Fetch the employee data from your API or database
    const fetchData = async () => {
      setLoading(true);
      // Sample data, replace with an API call
      const response = await fetch('/api/employees');
      const data = await response.json();
      setRows(data);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Data Table
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows} // The row data
          columns={columns} // Column definitions
          pageSize={5} // Pagination settings
          rowsPerPageOptions={[5, 10, 20]} // Options for pagination
          loading={loading} // Loading indicator
          checkboxSelection // Optional: Add checkbox selection
          disableSelectionOnClick // Disable selection when clicking on row
        />
      </div>
      <Button variant="contained" color="primary">
        Add Employee
      </Button>
    </Container>
  );
}
