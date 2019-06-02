var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/bookstore');

var genreSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    date :{
        type : Date,
        default : Date.now
    }

});



var Genre = module.exports = mongoose.model('Genre', genreSchema);





