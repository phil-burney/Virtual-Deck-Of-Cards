import Card from '../card/cards.js'
describe('CardTest', function() {
    describe('constructorTest', function(){
        it('Error should be thrown because of incorrect suit', function(){          
            expect(() => new Card("x", 3)).toThrow(Error);
        });
        it('Error should be thrown because of incorrect number', function(){           
            expect(() => new Card("c", -1)).toThrow(Error);
            expect(() => new Card("c", 15)).toThrow(Error);
               
        });
        it('Card should be initalized', function(){
            let c = new Card("c", 12);
        });

    });
    describe('getSuitTest', function(){
        let c = new Card("c", 12);
        it('Should return c', function(){          
            expect(c.getSuit()).toBe("c");
        });
        

    });
    describe('Should return 12', function(){
        let c = new Card("c", 12);
        it('Error should be thrown because of incorrect suit', function(){          
            expect(c.getNumber()).toBe(12);
        });

    });
});