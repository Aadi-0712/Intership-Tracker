const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const Internship = require('../models/Internship');
const User = require('../models/User');

// Get all submissions by a student
// In your student.js route file

// Get all submissions by a student
router.get('/submissions/:studentEmail', async (req, res) => {
  try {
    // Find student by email (use studentEmail instead of studentId for this example)
    const student = await User.findOne({ email: req.params.studentEmail });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Get all submissions for this student
    const submissions = await Submission.find({ studentId: student._id })
      .populate('internshipId'); // Populate the internship details (title, description, etc.)

    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update-status/:submissionId', async (req, res) => {
  const { submissionId } = req.params;
  const { status } = req.body; // Expecting a new status

  try {
    // Find the submission by ID
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Update the status
    submission.status = status;

    // Save the updated submission
    await submission.save();

    res.status(200).json({ message: 'Submission status updated successfully', submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Submit an internship application
router.post('/submit', async (req, res) => {
  console.log("POST /submit endpoint hit");
  const { studentEmail, internshipId } = req.body;

  try {
    // Find the student by email
    const student = await User.findOne({ email: studentEmail });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if internship exists
    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Create a new submission
    const newSubmission = new Submission({
      studentId: student._id,
      internshipId: internship._id,
    });

    // Save the new submission to the database
    await newSubmission.save();

    res.status(201).json({ message: 'Application submitted successfully', submission: newSubmission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
