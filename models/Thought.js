const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
    username: {
      tyle: String,
      required: true
    },
    reactions: [reactionSchema]
  }
)

thoughtSchema.virtual('createdAt').get(() => {
  return 'hello';
});

const Thought = module('thought', thoughtSchema);

module.exports = Thought