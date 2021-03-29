import Player from '../player/player.js';
import ArrayList from '../data_structures/arraylist.js';
import Deck from '../deck/deck.js'
import Dealer from '../player/dealer.js';
import CardError from '../card/carderror.js';
import Card from '../card/cards.js'
//const ArrayList = require('../data_structures/arraylist.js')
//const Player = require('../player/player.js')
//const Deck = require('../deck/deck.js')
//const Dealer = require('../player/dealer.js')
//const CardError = require('../card/carderror.js')
//const Card = require('../card/cards.js')

/**
 * Represents a game that players will partake in
 */
export default class Game {
    #dealer
    #players
    #deck
    #playersCanTakeFromDeck
    #playersCanGiveToOthers
    #cardPool
    #table
    /**
     * Constructor method for the game 
     * @param {String} name name of the dealer 
     * @param {boolean} playersCanTakeFromDeck whether or not players can take from the deck
     * @param {boolean} playersCanGiveToOthers whether or not players can give to other players 
     */
    constructor(name, playersCanTakeFromDeck = false, playersCanGiveToOthers = false) {
        this.#deck = new Deck();
        this.#players = new ArrayList();
        this.#dealer = new Dealer(name);
        this.#cardPool = new ArrayList();
        this.#table = new ArrayList();
        this.#playersCanGiveToOthers = playersCanGiveToOthers;
        this.#playersCanTakeFromDeck = playersCanTakeFromDeck;
    }
    getCardFromDeck = function(idx) {
        return this.#deck.getCardAtIndex(idx)
    }
    shuffleDeck = function () {
        this.#deck.shuffle();
    }
    addToTable(card) {
        this.#table.addLast(card)
        
        return this.#table.getSize() - 1;
    }
    removeFromTable(idx) {
        //debugger;
        return this.#table.remove(idx)
    }
    getCardFromTable(idx) {
        return this.#table.get(idx)
    }
    /**
     * Method that allows players to give cards to other players
     * @param {Player} pGive index of player that is giving card
     * @param {Player} pRecieve index of player that is recieving card 
     * @param {number} idx index of card that is being given
     */
    playerGiveToOtherPlayer = function (pGiveIdx, pRecieveIdx, idx) {
        let pGive = this.#players.get(pGiveIdx);
        let pRecieve = this.#players.get(pRecieveIdx);
        if (!this.#playersCanGiveToOthers) {
            throw CardError("Permissions not set to give to other players!")
        }
        let c = pGive.takeCardFromPlayer(idx);
        pRecieve.giveCardToPlayer(c);
    }
    /**
     * Method that allows players to take from the deck of cards.  
     * @param {number} pTakeIdx player that will take from deck of cards
     * @param {String} whereFrom what method player will take to remove card 
     */
    playerTakeFromDeck = function (pTakeIdx, whereFrom) {
        if (!this.#playersCanTakeFromDeck) {
            throw CardError("Permissions not set for players to take from deck!")
        }
        let c;
        if (whereFrom === "random") {
            c = this.#deck.pullRandomCard();
        }
        else if (whereFrom === "top") {
            c = this.#deck.pullTopCard();
        }
        else if (whereFrom === "bottom") {
            c = this.#deck.pullBottomCard();
        } else {
            throw "Invalid entry";
        }
        this.#players.get(pTakeIdx).giveCardToPlayer(c);
    }
    /**
     * Player returns card to deck
     * @param {number} playerIdx index of player that will return card to deck
     * @param {number} idx index of card that is being given
     */
    playerGiveToDeck = function (playerIdx, idx, whereTo) {
        let player = this.#players.get(playerIdx);
        let c = player.takeCardFromPlayer(idx);
        if (whereTo === "random") {
            this.#deck.placeCardRandom(c);
        }
        else if (whereTo === "top") {
            this.#deck.placeCardOnTop(c);
        }
        else if (whereTo === "bottom") {
            this.#deck.placeCardOnBottom(c);
        } else {
            throw "Invalid entry";
        }

    }
    /**
     * The dealer gives cards to a player from the deck
     * @param {number} playerIdx index of player that the dealer will give a card to
     * @param {String} whereFrom what method dealer will take to remove card from deck
     * @param {String} whereTo what method player will take to put card in deck
     */
    dealerTakeFromDeck = function (whereFrom) {
        let c;

        if (whereFrom === "random") {
            c = this.#deck.pullRandomCard();
        }
        else if (whereFrom === "top") {
            c = this.#deck.pullTopCard();
        }
        else if (whereFrom === "bottom") {
            c = this.#deck.pullBottomCard();
        } else {
            throw "Invalid entry";
        }
        return c;


    }
    /**
     * Player gives card to card pool
     * @param {Card} card Card to put in pool
     */
    giveToPool = function (card) {
        this.#cardPool.addLast(card);
    }
    /**
     * Allows player to take card from pool
     * @param {*} player player to take a card from card pool
     */
    takeFromPool = function (playerIdx) {
        let player = this.#players.get(playerIdx);
        let c = this.#cardPool.removeLast();
        player.giveCardToPlayer(c);
    }
    /**
     * Returns number of cards in pool
     * @return the number of cards in the card pool
     */
    numCardsInPool = function () {
        return this.#cardPool.getSize();
    }
    /**
     * Adds a player to the game 
     * @param {String} name name of the new player
     * @param {number} number number of the new player 
     */
    addPlayer = function (name, number) {
        let p = new Player(name, number);
        this.#players.addLast(p);
    }
    /**
     * Removes a player from the game 
     * @param {number} idx the index of the player in the arraylist that is to be removed
     * @return the removed player.  
     */
    removePlayer = function (idx) {
        return this.#players.remove(idx);
    }
    /**
     * Returns a player from the array list of players based on the given
     * index
     * @param {number} idx index player that is to be returned
     */
    getPlayer = function (idx) {
        return this.#players.get(idx);
    }
    /**
     * Returns the number of players in the game
     * @return the number of players in the game 
     */
    getNumPlayers = function () {
        return this.#players.getSize();
    }
    /**
     * Returns a list of players that are partaking in the given game
     * @return array list of players playing in the game
     */
    getPlayerList = function () {
        return this.#players;
    }
    /**
     * Returns the dealer for the card game
     * @return the dealer for the card game
     */
    getDealer = function () {
        return this.#dealer;
    }
    /**
     * Returns the deck
     * @return the deck of cards
     */
    getNumCardsInGameDeck = function () {
        return this.#deck.numCardsInDeck();
    }
    /**
     * Returns the pool of cards that exist within the game
     * @return the pool of cards that exist within the game
     */
    getPool = function () {
        return this.#cardPool;
    }
    /**
     * Makes the given player a card dealer and turns the dealer into a player,
     * since there can only be one card dealer
     * @param {*} idx index of player that is to be the new dealer 
     */
    switchDealer = function (idx) {
        let dName = this.#dealer.getName();
        let dHand = this.#dealer.getHand();
        this.addPlayer(dName);
        while (dHand.getSize() > 0) {
            let dCard = dHand.removeFirst();
            dPlayer.giveCardToPlayer(dCard);
        }
        this.#dealer = this.removePlayer(idx);

    }
    seralize = function () {
        return "deck:" + this.#deck.seralize() +
            " | players:" + this.#players.seralize() +
            " | dealer:" + this.#dealer.seralize() +
            " | cardpool:" + this.#cardPool.seralize() +
            " | table:" + this.#table.seralize() +
            " | playersCanTakeFromDeck:" + this.#playersCanTakeFromDeck +
            " | playersCanGiveToOthers:" + this.#playersCanGiveToOthers;
    }
    static deseralize = function (str) {
        // Init new game
        let game = new Game();

        let splitStr = str.split("|");

        //Process deck
        let deckStr = splitStr[0];
        let deck = Deck.deseralize(deckStr);
        //Add deck to game
        game.#deck = deck

        //Process players

        let basePlayerStr = "players:"
        let playStr = splitStr[1].substring(basePlayerStr.length + 1);
        let playerRefinedStr = playStr.substring(playStr.indexOf("[") + 1, playStr.lastIndexOf("]"))
        let playerSplitStr = playerRefinedStr.split(', name');
        
        //Init game.#players
        for(let i = 0; i < playerSplitStr.length; i++) {
            if(playerSplitStr[i] != ""){
                
                let newPlayer = Player.deseralize(playerSplitStr[i]);
                game.#players.addLast(newPlayer);
            }
        }
        

        //Process dealer
        let baseStr = "dealer:"
        let dealerStr = splitStr[2].substring(baseStr.length + 1);
        let dealer = Player.deseralize(dealerStr);
        game.#dealer = dealer;

        //Process pool
        let poolStr = splitStr[3].substring(splitStr[3].indexOf('[') + 1, splitStr[3].indexOf(']'));
        let poolSplitStr = poolStr.split(',');

        //Init game.#cardPool
        game.#cardPool = new ArrayList();
        if (poolStr.length != 0) {
            for (let i = 0; i < poolSplitStr.length; i++) {
                let trimmedString = poolSplitStr[i].trim();
                game.#cardPool.addLast(Card.deseralize(trimmedString));
            }
        }
        let tableString = splitStr[4].substring(splitStr[4].indexOf('[') + 1, splitStr[4].indexOf(']'));
        let tableSplitStr = tableString.split(',')
        game.#table = new ArrayList();
        if (tableString.length != 0) {
            for (let i = 0; i <tableSplitStr.length; i++) {
                let trimmedString = tableSplitStr[i].trim();
                game.#table.addLast(Card.deseralize(trimmedString));
            }
        }


        let canTakeDeckBase = "playersCanTakeFromDeck:"
        let canTakeFromDeck = splitStr[5].substring(canTakeDeckBase.length + 1).trim();

        if (canTakeFromDeck !== "true" && canTakeFromDeck !== "false") {
            throw "String must be \'true\' or \'false\' (String is " + canTakeFromDeck + ')';
        }
        if (canTakeFromDeck === "true") {
            game.#playersCanTakeFromDeck = true;
        } else {
            game.#playersCanTakeFromDeck = false;
        }


        let canGiveToOthersBase = "playersCanGiveToOthers:"
        let canGiveToOthers = splitStr[6].substring(canGiveToOthersBase.length + 1).trim();

        if (canGiveToOthers !== "true" && canGiveToOthers !== "false") {
            throw "String must be \'true\' or \'false\' (String is " + canGiveToOthers + ')';
        }
        if (canGiveToOthers === "true") {
            game.#playersCanGiveToOthers = true;
        } else {
            game.#playersCanGiveToOthers = false;
        }
        return game;
    }

}