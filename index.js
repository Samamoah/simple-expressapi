var express = require("express");
var mongoose = require("mongoose");
var port = 4000;

// mongoose connection
mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we're connected!");
});

//app 
var app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
var userRoute = require("./routes/route")
var genreRoute = require("./routes/groute")

app.get('/', (req, res) => {
    res.send('Hello welcome to my server');
});

app.use('/', userRoute);
app.use('/api', genreRoute);

//server
app.listen(port, ()=>{console.log(`Server starts at ${port} ....`)});

