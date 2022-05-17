// for one on one messages
const { Schema, model } = require('mongoose');

const messageSchema = Schema(
   {
      sender: {
         type: Mongoose.Schema.ObjectId,
         ref: 'User',
      },
      content: {
         type: String,
         trim: true,
      },
      readBy: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'User',
         },
      ],
   },
   { timestamps: true }
);
module.exports = model('Message', messageSchema);
