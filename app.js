var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

// Landing page Route
app.get('/', function(req, res){
   res.send("Hello from landing page"); 
});

// Tournaments Routes
var tournamentsRoute = require('./routes/tournamentsRoute');
app.use('/tournaments', tournamentsRoute);


app.listen(process.env.PORT, function(){
    console.log("Listening to Port: " + process.env.PORT );
})
