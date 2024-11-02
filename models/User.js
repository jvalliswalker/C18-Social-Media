const { Schema, model } = require('mongoose');
const { emailRegex } = require('../utils/modelUtils');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [emailRegex, 'Please provide a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ]
  }
);

const User = model('user', userSchema);

module.exports = User;