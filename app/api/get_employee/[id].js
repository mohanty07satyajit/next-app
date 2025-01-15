// /pages/api/get_employee/[id].js
// Remove or use the 'error' variable
export default async function handler(req, res) {
    const { id } = req.query; // Dynamic route parameter
    if (req.method === 'GET') {
      try {
        // Simulate fetching employee data (replace with actual DB query)
        const employee = { id, name: "John Doe", email: "john@example.com", phone: "1234567890", department: "HR" };
        res.status(200).json(employee);
      } catch (error) {
       if(error){
        res.status(500).json();
       }
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  