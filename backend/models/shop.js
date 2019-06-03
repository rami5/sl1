const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
  parit: { type: String, required: true },
  number: { type: Number, required: true }
});

module.exports = mongoose.model('Shop', shopSchema);
