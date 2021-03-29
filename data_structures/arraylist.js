import NoSuchElementError from '../data_structures/nosuchelementerror.js'
/**
 * Contains the implementation for an ArrayList ADT
 */
export default class ArrayList {
    #size
    #array
    constructor() {
        this.#array = new Array(10);
        this.#size = 0;
    }
    /**
     * Ensures that the ##array list always has enough capacity
     */
    ensureCapacity(len) {
        if (len == this.#array.length) {
            let newLen = this.#array.length * 2;
            let newArr = new Array(newLen);
            for (var i = 0; i < this.#size; i++) {
                newArr[i] = this.#array[i];
            }
            this.#array = newArr;
        }
    }
    /**
     * Returns whether or not this ArrayList is empty
     * @return whether or not this ArrayList is empty
     */
    isEmpty() {
        if (this.#size == 0) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Returns the size of this ArrayList
     * @return the size of this ArrayList
     */
    getSize() {
        return this.#size;
    }
    /**
     * Returns element at given index
     * @param {*} idx index where element is to be returned
     * @return the element at the given index
     */
    get(idx) {
        idx = parseInt(idx)
        if (idx >= this.#size || idx < 0) {
            throw new RangeError("Index is out of bounds of #array list. Index = " + idx);
        }
        return this.#array[idx]
    }
    /**
     * Replaces element at given index with the given element
     * @param {*} idx index where element is to be replaced
     * @param {*} element element to replace current element at given index
     * @return the element that is replaced
     */
    set(idx, element) {
        idx = parseInt(idx)
        if (idx >= this.#size || idx < 0) {
            throw new RangeError("Index is out of bounds of #array list.");
        }
        let returnEle = this.#array[idx];
        this.#array[idx] = element;
        return returnEle;
    }
    /**
     * Removes element at the given index and returns that element
     * @param {*} idx index where element is to be removed and returned 
     */
    remove(idx) {
        idx = parseInt(idx)
        if (this.isEmpty()) {
            throw new NoSuchElementError();
        }
        if (idx >= this.#array.length || idx < 0) {
            throw new RangeError("Index is out of bounds of #array list.");
        }
        let returnEle = this.#array[idx];
        for (let i = idx; i < this.#size - 1; i++) {
            let x = i + 1;
            this.#array[i] = this.#array[i + 1]
        }
        this.#size--;
        this.#array[this.#size] = null
        
        return returnEle;
    }
    /**
     * Adds new element to #array list
     * @param {*} idx index where new element is to be added 
     * @param {*} element element to be added 
     */
    add(idx, element) {
        idx = parseInt(idx)
        this.ensureCapacity(this.#size + 1);
        if (idx >= this.#array.length || idx < 0) {
            throw new RangeError("Index is out of bounds of #array list.");
        }

        for (var i = this.#size - 1; i >= idx; i--) {
            this.#array[i + 1] = this.#array[i];
        }
        this.#array[idx] = element;
        this.#size++;

    }
    /**
     * Adds element to end of #array list 
     * @param {*} element element to be added to end of #array list 
     */
    addLast(element) {

        this.add(this.#size, element);
    }
    /**
     * Removes element from end of #array list 
     * @return the last element of the #array list 
     */
    removeLast() {
        return this.remove(this.#size - 1)
    }
    /**
     * Adds element to front of #array list 
     * @param {*} element element to be added to front of list 
     */
    addFirst(element) {

        this.add(0, element);
    }
    /**
     * Removes element from front of #array list
     * @return first element in #array list 
     */
    removeFirst() {
        return this.remove(0)
    }
    /**
     * Conveys #array information in a string format
     */
    toString() {
        let s = '[';
        for (var i = 0; i < this.#size - 1; i++) {
            s = s + this.#array[i] + ', ';
        }
        if (this.#size > 0) {
            s = s + this.#array[this.#size - 1];
        }
        return s + ']';
    }
    seralize() {
        let s = '[';
        for (let i = 0; i < this.#size - 1; i++) {

            if (typeof this.#array[i] != 'undefined') {
                s = s + this.#array[i].seralize() + ', ';
            }
        }
        if (this.#size > 0) {
            
            if (typeof this.#array[this.#size - 1] != 'undefined') {
                s = s + this.#array[this.#size - 1].seralize();
            }
        }
        return s + ']';
    }



}