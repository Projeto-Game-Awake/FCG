class Field {
  constructor(x, y, type = 0) {
    let tintColor = this.fieldTintColorByType(type);
    let sprite = scene.add.sprite(x, y, "field", type).setTint(tintColor);
    this.scale = 0.8;
    sprite.scale = this.scale;
    this.width = sprite.width;
    this.height = sprite.height;
  }

  fieldTintColorByType(type) {
    let tintType = {
      0: 0x0000f0,
      1: 0xffff00,
      2: 0x808080,
    };

    return tintType[type];
  }
}
