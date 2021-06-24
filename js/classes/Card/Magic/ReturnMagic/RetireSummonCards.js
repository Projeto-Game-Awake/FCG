class RetireSummonCards extends Phaser.GameObjects.Container {
    constructor(parent, x, y) {
        super(parent, x, y);
        this.parent = parent;
    }
    show(cards) {
        this.parent.add.existing(this);
        let popup = new Phaser.GameObjects.Rectangle(this.parent,60,60,1000,600,0xffffff);
        this.add(popup);
        let posX = 0;
        let posY = 0;
        for(let card in cards) {
            if(!(cards[card] instanceof CardMagic)) {
                let c = cards[card]
                c.x = 80 * posX;
                c.y = 150 * posY;
                let container = this;
                c.removeAllListeners();
                c.on("pointerdown", function() {
                    /*for(let retireCard in cards) {
                        cards[retireCard].x = this.x;
                        cards[retireCard].y = 60 * this.row;
                    }*/
                    this.board.selectedHandCard.update(c);
                    this.removeHand(this.board.selectedHandCard);
                    this.retireCard(this.board.selectedHandCard);
                    this.board.selectedHandCard = null;
                    this.arrangePlayerHand();
                    c.removeAllListeners();
                    this.summonedEvent(c);
                    container.visible = false;

                    //container.destroy();
                }, this.parent.Player1);
                this.add(c);
                posX++;
                if(posX % 3 == 0) {
                    posX = 0;
                    posY++;
                }
            }
        }
        this.parent.children.bringToTop(this);
    }
}