class RetireSummonCards extends Phaser.Scene {
    constructor()
    {
        super("returnlist");
    }
    init(data) {
        this.cards = data.cards;
        this.player = data.player;
    }
    create ()
    {
        let popup = this.add.rectangle(200,200,1000,900,0xffffff);
        let posX = 1;
        let posY = 1;
        let currentCards = [];
        for(let i in this.cards) {
            if(!(this.cards[i] instanceof CardMagic)) {
                let card = this.cards[i];
                //let c = new CardBase(this.parent,card.x,card.y,card.type,card.side);
                let cardBase = new CardBase(this, 120 * posX,
                     150 * posY, card.type, card.side);
                cardBase.showFront();
                cardBase.on("pointerdown", function() {
                    this.board.selectedHandCard.update(card);
                    this.retireCard(this.board.selectedHandCard,false);
                    this.board.selectedHandCard = null;
                    this.arrangePlayerHand();
                    for(let i=0;i<currentCards.length;i++) {
                        if(currentCards[i]!=cardBase) {
                            currentCards[i].destroy();
                        }
                    }
                    scene.scene.setVisible(false, "returnlist");
                    scene.scene.resume("main");
                }, this.player);
                this.add.existing(cardBase);
                currentCards.push(cardBase);
                if(posX % 3 == 0) {
                    posX = 0;
                    posY++;
                }
                posX++;
            }
        }
    }
}