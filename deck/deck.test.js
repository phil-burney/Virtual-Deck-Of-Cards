import Card from "../card/cards";
import CardError from "../card/carderror"
import ArrayList from "../data_structures/arraylist"
import Deck from "../deck/deck"
describe('DeckTest', function() {
    describe('constructorTest', function(){
        let deck = new Deck();
        it('Deck should have 13 of each suit', function(){          
            let clubsCount = 0;
            let diamondsCount = 0;
            let heartsCount = 0;
            let spadesCount = 0;
            for(let i = 0; i < 52; i++){
                let c = deck.pullTopCard()
                if(c.getSuit() == 'c'){
                    clubsCount++
                }
                if(c.getSuit() == 'd'){
                    diamondsCount++
                }
                if(c.getSuit() == 'h'){
                    heartsCount++
                }
                if(c.getSuit() == 's'){
                    spadesCount++
                }
            }
            expect(clubsCount).toBe(13);
            expect(heartsCount).toBe(13);
            expect(diamondsCount).toBe(13);
            expect(spadesCount).toBe(13);
            
        });
        

    });
    describe('pullTopCardTest', function(){
        let c = new Card("s", 14);
        let deck = new Deck();
        it('Should return true', function(){          
            expect(c.equals(deck.pullTopCard())).toBe(true);
        });
        let d = new Card("d", 14)
        it('Should return false', function(){          
            expect(d.equals(deck.pullTopCard())).toBe(false);
        });
        

    });
    describe('pullRandomCardTest', function(){
        let deck = new Deck();
        let c = deck.pullRandomCard();
        let x = typeof c
        it('Should return true', function(){          
            expect('object' === x).toEqual(true)
        });
        
    });
    describe('pullBottomCardTest', function(){
        let deck = new Deck();
        let c = new Card("c", 2);
        it('Should return true', function(){          
            expect(c.equals(deck.pullBottomCard())).toBe(true);
        });
        let d = new Card("d", 14)
        it('Should return false', function(){          
            expect(d.equals(deck.pullBottomCard())).toBe(false);
        });
        

    });
    describe('placeRandomCardTest', function(){
        let deck = new Deck();
        
        it('Removes top card and replaces it in the deck', function(){
            let c = deck.pullTopCard();
            expect(deck.numCardsInDeck()).toEqual(51);
            deck.placeCardRandom(c);
            expect(deck.numCardsInDeck()).toEqual(52);
        });
    });
    describe('placeCardOnTopTest', function(){
        let deck = new Deck();
        
        it('Removes top card and replaces atop deck', function(){
            let c = deck.pullTopCard();
            expect(deck.numCardsInDeck()).toEqual(51);
            deck.placeCardOnTop(c);
            expect(deck.numCardsInDeck()).toEqual(52);
            let d = deck.pullTopCard();
            expect(c.equals(d)).toBe(true);

        });
    });
    describe('placeCardOnBottomTest', function(){
        let deck = new Deck();
        
        it('Removes top card and replaces atop deck', function(){
            let c = deck.pullTopCard();
            expect(deck.numCardsInDeck()).toEqual(51);
            deck.placeCardOnBottom(c);
            expect(deck.numCardsInDeck()).toEqual(52);
            let d = deck.pullBottomCard();
            expect(c.equals(d)).toBe(true);

        });
    });
    describe('shuffleTest', function(){
        let deck = new Deck();
        let deck2 = new Deck();
        it('Shuffle deck', function(){
            expect(deck.numCardsInDeck()).toEqual(52);
            deck.shuffle();
            expect(deck.numCardsInDeck()).toEqual(52);
            expect(deck2.equals(deck)).toBe(false);
        });
    })
});