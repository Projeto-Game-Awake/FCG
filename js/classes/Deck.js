var CardSide = ["lights", "shadows"];
class Deck {
  constructor(parent, x, y, side = 0, type = 0) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.cards = [
      new CardBase(parent, x, y, 0, side),
      new CardBase(parent, x, y, 0, side),
      new CardBase(parent, x, y, 0, side),
      new CardBase(parent, x, y, 1, side),
      new CardBase(parent, x, y, 1, side),
      new CardBase(parent, x, y, 1, side),
      new CardBase(parent, x, y, 2, side),
      new CardBase(parent, x, y, 2, side),
      new CardBase(parent, x, y, 2, side),
    ];
    this.sprite = scene.add.sprite(x, y, "decks", type);
  }
  add(card) {}
}
