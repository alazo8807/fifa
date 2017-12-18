var mongoose = require('mongoose')

var playerSchema = mongoose.Schema({
    name: String,
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        }
    ]
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;