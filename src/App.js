import { useState, useEffect } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch(() => alert("failed to fetch data"));
  }, []);

  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = employees.slice(startIndex, startIndex + rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Employee Data Table</h1>
      <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#009688", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((emp) => (
            <tr key={emp.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{emp.id}</td>
              <td style={{ padding: "10px" }}>{emp.name}</td>
              <td style={{ padding: "10px" }}>{emp.email}</td>
              <td style={{ padding: "10px" }}>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handlePrevious}
          style={{
            backgroundColor: "#009688",
            color: "white",
            padding: "8px 16px",
            marginRight: "8px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Previous
        </button>
        <span
          style={{
            backgroundColor: "#009688",
            color: "white",
            padding: "8px 12px",
            borderRadius: "4px",
          }}
        >
          {currentPage}
        </span>
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "#009688",
            color: "white",
            padding: "8px 16px",
            marginLeft: "8px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
