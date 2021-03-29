/**
 * This file deals with the server side of Virtual Deck O' Cards (VDOC).
 * Here, there is a seralized game object stored in the gameObj global variable, and there are also 
 * seralized versions of the HTML elements on each webpage stored here as well.  These are stored under the
 * HTML global variable, which is a custom object.  In that HTML, the table of players is stored as well as
 * the positions of cards on the table
 */


const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

let playerConnections = 0;
const app = express();
// Game object is stored here
let gameObj;
// Table HTML is stored here
let parent;

const clientPath = path.join(__dirname, "../index.html")
const root = path.join(__dirname, "../")
console.log('serving static from ' + clientPath);

app.use(express.static(root));

const server = http.createServer(app);

const io = socketio(server);
// Keeps a list of sockets and of player based on the order they join in
// Dealer is the 0th player
let SOCKET_LIST = {};
let PLAYER_LIST = {};

//Creates a player object, this object stores the player's ID for the game, and also keeps track of the cards
//that are in the player's hand

let Player = function(id) {
    let self = {
        id: id,
        hand: null,    
    }
    return self;
}
/**
 * This object stores the HTML that the "parent" element contains, and
 * can separately contain the HTML in the "decktable" and "playerTable" classes
 */
let Table = function(){
    let self = {
        /** HTML for the "parent" element */
        html: null,
        /** HTML for the "decktable" element */
        cardTableHtml: null,
        /** HTML for the "playerTable" element */
        playerTableHtml: null,
        setHtml: function(html) {
            this.playersOnTableHtml = html;
        },
        setCardHtml: function(html) {
            this.cardsOnTableHtml = html;
        },
        setPlayerHtml: function(html) {
            this.playersOnTableHtml = html;
        }
    }
    return self;
    
}
/**
 * This object allows HTML to be sent to the server for the server
 * to access
 * @param cards the HTML of the cards on the table
 * @param player the HTML produced by the players
 */
let HTMLWrapper = function(cards, players){
    let self = {
        cardTableHtml:cards,
        playerTableHtml:players,
        
    }
    return self;
    
}

parent = new Table();
//Directs the server on what to do when a player connects 
io.on('connection', (socket) => {

    // Set the socket id equal to the player connections
    socket.id = playerConnections;
    // Creates a player object for the server to use 
    let player = Player(socket.id);
    //
    SOCKET_LIST[socket.id] = socket;
    PLAYER_LIST[player.id] = player;
    // If there are no players, set everything to and assume the dealer wants to start a new game.
    if (playerConnections == 0) {
        // Allows dealer to join game (server side)
        socket.emit('dealermessage', 'Welcome to your personal VDOC server! <br> What is your name?');
        playerConnections++;
    } 
    // If there is already a dealer, assume the new person is a player
    else if (playerConnections > 0 && playerConnections < 7) {
        // Allows player to join game (server side)
        socket.emit('playermessage', 'Welcome to the server! <br> What is your name?');
        // Add player to the player connections
        playerConnections++;
    } 
    // If there are more than seven players, then let the new player know
    else {
        socket.emit('maxplayers', 'There are too many players on this server!')
    }
    console.log('Someone connected(current users = ' + playerConnections  +')');
    // Event when user connects
    socket.on('disconnect', () => {
        // Tell server to disconnect a player
        playerConnections--;
        // Tell client what to do upon a disconnect
        socket.emit('playerdisconnect')
        // Update the console with a disconnect
        console.log('someone disconnected (current users = ' + playerConnections  +')')
        // Delete the entry on the socket list
        delete SOCKET_LIST[socket.id];
        // Delete the entry on the player list
        delete PLAYER_LIST[socket.id];
        
    })
    /**
     * This object sends something to all sockets under a specified event
     * @param {*} event 
     * @param {*} object 
     */
    function sendObjectToAllSockets(event, object) {
        for(var i in SOCKET_LIST) {
            socket = SOCKET_LIST[i]
            socket.emit(event, object);
        }
    }
    /**************************************************************** */

    /**
     * This chunk of code deals with the PARENT, or all of the HTML
     */
    /**************************************************************** */
    // Update the html for the parent object
    socket.on('updateParentHTMLforServer', (wrapper) => {
        parent.setCardHtml(wrapper.cardTableHtml);
        parent.setPlayerHtml(wrapper.playerTableHtml);
        parent.setHtml(wrapper.parentHtml);
    });
    socket.on('requestParentHTML', ()=> {
        socket.emit('deliverParentHTML', parent.html)
    });

    /***************************************************************************** */
    /**
     * This chunk of code updates the position of cards on the table for all clients
     */
    /***************************************************************************** */

    socket.on('updateDeckTable', (table) =>{
        parent.setCardHtml(table);
    });


    /**************************************************************** */

    /**
     * This chunk of code updates the PLAYERS that are on the table
     */
    /**************************************************************** */
    // Request the player table, and fulfill the request
    socket.on('requestPlayerTable', () =>{
        socket.emit('sendPlayerTableToClient', parent.playerTableHtml);
    });

    // If one client is added to the game, update that info for all clients
    socket.on('updatePlayerTableForServer', (playerTable) =>{
        console.log("Player Table Updated")
        parent.setPlayerHtml(playerTable);
    });
    

    // If one client is added to the game, update that info for all clients
    socket.on('updatePlayerTableForAll', (playerTable) =>{
        parent.setPlayerHtml(playerTable);
        sendObjectToAllSockets('sendPlayerTableToClient', parent.playerTableHtml);
    });


    /**************************************************************** */
    /**
     * This chunk of code specializes in sending and recieving the GAME OBJECT 
     * from the server
     */
    /**************************************************************** */
    //Sends out a seralized game object for a client
    socket.on('sendGameToServer', (serverGame) => {
        gameObj = serverGame;
    })
    // Server sends the current seralized game object to the client who requests it
    socket.on('requestGameFromServer', () => {
        socket.emit('sendGameToClient', gameObj);
    })
    
    

})



server.on("error", (err) => {
    console.error('Server error:', err)
});

server.listen(3000, '127.0.0.1', () => {
    console.log("VDOC started on 3000")
});