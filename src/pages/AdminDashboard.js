import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]); // Ensure it's an array by default
  const [internships, setInternships] = useState([]);
  const [newInternship, setNewInternship] = useState({ title: '', company: '', description: '' });

  useEffect(() => {
    fetchInternships();
    fetchSubmissions();
  }, []);

  // Fetch all internships from the backend
  const fetchInternships = async () => {
    const response = await fetch('http://localhost:5000/api/admin/internships');
    const data = await response.json();
    setInternships(data);
  };

  // Fetch all submissions from the backend
  const fetchSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/submissions');
      const data = await response.json();

      // Ensure that data is an array before setting the state
      if (Array.isArray(data)) {
        setSubmissions(data);
      } else {
        console.error("Submissions data is not an array:", data);
        setSubmissions([]); // Fallback to empty array if data is not an array
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setSubmissions([]); // Fallback to empty array in case of error
    }
  };

  // Handle adding a new internship
  const handleAddInternship = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/admin/internships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInternship),
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      setNewInternship({ title: '', company: '', description: '' });
      fetchInternships();
    } else {
      alert(data.message || 'Failed to add internship');
    }
  };

  // Handle deleting an internship
  const handleDeleteInternship = async (id) => {
    const response = await fetch(`http://localhost:5000/api/admin/internships/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      fetchInternships();
    } else {
      alert(data.message || 'Failed to delete internship');
    }
  };

  // Handle deleting a submission
  const handleDeleteSubmission = async (id) => {
    const response = await fetch(`http://localhost:5000/api/admin/submissions/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      setSubmissions(submissions.filter((submission) => submission._id !== id));
    } else {
      alert(data.message || 'Failed to delete submission');
    }
  };

  // Handle changing the status of a submission
  const handleStatusChange = async (submissionId, newStatus) => {
    const response = await fetch(`http://localhost:5000/api/admin/update-status/${submissionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Status updated');
      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) =>
          submission._id === submissionId ? { ...submission, status: newStatus } : submission
        )
      );
    } else {
      alert(data.message || 'Failed to update status');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Add New Internship Form */}
      <h3>Add New Internship</h3>
      <form onSubmit={handleAddInternship}>
        <input
          type="text"
          placeholder="Title"
          value={newInternship.title}
          onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={newInternship.company}
          onChange={(e) => setNewInternship({ ...newInternship, company: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newInternship.description}
          onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
          required
        />
        <button type="submit">Add Internship</button>
      </form>

      {/* List of Submissions */}
      <h3>Internship Submissions</h3>
      <ul>
        {submissions && Array.isArray(submissions) && submissions.length > 0 ? (
          submissions.map((submission) => (
            <li key={submission._id}>
              <h4>{submission.internshipId.title}</h4>
              <p>{submission.internshipId.company}</p>
              <p>Status: {submission.status}</p>
              {/* Dropdown to change status */}
              <select
                value={submission.status}
                onChange={(e) => handleStatusChange(submission._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              {/* Button to delete submission */}
              <button onClick={() => handleDeleteSubmission(submission._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No submissions available</p>
        )}
      </ul>

      {/* List of Internships */}
      <h3>All Internships</h3>
      <ul>
        {internships.map((internship) => (
          <li key={internship._id}>
            <h4>{internship.title}</h4>
            <p>{internship.company}</p>
            <p>{internship.description}</p>
            <button onClick={() => handleDeleteInternship(internship._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
