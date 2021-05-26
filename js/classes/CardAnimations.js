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
}
