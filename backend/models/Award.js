import mongoose from 'mongoose';

const awardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    year: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Award', awardSchema);
