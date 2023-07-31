import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model('Customer', customerSchema);


