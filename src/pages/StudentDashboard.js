import React, { useState, useEffect } from 'react';
import InternshipForm from '../components/InternshipForm';
import Submissions from '../components/Submissions';
import InternshipList from '../components/InternshipList'; // Importing the InternshipList component
import './StudentDashboard.css';

function StudentDashboard() {
  const studentEmail = localStorage.getItem('studentEmail'); // Get the student's email from localStorage
  const [submissions, setSubmissions] = useState([]); // Store submissions in state

  // Function to fetch submissions from the backend
  const fetchSubmissions = async () => {
    if (studentEmail) {
      const response = await fetch(`http://localhost:5000/api/student/submissions/${studentEmail}`);
      const data = await response.json();
      setSubmissions(data);
    }
  };

  // Call fetchSubmissions on initial render if studentEmail exists
  useEffect(() => {
    fetchSubmissions();
  }, [studentEmail]);

  // Update submissions when a new internship is applied
  const handleApplySuccess = (internshipId) => {
    // Update the state to add the new internship to the submissions list
    const newSubmission = { internshipId }; // Adjust to the structure you want for the submission
    setSubmissions((prevSubmissions) => [...prevSubmissions, newSubmission]);
  };

  if (!studentEmail) {
    return <div>Please log in to view your dashboard</div>;
  }

  return (
    <div>
      <h2>Welcome, Student</h2>

      {/* Show available internships */}
      <InternshipList studentEmail={studentEmail} />

      {/* Apply for internship */}
      <InternshipForm studentEmail={studentEmail} onApplySuccess={handleApplySuccess} />

      {/* Show submitted applications */}
      <Submissions submissions={submissions} />
    </div>
  );
}

export default StudentDashboard;
