class EnemyPlayer {
  constructor(x, y, side = 0, isAtTurn) {
    this.board = General.getCurrentScene();
    this.x = x;
    this.y = y;
    this.side = side;

    this.hp = 5;
    this.startX = 180;

    this.setPosition();

    this.hand = [];
    this.table = [];
    this.hasPlayed = false;
    this.isAtTurn = isAtTurn;

    let startY = y;
    let step = this.getStep();

    startY += step;
    this.deck = new Deck(this.board, x, startY, side);
    startY += step;
    this.retire = new Retire(this.board, x, startY, side, 1);
    startY += step;
    this.exile = new Retire(this.board, x, startY, side, 2);
    this.suffleCard();
  }
  setPosition() {
    this.handRow = 1;
    this.row = 3;
  }
  getStep() {
    return 60;
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
  useCard(card) {
    this.cardUsed = card;
    this.hasPlayed = true;
    this.arrangePlayerHand(card);
  }
  doDrawCard(callback = null) {
    if (this.board.phase.isDraw()) {
      if (this.deck.cards.length == 0) {
        this.board.endGame("As cartas acabaram. Fim do Jogo!");
        return;
      }
      this.hand.push(this.popDeck()[0]);
      this.arrangePlayerHand(null, callback);
      this.board.phase.pre();
    }
  }
  drawCard(card) {
    card.showBack();
  }
  arrangePlayerHand(removedCard, callback = function () {}) {
    if (removedCard != null) {
      this.hand.splice(this.hand.indexOf(removedCard), 1);
    }

    if (this.hand.length == 0) {
      return;
    }

    let x = 240;

    let moveLeft = (this.hand.length - 1) * 30;
    let card = 0;
    for (; card < this.hand.length - 1; card++) {
      this.hand[card].move(x - moveLeft, this.handRow * 60);
      moveLeft -= 60;
    }

    this.hand[card].move(x - moveLeft, this.handRow * 60, callback);
  }
  selectCard() {
    return this.hand[Phaser.Math.Between(0, this.hand.length - 1)];
  }
  calcDamage(card) {
    this.hp -= card.stats.attack;
  }
}
