var express = require('express');
var router = express.Router();

var ctrlQuesans = require('../controllers/quesans.controllers.js');
var ctrlComments = require('../controllers/comments.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

router
  .route('/quesans')
  .get(ctrlQuesans.quesansGetAll)
  .post(ctrlQuesans.quesansAddOne);

router
  .route('/quesans/:quesansId')
  .get(ctrlQuesans.quesansGetOne)
  .put(ctrlQuesans.quesansUpdateOne);


// Review routes
router
  .route('/quesans/:quesansId/comments')
  .get(ctrlComments.commentsGetAll)
  .post(ctrlUsers.authenticate, ctrlComments.commentsAddOne);

router
  .route('/quesans/:quesansId/comments/:commentId')
  .get(ctrlComments.commentsGetOne)
  .put(ctrlComments.commentsUpdateOne);


router
  .route('/users/register')
  .post(ctrlUsers.register);

  router
    .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;