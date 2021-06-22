class Retire {
  constructor(parent, x, y, side = 0, type = 0) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.sprite = parent.add.sprite(x, y, "decks", type);
    this.cards = [];
  }
  add(card) {

  }
}
