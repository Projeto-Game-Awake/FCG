var scene;
var gameConfig = {
  type: Phaser.AUTO,
  scale: {
    parent: "FCG-board",
    width: 800,
    height: 700,
  },
  scene: [board,RetireSummonCards],
};
var game = new Phaser.Game(gameConfig);
