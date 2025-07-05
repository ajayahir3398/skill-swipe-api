const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  categoryKey: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    ref: 'Category'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for faster queries
subcategorySchema.index({ categoryKey: 1, key: 1 });
subcategorySchema.index({ categoryKey: 1, isActive: 1 });

module.exports = mongoose.model('Subcategory', subcategorySchema); 