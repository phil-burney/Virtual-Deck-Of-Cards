import Player from "../player/player"
import Card from "../card/cards";
import Dealer from "../player/dealer"
describe('DealerTest', function() {
    describe('constructorTest', function(){
        it('Dealer should initalize without error', function(){          
            let p = new Dealer("Carson");
            let x = new Player("Phil");
            expect(p.getName()).toBe("Carson");
            expect(p.getNumCardsInHand()).toBe(0);
            expect(p instanceof Player).toBe(true);
            
            
        });

    });
    describe('testDealCardToPlayer', function(){
        it('Dealer gives a card to a player', function(){          
            let p = new Player("Carson");
            let deal = new Dealer("Phil");
            let c = new Card('c', 12);
            let d = new Card('d', 12);
            expect(p.getName()).toBe("Carson");
            expect(p.getNumCardsInHand()).toBe(0);
            deal.dealCardToPlayer(p, c);

            expect(p.getNumCardsInHand()).toBe(1);
            deal.dealCardToPlayer(p, d);
            
            expect(p.getNumCardsInHand()).toBe(2);  

            expect(p.getHand().toString()).toBe("[c 12, d 12]")          
        });

    });
    
});