import Player from "../player/player"
import Card from "../card/cards";
describe('PlayerTest', function () {
    describe('constructorTest', function () {
        it('Player should initalize without error', function () {
            let p = new Player("Carson");
            expect(p.getName()).toBe("Carson");
            expect(p.getNumCardsInHand()).toBe(0);

        });

    });
    describe('testGiveCardToPlayer', function () {
        it('Give a card to a player', function () {
            let p = new Player("Carson");
            let c = new Card('c', 12);
            let d = new Card('d', 12);
            expect(p.getName()).toBe("Carson");
            expect(p.getNumCardsInHand()).toBe(0);
            p.giveCardToPlayer(c);
            expect(p.getNumCardsInHand()).toBe(1);
            p.giveCardToPlayer(d);
            expect(p.getNumCardsInHand()).toBe(2);
        });

    });
    describe('testTakeCardFromPlayer', function () {
        let p = new Player("Carson");
        let c = new Card('c', 12);
        let d = new Card('d', 12);
        expect(p.getName()).toBe("Carson");
        expect(p.getNumCardsInHand()).toBe(0);
        p.giveCardToPlayer(c);
        expect(p.getNumCardsInHand()).toBe(1);
        p.giveCardToPlayer(d);
        expect(p.getNumCardsInHand()).toBe(2);
        it('Take cards from player and verify that they are correct', function () {
            expect(d.equals(p.takeCardFromPlayer(1))).toBe(true);
            expect(c.equals(p.takeCardFromPlayer(0))).toBe(true);
        });

    });
    describe('testGetHand', function () {
        let p = new Player("Carson");
        let c = new Card('c', 12);
        let d = new Card('d', 12);
        expect(p.getName()).toBe("Carson");
        expect(p.getNumCardsInHand()).toBe(0);
        p.giveCardToPlayer(c);
        expect(p.getNumCardsInHand()).toBe(1);
        p.giveCardToPlayer(d);
        expect(p.getNumCardsInHand()).toBe(2);
        it('The returned array list, when turned into a string, should be [c 12, d 12]', function () {
            expect(p.getHand().toString()).toBe("[c 12, d 12]")
        });

    });
    describe('testSetName', function () {
        let p = new Player("Carson");
        it('Renames player, and new player should be named Cara', function () {
            p.setName("Cara");
            expect(p.getName()).toBe("Cara");
        });
    });
    describe('testToAndFromJSON', function () {
        let p = new Player("Carson", 1);
        let c = new Card('c', 12);
        let d = new Card('d', 12);
        let e = new Card('h', 12)
        expect(p.getName()).toBe("Carson");
        expect(p.getNumCardsInHand()).toBe(0);
        p.giveCardToPlayer(c);
        expect(p.getNumCardsInHand()).toBe(1);
        p.giveCardToPlayer(d);
        expect(p.getNumCardsInHand()).toBe(2);
        p.giveCardToPlayer(e);
        it('', function () {
            expect(p.seralize()).toBe("name:Carson; number:1; cards:[c12, d12, h12]")
        });

        let revived = Player.deseralize(p.seralize());

        expect(revived.seralize()).toBe(p.seralize())
        //expect(p.equals(revived)).toBe(true)
        
    });
});