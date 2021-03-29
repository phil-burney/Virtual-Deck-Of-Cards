import Card from "../card/cards.js"
import CardError from "../card/carderror.js"
import ArrayList from "../data_structures/arraylist.js"
/**
 * Represents a deck of cards
 */
var cards 
export default class Deck {
    #cards
    constructor() { 
        this.#cards = new ArrayList();
        this.cardIndex = 0;

        let clubs = 0;
        let diamonds = 0;
        let hearts = 0;
        let spades = 0;
        for (let i = 0; i < 52; i++) {

            if (i < 13) {
                this.#cards.addLast(new Card('c', clubs + 2));
                clubs++;
            }
            if (i >= 13 && i < 26) {
                this.#cards.addLast(new Card('d', diamonds + 2));
                diamonds++;
            }
            if (i >= 26 && i < 39) {
                this.#cards.addLast(new Card('h', hearts + 2));
                hearts++;
            }
            if (i >= 39) {
                this.#cards.addLast(new Card('s', spades + 2));
                spades++;
            }
            
        }
    }
    /**
     * Pulls top card and returns that card
     */
    pullTopCard(){

        let returnCard = this.#cards.removeLast();
        return returnCard;
    }
    /**
     * Pulls random card from deck and returns that card
     */
    pullRandomCard(){
        let pullNum = Math.floor(Math.random() * 52);
        let returnCard = this.#cards.remove(pullNum);
        return returnCard;
    }
    /**
     * Pulls card from bottom of deck and returns that card 
     */
    pullBottomCard(){
        return this.#cards.removeFirst()
    }
    /**
     * Places card randomly within Deck
     * @param {*} card card to be placed in deck
     */
    placeCardRandom(card){

        let shuffleNum = Math.floor(Math.random() * 50) + 1;
        this.#cards.add(shuffleNum, card);
    }
    /**
     * Places given card on the top of deck 
     * @param {*} card card to be placed on top of deck
     */
    placeCardOnTop(card){
        
        this.#cards.addLast(card);
    }
    /**
     * Places given card on the bottom of deck
     * @param {*} card card to be placed on bottom of deck
     */
    placeCardOnBottom(card){
      
        this.#cards.addFirst(card);
    }
    /**
     * Shuffles the deck of cards 
     */
    shuffle(){
        for(let i = 0; i < this.#cards.getSize(); i++){
            let shuffleNum = Math.floor(Math.random() * this.#cards.getSize());
            let card1 = this.#cards.get(i);
            let card2 = this.#cards.get(shuffleNum);
            this.#cards.set(i, card2);
            this.#cards.set(shuffleNum, card1);
        }
    }
    getCardAtIndex(idx) {
        return this.#cards.get(idx)
    }
    /**
     * Number of cards in deck
     */
    numCardsInDeck(){
        return this.#cards.getSize();
    }
    seralize(){
        return "{cards: " + this.#cards.seralize() + "}"
    }
    static deseralize(str){
        let newDeck = new Deck();
        newDeck.clearDeck();
        let cardArr = str.substring(str.indexOf('[') + 1, str.indexOf(']')).split(',');
        for(let i = 0; i < cardArr.length; i++){
            let trimmedString = cardArr[i].trim()
            newDeck.placeCardOnTop(new Card(trimmedString.substring(0,1), trimmedString.substring(1))); 
        }
        return newDeck;

    }
    equals(objDeck){
        if(this.#cards.toString() == objDeck.#cards.toString()){
            return true;
        }
        return false;
    }
    clearDeck(){
        this.#cards = new ArrayList();
    }
    
    
       

}
