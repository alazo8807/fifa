var mongoose = require('mongoose');

var tournamentSchema = mongoose.Schema({
    name: {
        type: String,
        required: "Name cannot be empty"
    },
    type: {
        type: String,
        required: "Tournament type cannot be empty",
        default: "League"
    },
    nbr_of_players: {
        type: Number,
        default: 2
    },
    nbr_of_matches: {
        type: Number,
        default: 1
    }, 
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: "Players cannot be empty"
        }
    ],
    date_created: {
        type: Date,
        default: Date.now    
    }
});

var Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;

