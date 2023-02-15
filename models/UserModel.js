const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 4,
      required:"Username needed",
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      ref:"Thought",
    },],

    emailaddress: {
      type: String,
      required:"Email needed",
    },

    friends: [{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        ref:"User",
      },],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


const User = model("User", UserSchema);

module.exports = User;
