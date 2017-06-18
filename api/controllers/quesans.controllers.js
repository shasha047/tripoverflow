var mongoose = require('mongoose');
var quesans = mongoose.model('quesans');



module.exports.quesansGetAll = function(req, res) {
  console.log('Requested by: ' + req.user);
  console.log('GET the quesans');
  console.log(req.query);

  quesans
    .find()
    .exec(function(err, quesans) {
      console.log(err);
      console.log(quesans);
      if (err) {
        console.log("Error finding quesanswers");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found quesanswers", quesans.length);
        res
          .json(quesans);
      }
    });

};

module.exports.quesansGetOne = function(req, res) {
  var id = req.params.quesansId;

  console.log('GET quesansId', id);

  quesans
    .findById(id)
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
      res
        .status(response.status)
        .json(response.message);
    });

};

// var _splitArray = function(input) {
//   var output;
//   if (input && input.length > 0) {
//     output = input.split(";");
//   } else {
//     output = [];
//   }
//   return output;
// };

module.exports.quesansAddOne = function(req, res) {
  console.log("POST new ques");

  quesans
    .create({
      name : req.body.name,
      qas : req.body.qas,
    //   comments : {}
    }, function(err, quesans) {
      if (err) {
        console.log("Error creating quesans");
        res
          .status(400)
          .json(err);
      } else {
        console.log("quesans created!", quesans);
        res
          .status(201)
          .json(quesans);
      }
    });

};


module.exports.quesansUpdateOne = function(req, res) {
  var quesansId = req.params.quesansId;

  console.log('GET quesansId', quesansId);

  quesans
    .findById(quesansId)
    .select('-comments')
    .exec(function(err, quesans) {
      if (err) {
        console.log("Error finding quesans");
        res
          .status(500)
          .json(err);
          return;
      } else if(!quesans) {
        console.log("quesansId not found in database", quesansId);
        res
          .status(404)
          .lson({
            "message" : "quesans ID not found " + quesansId
          });
          return;
      }

      quesans.name = req.body.name;
      quesans.qas = req.body.qas;
      quesans.comments = null;

      quesans
        .save(function(err, qaUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });


    });

};
