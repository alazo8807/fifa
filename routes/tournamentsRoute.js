var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');

var db = require('../models/indexModel');

router.use(methodOverride("_method"));

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
   
    let teams = [];
    let teamsAdded = [[]]; 
    let playersAdded = [];
    let tournament = {
        name: req.body.name,
        type: req.body.type,
        nbr_of_players: req.body.nbr_of_players || 2,
        nbr_of_matches: req.body.nbr_of_matches || 1,
        players: []
    }

    console.log(req.body.players);
    let players = req.body.players;
    
   

    var addTeamsAndPlayers = new Promise(function(resolve, reject){
        players.forEach(function(player, i){
            (function(playerIndex){
                var playerTeams = player.teams;
                teamsAdded.push([]);
                var addTeams = new Promise(function(resolve, reject){
                    playerTeams.forEach(function(team, j){
                        (function(playerIndex, teamIndex){   //by the time the player is created j might not be the desired value (closure)
                            db.Team.create({name: team, is_official_team: false})
                            .then(function(teamCreated){ 
                                console.log("Team Created");
                                console.log(teamIndex);
                                teamsAdded[playerIndex].push(teamCreated);
                                if(playerTeams.length - 1 === teamIndex ){
                                    resolve(teamsAdded[playerIndex]);
                                } 
                            })
                            .catch(function(err){
                                console.log(err)
                                res.redirect('/tournaments');
                            })    
                        })(playerIndex,j);
                    })
                })
                
                // Add players
                addTeams.then(function(data){
                    // teamsAdded = [];    //clean teams added for the player.
                    var newPlayer = {
                        name: player.name,
                        teams: data
                    };
                    return db.Player.create(newPlayer);
                })
                .then(function(playerCreated){
                    console.log("Player Created");
                    playersAdded.push(playerCreated);
                    if(players.length - 1 === playerIndex) return resolve(playersAdded);
                
                });    
            
            })(i);
                
        });
    })
        
    addTeamsAndPlayers.then(function(playersCreated){
        // Add Tournament
        console.log("Players Created");
        tournament.players=playersCreated;
        return db.Tournament.create(tournament)
        .then(function(tournamentCreated){
            console.log("Tournament was created");
            res.redirect('/tournaments');
        })
        .catch(function(err){
            console.log(err);
            res.redirect('/tournaments');
        });
    
    })
    
    // // First add all the teams
    //         var addTeams = new Promise(function(resolve, reject){
    //             teams.forEach(function(team, i){
    //                 db.Team.create(team)
    //                 .then(function(teamCreated){ 
    //                     console.log("Team Created");
    //                     teamsAdded.push(teamCreated);
    //                     if(i === teams.length - 1) resolve(teamsAdded);
    //                 })
    //                 .catch(function(err){
    //                     console.log(err)
    //                     res.redirect('/tournaments');
    //                 })
    //             })
    //         })
    
    // // Add players
    // addTeams.then(function(data){
    //      players.push({
    //         name: req.body.player_name,
    //         teams: data
    //     });
    //     return db.Player.create(players);
    // })
    // // Add Tournament
    // .then(function(playersCreated){
    //     console.log("Player Created");
    //     tournament.players=playersCreated;
    //     return db.Tournament.create(tournament)
    // })
    // .then(function(tournamentCreated){
    //     console.log("Tournament was created");
    //     res.redirect('/tournaments');
    // })
    // .catch(function(err){
    //     console.log(err);
    //     res.redirect('/tournaments');
    // });
});

// Delete Route
router.delete('/:tournamentId', function(req,res){
    console.log("delete request received")
    
    db.Tournament.findById(req.params.tournamentId)
    .then(function(tournamentsFound){
        var deletePlayers = new Promise(function(resolve, reject){
            tournamentsFound.players.forEach(function(playerId, i){
                db.Player.remove({_id: playerId})
                .then(function(){
                    console.log("Player removed");
                    if (i === tournamentsFound.players.length - 1) resolve(true);
                })
            });    
        });
        
        return deletePlayers;
    })
    .then(function(deletePlayersPromise){
        return deletePlayersPromise;
    })
    .then(function(){
        return db.Tournament.remove({_id: req.params.tournamentId});
    })
    .then(function(){
        console.log("Tournament Deleted");
        res.redirect('/tournaments');
    })
    .catch(function(err){
        console.log(err);
        res.redirect('/tournaments');
    })
    
});


module.exports = router; 