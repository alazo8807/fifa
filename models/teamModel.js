var mongoose = require("mongoose");

var teamSchema = mongoose.Schema({
    team_id: {
        type: Number,
        default: -1
    },
    name: String,
    is_official_team: {
        type: Boolean,
        default: false
    }
});

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;