class board extends Phaser.Scene{
    constructor(){
        super("FCG-board");

        this.Fields = [];
        this.Player1 = null;
        this.Player2 = null;
    }
    preload(){
        this.load.spritesheet("decks","assets/spritesheets/decks.png",{
            frameWidth: 60,
            frameHeight: 60,
        });
        this.load.spritesheet("fields","assets/spritesheets/fields.png",{
            frameWidth: 60,
            frameHeight: 60,
        });
        this.load.spritesheet("lights","assets/spritesheets/lights.png",{
            frameWidth: 60,
            frameHeight: 60,
        });
        this.load.spritesheet("shadows","assets/spritesheets/shadows.png",{
            frameWidth: 60,
            frameHeight: 60,
        });
    }
    create(){
        scene = this;
        
        this.Player1 = new Player(60,60);

        this.Player2 = new Player(420,420,1);

        for(let i=0;i<5;i++) {
            this.Fields[i] = [];
            for(let j=0;j<2;j++) {
                this.Fields[i][j] = new Field(60*(i+2),60*(j+2),2);
            }
            this.Fields[i][2] = new Field(60*(i+2),60*(2+2),1);
            for(let j=3;j<5;j++) {
                this.Fields[i][j] = new Field(60*(i+2),60*(j+2));
            }
        }

        this.selectStartHand(this.Player1);
        this.selectStartHand(this.Player2);
    }
    selectStartHand(player) {
        player.hand = player.popDeck(3);
    }
}
 