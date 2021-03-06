class Player extends EnemyPlayer {
  constructor(x, y, side = 0, isAtTurn) {
    super(x,y,side,isAtTurn);

    this.deck.sprite.setInteractive();
    this.deck.sprite.on(
      "pointerdown",
      function () {
        this.doDrawCard();
      },
      this
    );
  }
  setPosition() {
    this.handRow = 9;
    this.row = 5;
  }
  getStep() {
    return -60;
  }
  isMain() {
    return true;
  }
  drawCard(card) {
    card.showFront();
    card.x = this.startX;
    card.y = this.y;
    card.setInteractive();

    let player = this;
    card.on("pointerup", function (pointer) {
      if (
        player.isAtTurn &&
        (player.board.phase == board.Phase.pre ||
          player.board.phase == board.Phase.pos)
      ) {
        player.useCard(card);
      }
    });
  }
}
