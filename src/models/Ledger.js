import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  operations: {
    type: Number,
    required: true,
  },
  payments: {
    type: Number,
    required: true,
  },
  accounts: {
    type: Number,
    requried: true,
  },
  ts: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('ledger', schema);
