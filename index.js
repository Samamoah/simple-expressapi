var express = require("express");
var mongoose = require("mongoose");
var port = 4000;




// mongoose connection

mongoose.connect('mongodb://localhost/bookstore');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello welcome to my server');
});

let Genre = require("./models/genres");

app.get('/api/genre' , function (res, req) {

     Genre.find({})
          .then(genres =>{
              res.json({
                  confirmation : 'success',
                  data: genres
              })
          })
          .catch(err => {
              res.json({
                  confirmation : 'fail',
                  message : err.message
              })
          });
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we're connected!");
});




app.listen(port, ()=>{console.log(`Server starts at ${port} ....`)});

function newFunction() {
    mongoose.connect('mongodb://localhost/bookstore');
}
