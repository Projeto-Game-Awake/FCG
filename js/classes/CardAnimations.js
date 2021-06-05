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
