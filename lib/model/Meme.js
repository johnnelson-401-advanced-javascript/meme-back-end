const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  topText: String,
  imageUrl: {
    type: String,
    required: true
  },
  bottomText: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

});

module.exports = mongoose.model('Meme', schema);
