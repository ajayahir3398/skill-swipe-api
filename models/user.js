const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  
  // Profile Details
  bio: { type: String, maxlength: 500 },
  avatar: { type: String }, // URL to profile image
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other', 'prefer-not-to-say'] },
  
  // Location
  location: {
    city: { type: String },
    state: { type: String },
    country: { type: String },
    timezone: { type: String }
  },
  
  // Professional Info
  profession: { type: String },
  company: { type: String },
  experienceLevel: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced', 'expert'] 
  },
  yearsOfExperience: { type: Number, min: 0 },
  
  // Skills
  skillsOffered: [{ type: String }],
  skillsNeeded: [{ type: String }],
  
  // Availability & Preferences
  availability: {
    type: String,
    enum: ['full-time', 'part-time', 'freelance', 'weekends-only', 'evenings-only']
  },
  preferredMeetingType: {
    type: String,
    enum: ['in-person', 'video-call', 'phone', 'chat', 'any']
  },
  
  // Contact & Social
  phone: { type: String },
  website: { type: String },
  linkedin: { type: String },
  github: { type: String },
  
  // Preferences
  isProfileComplete: { type: Boolean, default: false },
  isPublicProfile: { type: Boolean, default: true },
  notificationsEnabled: { type: Boolean, default: true },
  
  // Additional Info
  interests: [{ type: String }],
  languages: [{ type: String }],
  certifications: [{ 
    name: String,
    issuer: String,
    dateObtained: Date,
    expiryDate: Date
  }],
  
  // Session Management
  invalidatedTokens: [{ type: String }] // Store invalidated JWT tokens
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
