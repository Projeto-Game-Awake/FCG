class Player {
    constructor(x,y,side=0) {
        this.x = x;
        this.y = y;
        this.startX = 200;
        this.hand = null;
        let start = y;
        let step = 60;
        if(x > 60) {
            step *= -1;
        }
        this.deck = new Deck(x,y,side);
        start += step;
        this.retire = new Deck(x,start,side,1);
        start += step;
        this.exile = new Deck(x,start,side,2);
        this.suffleCard();
    }
    suffleCard() {
        let newOrder = [];
        let i = 0;
        while(this.deck.cards.length > 0) {
            newOrder[i++] = this.deck.cards.splice(Phaser.Math.Between(0,this.deck.cards.length-1),1)[0];
        }
        console.log(newOrder);
        this.deck.cards = newOrder;
    }
    popDeck(times=1) {
        let selectedCards = this.deck.cards.slice(0,times);
        for(let i=0;i<selectedCards.length;i++) {
            this.drawCard(selectedCards[i]);
        }
        this.deck.cards.splice(0,times);
        return selectedCards;
    }
    drawCard(card) {
        scene.add.sprite(this.startX,this.y,CardSide[this.deck.side],card.type);
        this.startX += 20;
    }
}