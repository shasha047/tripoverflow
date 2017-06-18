var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  comment : {
    type : String,
    required : true,
    default : null
  }
});


var qaSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    qas : {
        type : String,
        required : true
    },
    
    comments : [commentSchema],
});

mongoose.model('quesans', qaSchema);