import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Technology', technologySchema);
