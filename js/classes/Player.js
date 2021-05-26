class Player {
  constructor(x, y, side = 0, instance, isTurn = false) {
    this.x = x;
    this.y = y;
    this.startX = 200;
    this.hand = null;
    this.instance = instance;
    this.hasPlayed = false;
    this.isAtTurn = isTurn;

    let start = y;
    let step = 60;

    if (x > 60) {
      step *= -1;
    }
    this.deck = new Deck(x, y, side);
    start += step;
    this.retire = new Deck(x, start, side, 1);
    start += step;
    this.exile = new Deck(x, start, side, 2);
    this.suffleCard();
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
    console.log(newOrder);
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
  }

  drawCard(card) {
    let cardDisplay = scene.add.sprite(
      this.startX,
      this.y,
      CardSide[this.deck.side],
      card.type
    );
    this.startX += card.width;
    cardDisplay.info = card;

    cardDisplay.setInteractive();

    cardDisplay.on("pointerdown", function (pointer) {
      this.setTint(0xff0000);
    });

    cardDisplay.on("pointerout", function (pointer) {
      this.clearTint();
    });
    cardDisplay.player = this;

    cardDisplay.on("pointerup", function (pointer) {
      if (this.player.isAtTurn) {
        this.player.useCard(this);
      }
      this.clearTint();
    });
  }
}
