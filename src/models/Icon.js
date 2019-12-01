import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  assetid: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
}, {
  timestamp: true,
});

export default mongoose.model('icon', schema);
