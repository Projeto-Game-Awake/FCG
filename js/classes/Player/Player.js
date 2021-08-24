class Player extends EnemyPlayer {
  constructor(x, y, side = 0, portal, isAtTurn) {
    super(x, y, side, portal, isAtTurn);

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
  doCardHandle(player,card) {
    card.tableSprite.setInteractive();
    card.tableSprite.on("pointerdown",() => this.showMovementArea(player,card), this);
    return card.tableSprite;
  }
  doMovement(card) {
    let lines = [];
    let y = -2;
    for(let i=0;i<=2;i++) {
      lines.push({x:i,y:y});
      y++;
    }
    for(let i=1;i>=0;i--) {
      lines.push({x:i,y:y});
      y++;
    }

    let movebles = []
    for(let i=0;i<lines.length;i++) {
      for(let j=-lines[i].x;j<=lines[i].x;j++) {
        let x = this.portal.x + j;
        let y = this.portal.y + lines[i].y;
        if(x >= 0 && x < 5 &&
           y >= 0 && y < 5) {
          let coords = this.board.getTablePosition(x,y);
          movebles.push(card.drawMoveRectangle(coords));
        }
      }
    }
    card.parent.children.bringToTop(card.tableSprite);
    return movebles;
  }
  useCard(card) {
    if (card.canSelect()) {
      console.log("---USE CARD---");
      this.cardUsed = card;
      this.removeHand(card);
      this.table.push(card.drawSprite(this));
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
