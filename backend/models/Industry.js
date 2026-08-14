import mongoose from 'mongoose';

const industrySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true }, // matches a key in the frontend's industryIcons map
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Industry', industrySchema);
