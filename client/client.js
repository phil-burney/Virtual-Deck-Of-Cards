import Visual from '../visual.js'
import Game from '../game/game.js'

const y = document.querySelector(".Startgame");
const visual = new Visual();
const sock = io();
let seralizer = new XMLSerializer();
let playerObj;
let playerHTML;

/**
 * This object allows HTML to be sent to the server for the server
 * to access
 * @param cards the HTML of the cards on the table
 * @param player the HTML produced by the players
 * @param parent the HTML produced by the parent HTML
 */
let HTMLWrapper = function(cards, players, parent){
    let self = {
        cardTableHtml:cards,
        playerTableHtml:players,
        parentHtml:parent,
        
    }
    return self;
    
}
// Allows dealer to join game (client side)
sock.on('dealermessage', (text) => {
    getDealerName(text);
})
// Allows player to join game (client side)
sock.on('playermessage', (text) => {
    getPlayerName(text);
})
// Tells players over the maximum that they cannot join
sock.on('maxplayers', (text) => {
    const parent = document.createElement('div');
    parent.innerHTML = text;
    document.body.appendChild(parent)
})
// Tells the client what to do if they get a new player table
sock.on('sendPlayerTableToClient', (tableHTML) => {
    updatePlayerTable(tableHTML);
})
// Tells the client what to do upon disconnect


/**
 * Creates a name capturing element for the game
 * @param {*} text the text to be stored in the name capturing element
 */
function createNameCapturingElement(text) {
    const parent = document.createElement('div');
    parent.innerHTML = text;
    parent.className = "name"
    parent.style.marginLeft = 'auto';
    parent.style.marginRight = 'auto';
    parent.style.width = '300px'
    parent.style.border = 'black solid 4px'
    parent.style.textAlign = 'center'

    const field = document.createElement("INPUT");
    field.style.marginLeft = 'auto';
    field.setAttribute("type", "text");
    field.className = "nameinput"
    parent.appendChild(field);
    return parent
}
/**
 * Gets the dealer name from the first client
 * @param {*} text 
 */
export const getDealerName = (text) => {
    parent = createNameCapturingElement(text);
    document.body.appendChild(parent)
    let x = visual.createButtonOverPlayerElement("Continue", parent, harvestDealerName)


}
/**
 * Gets the dealer name, clears the directions, and initalizes the game
 * @param {*} e 
 */
const harvestDealerName = (e) => {
    // Get the DOM element to capture the name
    const input = document.querySelector(".nameinput");
    // Get the DOM element that will be removed
    const parent = document.querySelector(".name");
    // Capture the name that the user inputs
    const name = input.value;
    // Show the dealer how the game is to be played
    visual.showDirections();
    // Once the dealer elects to start the game, remove the directions,
    // Put the table up and initalize the game object, and send a seralized
    // version of the game object for the server to store
    y.onmousedown = startGame(event);
    // Remove the name elements
    parent.remove();
}
/**
 * This method sends HTML and a seralized game object to the server
 * @param {} e event that takes place
 */
const startGame = (e) => {
    // Don't allow user to rightclick and generate context menu
    e.preventDefault;
    // Clear directions off the browser window
    visual.clearDirections(e, name)
    // Create a game object and the base game table
    visual.initGameAndGUI(name);
    // Let the server know about the new game object
    sock.emit('sendGameToServer', visual.game.seralize());
    // Send the player table to the server
    let pTable = seralizer.serializeToString(document.querySelector(".playerTable"));
    let cTable = seralizer.serializeToString(document.querySelector(".decktable"));
    let parent = seralizer.serializeToString(document.querySelector(".parent"));
    sock.emit('updateParentHTMLforServer', new HTMLWrapper(cTable, pTable, parent));
}
/**
 * Gets the player's name and creates the name capturing elements
 * @param {} text 
 */
export const getPlayerName = (text) => {
    parent = createNameCapturingElement(text);
    document.body.appendChild(parent)
    visual.createButtonOverPlayerElement('Continue', parent, harvestPlayerName)

}
/**
 * Captures the player's name and lets the server know about the new player
 * @param {} game 
 */
const harvestPlayerName = () => {
    // Create constants for the DOM elements that will need to be used
    const input = document.querySelector(".nameinput");
    const parent = document.querySelector(".name");
    // Request the game from the server
    sock.emit('requestGameFromServer');
    // Ensure that the request is recieved from the server before
    // the program continues.  
    let gamePromise = new Promise((resolve, reject) => {
        sock.on('sendGameToClient', (game) => {
            updateGameObj(game);
            resolve(game);
        });

    })
    // After the client gets the game... 
    gamePromise.then((game) => {
        // ... Capture the name from the name-capturing element
        let name = input.value
        // And init the player with the game object
        playerHTML = visual.initPlayer(name);
        // And store the player object with the client
        playerObj = playerHTML.player
        // And send the updated game object to the server
        sock.emit('sendGameToServer', visual.game.seralize());
        
    })
    dealPlayerIn();
    parent.remove();
}
/**
 * Sets the player up to partake in a card game
 */
const dealPlayerIn = () => {
    console.log("one");
    
    // Request the player table from the server
    sock.emit('requestParentHTML');
    let tablePromise = new Promise((resolve, reject) => {
        sock.on('deliverParentHTML', (newTable) => {
            console.log(newTable);
            let parent = document.querySelector(".parent");
            parent.innerHTML = newTable;
            resolve(newTable);
        });
    });
    tablePromise.then((table) => {
        let playerTable = document.querySelector('.playerTable');
        playerTable.appendChild(playerHTML);
        let ele = seralizer.serializeToString(playerTable);
        sock.emit('updatePlayerTableForAll', ele);
    });
    
   
   
}

/**
 * Update the position of the cards on the table for each player 
 * @param {} cardsOnTable 
 */
function updateCardsOnTable(cardsOnTable) {

}
/**
 * Update the player table for the player.  Checks to see if the playerTable element is 
 * NULL.  If it is, set the parent HTML equal to the table, if not, set the playerTable 
 * element HTML equal to the parameter
 */
function updatePlayerTable(table) {
    let parent = document.querySelector(".playerTable");
    parent.innerHTML = table;
}
/**
 * Update the game object for the player; convert the seralized 
 * game back into a game object.
 * @param {*} game 
 */
function updateGameObj(game) {
    if (game != null) {
        let cGame = Game.deseralize(game);
        visual.game = cGame
    }

}

