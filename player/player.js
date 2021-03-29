import Card from "../card/cards.js"
import ArrayList from "../data_structures/arraylist.js"
/**
 * Object that represents a player in a card game 
 */
export default class Player {
    #cards;
    #name;
    #number;
    constructor(name, number) {
        this.#cards = new ArrayList();
        this.#name = name
        this.#number = number
    }
    /**
     * Returns player's number
     * @return the number of the player
     */
    getNumber = function () {
        return this.#number;
    }
    /**
     * Gives a card to the given player  
     * @param {*} card card to be given to the player 
     */
    giveCardToPlayer = function (card) {
        this.#cards.addLast(card);
        return this.#cards.getSize() - 1;
    }
    /**
     * Takes a card from the given player 
     * @param {*} idx index of the card to be taken from the player
     * @return the card taken from the player  
     */
    takeCardFromPlayer = function (idx) {
        return this.#cards.remove(idx);
    }
    /**
     * Returns players hand
     * @return player's hand 
     */
    getHand = function () {
        return this.#cards;
    }
    getCardFromHand(idx) {
        return this.#cards.get(idx)
    }
    /**
     * Returns number of cards player possesses
     */
    getNumCardsInHand = function () {
        return this.#cards.getSize();
    }
    /**
     * Returns player's name
     * @return player's name 
     */
    getName = function () {
        return this.#name;
    }
    /**
     * Replaces players name with the name given as a parameter 
     * @param {*} newName the player's new name
     */
    setName = function (newName) {
        this.#name = newName;
    }
    /**
     * Returns player information in the form of a string
     * @return player information in the form of a string 
     */
    toString = function () {
        return this.#name;
    }
    seralize = function () {
        return 'name:' + this.#name +
            '; number:' + this.#number +
            '; cards:' + this.#cards.seralize()
    }
    static deseralize = function (str) {
        
        let splitString = str.split(';');
        
        let nameString = splitString[0].substring(splitString[0].indexOf(':') + 1);
        let numString = splitString[1].substring(8);
        let cardsString = splitString[2].substring(splitString[2].indexOf('[') +
            1, splitString[2].lastIndexOf(']'));

        let initNum;
        if(numString == "dealer") {
            initNum = "dealer";
        } else {
            initNum = parseInt(numString);
        }
        let player = new Player(nameString, initNum);
        if (cardsString.length != 0){
            let arrayOfCards = cardsString.split(",")

            for (let i = 0; i < arrayOfCards.length; i++) {
                let trimmedString = arrayOfCards[i].trim();

                player.giveCardToPlayer(Card.deseralize(trimmedString));
            }
        }
        return player;

    }
}