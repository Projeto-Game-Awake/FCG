class Plot extends Phaser.GameObjects.Container {
  constructor(parent, x, y, type = 0, scale = 1) {
    let fieldImage = new Phaser.GameObjects.Sprite(parent, 0, 0, "plot");

    let label = new Phaser.GameObjects.BitmapText(
      parent,
      0,
      0,
      "hud",
      "",
      10,
      Phaser.GameObjects.BitmapText.ALIGN_CENTER
    );

    super(parent, x, y, [fieldImage, label]);

    this.label = label;
    this.fieldImage = fieldImage;

    let tintColor = this.fieldTintColorByType(type);
    fieldImage.setTint(tintColor);

    this.scale = scale;
    parent.add.existing(this);
  }

  fieldTintColorByType(type) {
    let tintType = {
      0: 0x0000f0,
      1: 0xffff00,
      2: 0x808080,
      3: 0x00ff00,
      4: 0x0000ff,
    };

    return tintType[type];
  }

  setLabel(label) {
    this.label.text = label;
  }
}
