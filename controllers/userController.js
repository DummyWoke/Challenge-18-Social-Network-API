const { User, Thought } = require('../models');

module.exports = {
  // Get all Users
  getUser(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
 
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
      !User
      ? res.status(404).json({ message: 'No user with that ID' })
      : Thought.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() => res.json({ message: 'user and thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  // Create a reaction
  createFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friend: req.body } },
        { runValidators: true, new: true }
      )
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  // Delete a reaction
  deleteFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reaction: { reactionId: req.params.friendId } } },
        { runValidators: true, new: true }
      )
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(friend)
      )
      .then(() => res.json({ message: 'Thought and reaction deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};