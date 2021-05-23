var scene;
var gameConfig = {
    type: Phaser.AUTO,
    scale: {
        parent: "FCG-board",
        width: 600,
        height: 480
    },
    scene: [board]
}
jogo = new Phaser.Game(gameConfig);