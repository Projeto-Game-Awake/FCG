class board extends Phaser.Scene{
    constructor(){
        super("FCG-board");

        this.Fields = [];
        this.Player1Deck = null;
        this.Player2Deck = null;
    }
    preload(){
        
    }
    create(){
        scene = this;
        
        this.Player1Deck = {
            deck:new Deck(60,60),
            retire:new Deck(60,120),
            exile:new Deck(60,180),
        }

        this.Player2Deck = {
            deck:new Deck(420,420),
            retire:new Deck(420,360),
            exile:new Deck(420,300),
        }

        for(let i=0;i<5;i++) {
            this.Fields[i] = [];
            for(let j=0;j<5;j++) {
                this.Fields[i][j] = new Field(60*(i+2),60*(j+2));
            }
        }
    }
}
 