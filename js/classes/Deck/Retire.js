class Retire extends Phaser.GameObjects.Container {
  constructor(parent, x, y, type = 0) {
    let fieldImage = new Phaser.GameObjects.Sprite(parent, 0, 0, "field");

    let label = new Phaser.GameObjects.BitmapText(
      parent,
      -30,
      0,
      "hud",
      "Repouso",
      13,
      Phaser.GameObjects.BitmapText.ALIGN_LEFT
    );

    super(parent, x, y, [fieldImage, label]);

    this.label = label;
    this.fieldImage = fieldImage;

    let tintColor = this.fieldTintColorByType(type);
    fieldImage.setTint(tintColor);

    parent.add.existing(this);

    this.setSize(66, 120);
    this.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, 66, 120),
      Phaser.Geom.Rectangle.Contains
    );
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
