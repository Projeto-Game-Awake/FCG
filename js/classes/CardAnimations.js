class CardAnimations {
  constructor() {}
  static goto(image, x, y, callback) {
    return {
      targets: image,
      x: x,
      y: y,
      duration: 150,
      ease: "Linear",
      onComplete: callback,
    };
  }
  static toRetire(player, card, callback) {
    return CardAnimations.goto(
      card,
      player.retire.x,
      player.retire.y,
      callback
    );
  }
  static startFlip(image, x, y, callback) {
    return {
      targets: image,
      x: x,
      y: y,
      scaleX: 0.1,
      duration: 150,
      ease: "Linear",
      onComplete: callback,
    };
  }
  static endFlip(card, x, y, callback) {
    card.showFront();
    // card.sprite.setTexture(Card.sides[card.side],card.type);
    return {
      targets: card,
      x: x,
      y: y,
      scaleX: 1,
      duration: 150,
      ease: "Linear",
      onComplete: callback,
    };
  }
}
