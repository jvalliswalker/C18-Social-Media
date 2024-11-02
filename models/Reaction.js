const { Schema } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Schema.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: new Date()
    }
  }
)

reactionSchema.virtual('createdAt').get(() => {
  return this.createdAt;
})


module.exports = reactionSchema;