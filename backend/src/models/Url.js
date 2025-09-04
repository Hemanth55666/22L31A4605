import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
  {
    shortCode: { type: String, required: true, unique: true, index: true },
    longUrl: { type: String, required: true },
    visitCount: { type: Number, default: 0 },
    expiresAt: { type: Date }
  },
  { timestamps: true } 
);

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Url', urlSchema);
