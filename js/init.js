var scene;
var gameConfig = {
  type: Phaser.AUTO,
  scale: {
    parent: "FCG-board",
    width: 800,
    height: 600,
  },
  scene: [board],
};
var game = new Phaser.Game(gameConfig);
