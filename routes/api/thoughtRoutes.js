const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createThought);

router
  .route('/:userId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reaction')
  .post(createReaction)

  router
  .route('/:thoughtId/reaction/:reactionId')
  
  .put(updateReaction)
  .get(getSingleReaction)
  .delete(deleteReaction);

module.exports = router;
