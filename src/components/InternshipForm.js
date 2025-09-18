import React, { useState } from 'react';

function InternshipForm({ studentEmail }) {
  const [internshipId, setInternshipId] = useState('');
  const [resume, setResume] = useState(null);

  const handleApply = async (e) => {
    e.preventDefault();
  
    const data = {
      studentEmail: studentEmail,
      internshipId: internshipId,
    };
  
    const response = await fetch('http://localhost:5000/api/student/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Important for sending JSON
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
  
    if (response.ok) {
      alert('Application submitted!');
      setInternshipId('');
    } else {
      alert(result.message || 'Failed to apply');
    }
  };
  

  return (
    <div>
      <h3>Apply for an Internship</h3>
      <form onSubmit={handleApply} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Internship ID"
          value={internshipId}
          onChange={(e) => setInternshipId(e.target.value)}
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setResume(e.target.files[0])}
          required
        />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default InternshipForm;
