import React, { useEffect, useState } from 'react';

function InternshipList({ onApply }) {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/internships')
      .then(res => res.json())
      .then(data => setInternships(data))
      .catch(err => console.error('Failed to fetch internships:', err));
  }, []);

  return (
    <div>
      <h3>Available Internships</h3>
      {internships.length === 0 ? (
        <p>No internships available.</p>
      ) : (
        <ul>
          {internships.map((internship) => (
            <li key={internship._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p><strong>ID:</strong> {internship._id}</p>
              <p><strong>Title:</strong> {internship.title}</p>
              <p><strong>Description:</strong> {internship.description}</p>
              {internship.company && <p><strong>Company:</strong> {internship.company}</p>}
              {onApply && (
                <button onClick={() => onApply(internship._id)}>Apply</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InternshipList;
    