class Deck extends Retire {
  constructor(parent, x, y, side = 0, type = 0) {
    super(parent, x, y, side, type);
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
      new ReturnMagic(parent, x, y),
      new VibrationUpMagic(parent, x, y),
      new EnergyUpMagic(parent, x, y),
    ];
  }
}
