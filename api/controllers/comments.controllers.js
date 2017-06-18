var mongoose = require('mongoose');
var quesans = mongoose.model('quesans');


// GET all reviews for a hotel
module.exports.commentsGetAll = function(req, res) {
  var id = req.params.quesansId;
  console.log('GET comments for quesansId', id);

  quesans
    .findById(id)
    .select('comments')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : []
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("quesans id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "quesans ID not found " + id
        };
      } else {
        response.message = doc.comments ? doc.comments : [];
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

// GET single review for a hotel
module.exports.commentsGetOne = function(req, res) {
  var quesansId = req.params.quesansId;
  var commentId = req.params.commentId;
  console.log('GET commentId ' + commentId + ' for quesansId ' + quesansId);

  quesans
    .findById(quesansId)
    .select('comments')
    .exec(function(err, quesans) {
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding quesans");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("quesans id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "quesans ID not found " + id
        };
      } else {
        // Get the review
        response.message = quesans.comments.id(commentId);
        // If the review doesn't exist Mongoose returns null
        if (!response.message) {
          response.status = 404;
          response.message = {
            "message" : "comment ID not found " + commentId
          };
        }
      }
      res
        .status(response.status)
        .json(response.message);
    });

};

var _addComment = function (req, res, quesans) {
  quesans.comments.push({
    name : req.body.name,
    comment : req.body.comment
  });

  quesans.save(function(err, qaUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(qaUpdated.comments[qaUpdated.comments.length - 1]);
    }
  });

};

module.exports.commentsAddOne = function(req, res) {

  var id = req.params.quesansId;

  console.log('POST comment to quesansId', id);

  quesans
    .findById(id)
    .select('comments')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding quesans");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("quesansId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "quesans ID not found " + id
        };
      }
      if (doc) {
        _addComment(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });


};


module.exports.commentsUpdateOne = function(req, res) {
  var quesansId = req.params.quesansId;
  var commentId = req.params.commentId;
  console.log('PUT commentId ' + commentId + ' for quesansId ' + quesansId);

  quesans
    .findById(quesansId)
    .select('comments')
    .exec(function(err, quesans) {
      var thisComment;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding quesans");
        response.status = 500;
        response.message = err;
      } else if(!quesans) {
        console.log("quesans id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "quesans ID not found " + id
        };
      } else {
        // Get the review
        thisComment = quesans.comments.id(commentId);
        // If the review doesn't exist Mongoose returns null
        if (!thisComment) {
          response.status = 404;
          response.message = {
            "message" : "Comment ID not found " + commentId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisComment.name = req.body.name;
        
        thisComment.comment = req.body.comment;
        hotel.save(function(err, qaUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

};
