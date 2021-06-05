class Hud extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.scene = scene;
    this.scene.add.existing(this);

    this.x = x;
    this.y = y;

    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
    this.add(item);
  }

  update() {
    this.items.forEach((item) => {
      item.update();
    });
  }
}
