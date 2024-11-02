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
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: { virtuals: true }
  }
)

thoughtSchema.virtual('createdDate').get(function(){
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return this.createdAt.toLocaleDateString("en-US", options);
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought