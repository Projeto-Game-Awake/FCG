class Card {
  static sides = ["lights","shadows"];
  constructor(type, side) {
    this.sprite = null;
    this.type = type;
    this.width = 60;
    this.height = 60;
    this.side = side;
    this.stats = getCardStatsByTypeAndSide(type, side);
    this.isHidden = false;
  }
}
