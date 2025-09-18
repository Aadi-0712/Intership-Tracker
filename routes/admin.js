// routes/admin.js
const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');

// POST /api/admin/internships
router.post('/internships', async (req, res) => {
  const { title, description } = req.body;

  try {
    const internship = new Internship({ title, description });
    await internship.save();
    res.status(201).json({ message: 'Internship added' });
  } catch (err) {
    console.error('Error saving internship:', err);
    res.status(500).json({ message: 'Failed to add internship' });
  }
});

router.delete('/submissions/:id', async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json({ message: 'Submission deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/internships', async (req, res) => {
  try {
    const internships = await Internship.find();  // Fetch all internships from DB
    res.json(internships);  // Return the internships in the response
  } catch (err) {
    console.error('Error fetching internships:', err);
    res.status(500).json({ message: 'Failed to fetch internships' });
  }
});

// In your backend route file (e.g., admin.js)

router.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find().populate('internshipId'); // populate internship details

    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
