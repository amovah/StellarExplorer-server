import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  price_usd: {
    type: Number,
    required: true,
  },
  volume_usd_24h: {
    type: Number,
    required: true,
  },
  market_cap_usd: {
    type: Number,
    required: true,
  },
  percent_change_24h: {
    type: Number,
    required: true,
  },
});


export default mongoose.model('price', schema);
