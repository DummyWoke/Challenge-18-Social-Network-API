const { Schema, model ,Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
  
      reactionBody: {
        type: String,
        required: true,
      },
  
      username: {
        type: String,
        required: true,
        required:"Username needed",
      },
  
      CreationTime: {
        type: Date,
        default: Date.now,
        
      },
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

const ThoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 4,
      required:"Username needed",
    },
    thoughtContent: {
      type: String,
      required:"Content Required"
    },
    CreationTime: {
        type: Date,
        default: Date.now,
      },

    reactions: [ReactionSchema],
  
  },
  {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
