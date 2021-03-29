import Player from '../player/player.js'
import ArrayList from '../data_structures/arraylist.js';
/**
 * Represents a dealer in the card game
 */
export default class Dealer extends Player{
    /**
     * Constructor for the Dealer object
     * @param {*} name name of the Dealer
     */
    constructor(name){
        super(name, 'dealer');
    }
    /**
     * Dealer deals a card to a player 
     * @param {*} player player that is to be dealt to
     * @param {*} card card that is to be dealt to player 
     */
    dealCardToPlayer = function(player, card){
        player.giveCardToPlayer(card);
    }
    

}