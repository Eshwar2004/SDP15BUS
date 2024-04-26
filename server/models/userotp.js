import mongoose from 'mongoose';

const userotpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const userotp = mongoose.model('UserOTP', userotpSchema);

export default userotp;