const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});

const SectionSchema = new Schema({
  section: {
    type: String,
    required: true,
  },
  questions: [QuestionSchema],
});

const DraftSchema = new Schema({
  paper_id: {
    type: String,
    required: true,
  },
  sections: [SectionSchema],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

DraftSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});


module.exports = mongoose.model('Draft', DraftSchema);
