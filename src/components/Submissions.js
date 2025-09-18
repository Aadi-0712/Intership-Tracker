// src/components/Submissions.js
import React, { useState, useEffect } from 'react';

function Submissions({ studentEmail }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/student/submissions/${studentEmail}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }

        const data = await response.json();
        setSubmissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [studentEmail]);

  if (loading) {
    return <div>Loading your submissions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Your Submissions</h3>
      {submissions.length === 0 ? (
        <p>You haven't applied for any internships yet.</p>
      ) : (
        <ul>
          {submissions.map((submission) => (
            <li key={submission._id}>
              <h4>{submission.internshipId.title}</h4>
              <p>Internship Description: {submission.internshipId.description}</p>
              <p>Status: {submission.status || 'Pending'}</p>
              <p>Resume: <a href={submission.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Submissions;
