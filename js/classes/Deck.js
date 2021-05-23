var CardSide = {Light:0, Dark:1};
class Deck {
    constructor(x,y,type=CardSide.Light){
        this.sprite = scene.add.sprite(x,y,"deck",type);
        if(type==CardSide.Light) {
            this.cards = [
                new Card(0),
                new Card(0),
                new Card(0),
                new Card(1),
                new Card(1),
                new Card(1),
                new Card(2),
                new Card(2),
                new Card(2),
            ]
        } else {
            this.cards = [
                new Card(3),
                new Card(3),
                new Card(3),
                new Card(4),
                new Card(4),
                new Card(4),
                new Card(5),
                new Card(5),
                new Card(5),
            ]
        }
    }
}