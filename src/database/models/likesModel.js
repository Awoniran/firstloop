const Mongoose = require('mongoose');

const likeSchema = Mongoose.Schema({
   comment: String,
   likeBy: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
   },
   date: Date.now,
});

module.exports = Mongoose.model('Comment', likeSchema);
