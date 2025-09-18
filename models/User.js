// models/User.js
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], required: true }
});

// // Hash password before saving user to database
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Compare hashed password with input
// UserSchema.methods.matchPassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model('User', UserSchema);
