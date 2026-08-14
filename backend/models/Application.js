import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    career: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    coverNote: { type: String },
    status: { type: String, enum: ['submitted', 'reviewing', 'rejected', 'hired'], default: 'submitted' },
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
