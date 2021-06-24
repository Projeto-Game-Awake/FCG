class Player extends EnemyPlayer {
  constructor(x, y, side = 0, isAtTurn) {
    super(x, y, side, isAtTurn);

    this.deck.setInteractive();
    this.deck.on(
      "pointerdown",
      function () {
        this.doDrawCard();
      },
      this
    );
  }
  setPosition() {
    this.handRow = 10;
    this.row = 5;
  }
  getStep() {
    return 120;
  }
  isMain() {
    return true;
  }
  useCard(card) {
    if (card.canSelect()) {
      console.log("---USE CARD---");
      this.cardUsed = card;
      this.removeHand(card);
      this.table.push(card);
      this.board.arrangePlayerTable(this);
      this.arrangePlayerHand();
    }
  }
  drawCard(card) {
    card.showFront();
    card.x = this.startX;
    card.y = this.y;
    card.setInteractive();

    let player = this;
    if (card instanceof CardMagic) {
      card.on("pointerdown", function (pointer) {
        console.log("----USOU---");
        if (player.board.phase.isPre() || player.board.phase.isPos()) {
          player.useCard(card);
        }
      });
    } else {
      this.summonedEvent(card);
    }
  }
  summonedEvent(card) {
    let player = this;
    card.on("pointerdown", function (pointer) {
      console.log("--SUMMON--");
      if (player.canPlay()) {
        player.board.hasSummoned = true;
        player.useCard(card);
        card.removeAllListeners();
        card.on(
          "pointerdown",
          function (pointer) {
            console.log("----DENTRO---");
            if (this.board.selectedHandCard) {
              this.board.selectedHandCard.update(card);
              this.retireCard(this.board.selectedHandCard, false);
              this.board.selectedHandCard = null;
              this.arrangePlayerHand();
            }
          },
          player
        );
      }
    });
  }
  canPlay() {
    return (
      this.isAtTurn &&
      !this.board.hasSummoned &&
      (this.board.phase.isPre() || this.board.phase.isPos())
    );
  }
}
