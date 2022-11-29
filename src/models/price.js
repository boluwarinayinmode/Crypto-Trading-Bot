const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const PriceSchema = new mongoose.Schema({
  base: {
    type: String,
    enum: ['BTC'],
    required: true
  },
  
  currency: {
    type: String,
    enum: ['USD', 'GBP', 'EUR'],
    required: true
  },
  buy: {
    type: Number,
    required: true
  },

  spot: {
    type: Number,
    required: true
  },

  sell: {
    type: Number,
    required: true
  },

  time: {
    type: Date,
    default: Date.now,
    index: true,
    required: true
  }

})

PriceSchema.statics.getAverage = async (start, end = Date() = {}) => {
  console.log(start);
  console.log(end);

}

const Price = mongoose.model('Price', PriceSchema)
module.exports = Price;