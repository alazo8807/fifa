var express = require('express');
var router = express.Router();

var db = require('../models/indexModel');

// Index Route
router.get('/', function(req, res){
    db.Tournament.find({})
    .then(function(tournamentsFound){
        res.render('./tournaments/tournaments', {tournaments: tournamentsFound});
    })
    .catch(function(err){
        console.log(err);
        res.redirect('/tournaments/tournaments');
    })

});

// New Route
router.get('/new', function(req, res){
    res.render('./tournaments/newTournament');
})


// Create Route
router.post('/', function(req, res){
    
    db.Tournament.create(req.body)
    .then(function(createdTournament){
        console.log("Tournament Created Succesfully");
        res.redirect('/tournaments');
    })
    .catch(function(err){
        console.log(err);
        res.redirect('/tournaments');
    })

})


module.exports = router; 