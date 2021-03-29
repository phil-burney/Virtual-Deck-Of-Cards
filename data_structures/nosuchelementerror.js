/**
 * Represents an Error where the Object is not a Card Object
 */
export default class NoSuchElementError extends Error {
    constructor(){
        super(message);
        this.name = "NoSuchElementError"
    }
}