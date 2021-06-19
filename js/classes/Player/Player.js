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
    return 60;
  }
  isMain() {
    return true;
  }
  useCard(card) {
    if(card.canSelect()) {
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
    if(card instanceof CardMagic) {
      card.on("pointerdown", function (pointer) {
        if(player.board.phase.isPre() ||
           player.board.phase.isPos()) {
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
      if (player.canPlay()) {
        player.board.hasSummoned = true;
        player.useCard(card);
        card.removeAllListeners();
        card.on("pointerdown", function (pointer) {
          if(this.board.selectedHandCard) {
              this.board.selectedHandCard.update(card);
              this.retireCard(this.board.selectedHandCard, false);
              this.board.selectedHandCard = null;
              this.arrangePlayerHand();
          }
        }, player);
      }
    });
  }
  canPlay() {
    return this.isAtTurn && !this.board.hasSummoned &&
           (this.board.phase.isPre() ||
            this.board.phase.isPos());
  }
}
