var mongoose = require("mongoose");

var teamSchema = mongoose.Schema({
    team_id: Number,
    name: String
}, { autoIndex: false });

var Team = mongoose.model('Team', teamSchema);