import Card from "./cards.js";

/**
 * Represents an Error where the Object is not a Card Object
 */
export default class CardError extends Error {
    message;
    name;
    constructor(message){
        super(message);
        this.name = "CardError"
    }
}