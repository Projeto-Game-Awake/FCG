var CardSide = ["lights", "shadows"];
class Deck {
  constructor(x, y, side = 0, type = 0) {
    this.sprite = scene.add.sprite(x, y, "decks", type);
    this.side = side;
    this.cards = [
      new Card(0, side),
      new Card(0, side),
      new Card(0, side),
      new Card(1, side),
      new Card(1, side),
      new Card(1, side),
      new Card(2, side),
      new Card(2, side),
      new Card(2, side),
    ];
  }
}
