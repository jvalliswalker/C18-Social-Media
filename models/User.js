const { Schema, model } = require('mongoose');
const { emailRegex } = require('../utils/modelUtils');
const Thought = require('./Thought');

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
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  {
    toJSON: { virtuals: true }
  }
);

// Create friend count virtual
userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
})

// Delete related Thought documents on User deletion
userSchema.pre(
  'deleteOne', 
  { document: true, query: false },
  async function() {
    await Thought.deleteMany({
      _id: { $in: this.thoughts }
    });
  }
);


const User = model('user', userSchema);

module.exports = User;