import CardError from '../card/carderror.js'
/**
 * Represents a card in deck of cards 
 * @param {*} suit suit of card
 * @param {*} number number of card
 */
export default class Card {
    #suit
    #number
    constructor(suit, number) {
        
        if(!(suit === "c" || suit === "d" || suit === "h" || suit === "s")){
            throw new CardError("Invalid suit!. Suit was: " + suit)
        } 
        if(number > 14 || number < 2){
            throw new CardError("Invalid number!")
        }
        
        this.#number = number
        this.#suit = suit
    }
    getSuit(){
        return this.#suit;
    }
    getNumber(){
        return this.#number;
    }
    toString(){
        return this.#suit +  " " + this.#number;
    }
    seralize(){
        return this.#suit + this.#number;
    }
    static deseralize(str){
        return new Card(str.substring(0, 1), str.substring(1));
    }
    equals(objCard){
        let s = typeof objCard;
        if(s === 'object'){
            if(objCard.getSuit() == this.#suit && objCard.getNumber() == this.#number){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}