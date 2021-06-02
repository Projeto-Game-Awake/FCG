class AutoUpdaterTextComponent extends Phaser.GameObjects.Container {
  constructor(scene, x, y, size, objectToLook, paramName) {
    console.log(objectToLook[paramName]);
    let item = new Phaser.GameObjects.BitmapText(
      scene,
      x,
      y,
      "hud",
      objectToLook[paramName],
      size,
      Phaser.GameObjects.BitmapText.ALIGN_CENTER
    );
    super(scene, x, y, [item]);

    this.item = item;
    this.objectToLook = objectToLook;
    this.paramName = paramName;
  }

  componentText() {
    return `${this.objectToLook[this.paramName]}`;
  }

  update() {
    this.item.text = this.componentText();
  }
}
