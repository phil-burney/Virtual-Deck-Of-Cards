import Player from "../player/player"
import Card from "../card/cards";
import Dealer from "../player/dealer"
import Game from "../game/game"
describe('GameTest', function () {
    describe('constructorTest', function () {
        it('Game should initalize without error', function () {
            let g = new Game("Carson");
            expect(g.getPlayerList().getSize()).toBe(0);
            expect(g.getPool().getSize()).toBe(0);
            expect(g.getDealer().getName()).toBe("Carson")

        });

    });
    describe('testPlayerGiveToOtherPlayer', function () {
        let g = new Game("Carson");
        let c = new Card('c', 14);
        g.addPlayer("Phil");
        g.addPlayer("Jane");
        expect(g.getPlayerList().getSize()).toBe(2);
        g.getPlayerList().get(0).giveCardToPlayer(c);
        it('Player named Phil attempts to give to Player Jane but fails because of invalid permissions', function () {
            expect(() => g.playerGiveToOtherPlayer(g.getPlayer(0), g.getPlayer(1), 0)).toThrow(Error);
        });

        let pg = new Game("Carson", true, true)
        pg.addPlayer("Phil");
        pg.addPlayer("Jane");
        pg.getPlayerList().get(0).giveCardToPlayer(c);
        it('Player named Phil gives card to Player Jane', function () {
            expect(pg.getPlayer(0).getNumCardsInHand()).toBe(1);
            expect(pg.getPlayer(1).getNumCardsInHand()).toBe(0);
            pg.playerGiveToOtherPlayer(0, 1, 0);
            expect(pg.getPlayer(0).getNumCardsInHand()).toBe(0);
            expect(pg.getPlayer(1).getNumCardsInHand()).toBe(1);
        });

    });

    describe('testPlayerTakeFromDeck', function () {
        let g = new Game("Carson");
        g.addPlayer("Phil");
        expect(g.getPlayerList().getSize()).toBe(1);
        it('Player named Phil attempts to take from deck but is not able to due to invalid permissions', function () {
            expect(() => g.playerTakeFromDeck(0, "top")).toThrow(Error);
        });

        let pg = new Game("Carson", true, true)
        pg.addPlayer("Phil");
        it('Player named Phil takes from top and bottom of unshuffled deck, as well as a random card', function () {
            pg.playerTakeFromDeck(0, "top")
            expect(pg.getNumCardsInGameDeck()).toBe(51);
            expect(pg.getPlayer(0).getNumCardsInHand()).toBe(1);
            pg.playerTakeFromDeck(0, "bottom")
            expect(pg.getNumCardsInGameDeck()).toBe(50);
            expect(pg.getPlayer(0).getNumCardsInHand()).toBe(2);
            expect(pg.getPlayer(0).getHand().toString()).toBe('[s 14, c 2]');

            pg.playerTakeFromDeck(0, "random")
            expect(pg.getNumCardsInGameDeck()).toBe(49);
            expect(pg.getPlayer(0).getNumCardsInHand()).toBe(3);

        });
        describe('testPlayerTakeFromDeck', function () {
            let g = new Game("Carson");
            g.addPlayer("Phil");
            expect(g.getPlayerList().getSize()).toBe(1);
            it('Player named Phil attempts to take from deck but is not able to due to invalid permissions', function () {
                expect(() => g.playerTakeFromDeck(0, "top")).toThrow(Error);
            });

            let pg = new Game("Carson", true, true)
            pg.addPlayer("Phil");
            it('Player named Phil takes from top and bottom of unshuffled deck, as well as a random card', function () {
                pg.playerTakeFromDeck(0, "top")
                expect(pg.getNumCardsInGameDeck()).toBe(51);
                expect(pg.getPlayer(0).getNumCardsInHand()).toBe(1);
                pg.playerTakeFromDeck(0, "bottom")
                expect(pg.getNumCardsInGameDeck()).toBe(50);
                expect(pg.getPlayer(0).getNumCardsInHand()).toBe(2);
                expect(pg.getPlayer(0).getHand().toString()).toBe('[s 14, c 2]');

                pg.playerTakeFromDeck(0, "random")
                expect(pg.getNumCardsInGameDeck()).toBe(49);
                expect(pg.getPlayer(0).getNumCardsInHand()).toBe(3);

            });

        });
        describe('testPlayerGiveToDeck', function () {


            let pg = new Game("Carson", true, true)
            pg.addPlayer("Phil");

            pg.playerTakeFromDeck(0, "top")
            expect(pg.getNumCardsInGameDeck()).toBe(51);
            expect(pg.getPlayer(0).getNumCardsInHand()).toBe(1);
            pg.playerTakeFromDeck(0, "bottom")
            expect(pg.getNumCardsInGameDeck()).toBe(50);
            expect(pg.getPlayer(0).getNumCardsInHand()).toBe(2);
            expect(pg.getPlayer(0).getHand().toString()).toBe('[s 14, c 2]');
            pg.playerTakeFromDeck(0, "random")
            expect(pg.getNumCardsInGameDeck()).toBe(49);
            expect(pg.getPlayer(0).getNumCardsInHand()).toBe(3);

            it('Player named Phil gives cards back to deck that he took', function () {
                pg.playerGiveToDeck(0, 2, "top")
                expect(pg.getNumCardsInGameDeck()).toBe(50);
                expect(pg.getPlayer(0).getNumCardsInHand()).toBe(2);
                expect(pg.getPlayer(0).getHand().toString()).toBe('[s 14, c 2]');
                pg.playerGiveToDeck(0, 0, "bottom")
                expect(pg.getNumCardsInGameDeck()).toBe(51);
                expect(pg.getPlayer(0).getNumCardsInHand()).toBe(1);
                expect(pg.getPlayer(0).getHand().toString()).toBe('[c 2]');
                pg.playerGiveToDeck(0, 0, "random")
                expect(pg.getNumCardsInGameDeck()).toBe(52);
                expect(pg.getPlayer(0).getNumCardsInHand()).toBe(0);
                expect(pg.getPlayer(0).getHand().toString()).toBe('[]');

            });

        });

        describe('testGiveToPool', function () {




            let c = new Card('c', 12);
            let d = new Card('d', 12);



            it('Player named Phil gives cards to the card pool', function () {
                pg.giveToPool(c)
                expect(pg.numCardsInPool()).toBe(1);
                pg.giveToPool(d)
                expect(pg.numCardsInPool()).toBe(2);
            });

        });

        describe('testTakeFromPool', function () {

            let pg = new Game("Carson", true, true)
            pg.addPlayer("Phil");
            pg.giveToPool(0, 2)
            pg.giveToPool(0, 0)
            pg.giveToPool(0, 0)


            it('Player named Phil gives cards to the card pool', function () {
                pg.takeFromPool(0);
                expect(pg.numCardsInPool()).toBe(2);
                pg.takeFromPool(0);
                expect(pg.numCardsInPool()).toBe(1);
                pg.takeFromPool(0);
                expect(pg.numCardsInPool()).toBe(0);
                expect(pg.getPlayer(0).getNumCardsInHand()).toBe(3);
            });
        });
        describe('testPlayerList', function () {
            let pg = new Game("Carson", true, true)

            it('Add 3 players to the game, and use getPlayer() for each, and then removes Jane from list of players', function () {
                pg.addPlayer("Phil");
                pg.addPlayer("Jane");
                pg.addPlayer("Forward");
                expect(pg.getPlayerList().getSize()).toBe(3);
                expect(pg.getPlayerList().toString()).toBe('[Phil, Jane, Forward]');
                expect(pg.getPlayer(0).toString()).toBe("Phil");
                expect(pg.getPlayer(1).toString()).toBe("Jane");
                expect(pg.getPlayer(2).toString()).toBe("Forward");

                pg.removePlayer(1);
                expect(pg.getPlayerList().getSize()).toBe(2);
                expect(pg.getPlayerList().toString()).toBe('[Phil, Forward]');
            });
        });
        describe('testGetDealer', function () {
            let pg = new Game("Carson", true, true)

            it('Tests getDealer()', function () {
                expect(pg.getDealer().toString()).toBe("Carson");
            });
        });
        describe('testSwitchDealer', function () {
            let pg = new Game("Carson", true, true)
            pg.addPlayer("Phil");
            it('Tests switchDealer()', function () {
                expect(pg.getPlayerList().toString()).toBe('[Phil]');
                pg.switchDealer(0);
                expect(pg.getPlayerList().toString()).toBe('[Carson]');
                expect(pg.getDealer().toString()).toBe("Phil");
                expect(pg.getPlayer(0).toString()).toBe("Carson");
                expect(pg.getPlayerList().getSize()).toBe(1);
            });
        });

        describe('toAndFromJSON', function () {
            let gg = new Game("Carson", true, true)
            it('Test with no players', function() {
                expect(gg.seralize()).toBe("deck:{cards: [c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14]}" +
                " | players:[]" +
                " | dealer:name:Carson; number:dealer; cards:[]" +
                " | cardpool:[]" + 
                " | table:[]" + 
                " | playersCanTakeFromDeck:true" +
                " | playersCanGiveToOthers:true");
                let revived = Game.deseralize(gg.seralize());

                expect(revived.seralize()).toBe(gg.seralize())
            })

            let pg = new Game("Carson", true, true)
            pg.addPlayer("Phil", 1);
            pg.getPlayer(0).giveCardToPlayer(new Card('c', 12))
            pg.getPlayer(0).giveCardToPlayer(new Card('d', 12))
            it('Tests toJSON', function () {
                expect(pg.seralize()).toBe("deck:{cards: [c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14]}" +
                " | players:[name:Phil; number:1; cards:[c12, d12]]" +
                " | dealer:name:Carson; number:dealer; cards:[]" +
                " | cardpool:[]" +
                " | table:[]" +  
                " | playersCanTakeFromDeck:true" +
                " | playersCanGiveToOthers:true");
                let revived = Game.deseralize(pg.seralize());

                expect(revived.seralize()).toBe(pg.seralize())
            });
            it('Add another player and test', function() {
                pg.addPlayer("Cara", 2);
                expect(pg.seralize()).toBe("deck:{cards: [c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14]}" +
                " | players:[name:Phil; number:1; cards:[c12, d12], name:Cara; number:2; cards:[]]" +
                " | dealer:name:Carson; number:dealer; cards:[]" +
                " | cardpool:[]" + 
                " | table:[]" + 
                " | playersCanTakeFromDeck:true" +
                " | playersCanGiveToOthers:true");
                let revived = Game.deseralize(pg.seralize());

                expect(revived.seralize()).toBe(pg.seralize())
            });
            

            
        })
    });

});