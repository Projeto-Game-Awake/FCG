class CardAnimations {
  constructor() {}
  goto(image, x, y, callback) {
    return {
      targets: image,
      x: x,
      y: y,
      duration: 150,
      ease: "Linear",
      onComplete: callback,
    };
  }
  static toRetire(player,card, callback) {
    return {
      targets: card,
      x: player.retire.x,
      y: player.retire.y,
      duration: 150,
      ease: "Linear",
      onComplete: callback,
    };
  }
}
