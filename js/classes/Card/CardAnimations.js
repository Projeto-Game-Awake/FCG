class CardAnimations {
  constructor() {}

  static gotoAndScale(image, x, y, scale, callback) {
    return {
      targets: image,
      x: x,
      y: y,
      scale: scale,
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
  static endFlip(card, x, y, scale = 1, callback) {
    return {
      targets: card,
      x: x,
      y: y,
      scaleX: scale,
      duration: 150,
      ease: "Linear",
      onComplete: callback,
    };
  }
}
