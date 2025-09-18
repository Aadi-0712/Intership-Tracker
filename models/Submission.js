const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
  dateSubmitted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submission', SubmissionSchema);
  