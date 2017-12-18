var mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/fifa');

mongoose.Promise = Promise;

module.exports.Tournament = require('./tournamentModel');
module.exports.Player = require('./playerModel');
module.exports.Team = require('./teamModel');