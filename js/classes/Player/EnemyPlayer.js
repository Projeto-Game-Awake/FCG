class EnemyPlayer {
  constructor(x, y, side = 0, isAtTurn) {
    this.board = General.getCurrentScene();
    this.x = x;
    this.y = y;
    this.side = side;

    this.hp = 10;
    this.startX = 180;
    this.initialHandPosX = 240;

    this.stack = [];

    this.setPosition();

    this.hand = [];
    this.table = [];
    this.hasPlayed = false;
    this.isAtTurn = isAtTurn;

    let startY = y - this.getStep() * 3;
    let step = this.getStep();

    startY += step;
    this.exile = new Retire(this.board, x, startY, side, 2);
    startY += step;
    this.retire = new Retire(this.board, x, startY, side, 1);
    startY += step;
    this.deck = new Deck(this.board, x, startY, side, 0);

    this.suffleCard();
  }
  setPosition() {
    this.handRow = 1;
    this.row = 3;
  }
  getStep() {
    return -120;
  }
  isMain() {
    return false;
  }
  suffleCard() {
    let newOrder = [];
    let i = 0;
    while (this.deck.cards.length > 0) {
      newOrder[i++] = this.deck.cards.splice(
        Phaser.Math.Between(0, this.deck.cards.length - 1),
        1
      )[0];
    }
    this.deck.cards = newOrder;
  }
  popDeck(times = 1) {
    let selectedCards = this.deck.cards.slice(0, times);
    for (let i = 0; i < selectedCards.length; i++) {
      this.drawCard(selectedCards[i]);
    }
    this.deck.cards.splice(0, times);
    return selectedCards;
  }
  retireCard(card, isTable = true) {
    if (isTable) {
      this.table.splice(this.table.indexOf(card), 1);
    } else {
      this.hand.splice(this.hand.indexOf(card), 1);
    }
    this.retire.cards.push(card);
    let retirePosition = this.retire;
    card.move(retirePosition.x, retirePosition.y, 1.0);
    card.on("pointerup", function (pointer) {});
  }
  useCard(card, callback = null) {
    if(card.canUse()) {
      if(card instanceof CardMagic) {
        card.use();
      } else {
        this.cardUsed = card;
        this.removeHand(card);
        this.table.push(card);
        this.board.arrangePlayerTable(this, function () {
          card.turn(callback);
        });
        this.arrangePlayerHand();
      }
    }
  }
  removeHand(card) {
    this.hand.splice(this.hand.indexOf(card), 1);
  }
  doDrawCard(callback = null) {
    if (this.board.phase.isDraw()) {
      if (this.deck.cards.length == 0) {
        this.board.endGame("As cartas acabaram. Fim do Jogo!");
        return;
      }
      this.hand.push(this.popDeck()[0]);
      this.arrangePlayerHand(callback);
      this.board.phase.pre();
    }
  }
  drawCard(card) {
    card.showBack();
  }
  arrangePlayerHand(callback = function () {}) {
    if (this.hand.length == 0) {
      return;
    }

    let x = this.initialHandPosX;

    let moveLeft = (this.hand.length - 1) * 30;
    let card = 0;
    for (; card < this.hand.length - 1; card++) {
      this.hand[card].move(x - moveLeft, this.handRow * 60, 1.0);
      moveLeft -= 60;
    }

    this.hand[card].move(x - moveLeft, this.handRow * 60, 1.0, callback);
  }
  selectCard() {
    let currentCards = this.hand;
    while (currentCards.length > 0) {
      let index = Phaser.Math.Between(0, currentCards.length - 1);
      let card = this.hand[index];
      if (card instanceof CardMagic) {
        this.stack.push(card);
        currentCards.splice(index, 1);
      } else {
        return card;
      }
    }
    return null;
  }
  calcDamage(card) {
    this.hp -= card.stats.attack;
  }
}
