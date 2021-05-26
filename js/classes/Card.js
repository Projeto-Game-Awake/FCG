class Card {
  constructor(type, side) {
    this.type = type;
    this.width = 40;
    this.height = 20;
    this.stats = getCardStatsByTypeAndSide(type, side);
  }
}
