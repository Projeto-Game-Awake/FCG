class Player {
  constructor(board,x, y, side = 0, instance, isMain = false) {
    this.board = board;
    this.x = x;
    this.y = y;

    this.hp = 5;
    this.startX = 180;
    if(x == 60){
      this.handRow = 1;
      this.row = 3;
      this.bar = instance.add.text(420,60,this.hp, { font: '24px Courier', fill: '#00ff00' });
    } else {
      this.handRow = 7;
      this.row = 5;
      this.bar = instance.add.text(60,420,this.hp, { font: '24px Courier', fill: '#00ff00' });
    }
    this.hand = [];
    this.table = [];
    this.instance = instance;
    this.hasPlayed = false;
    this.isAtTurn = isMain;
    this.isMain = isMain;

    let startY = y;
    let step = 60;

    if (x > 60) {
      step *= -1;
    }
    startY += step;
    this.deck = new Deck(x, startY, side);
    if(isMain) {
      this.deck.sprite.setInteractive();
      this.deck.sprite.on("pointerdown", function() {
        this.doDrawCard()
      }, this);
    }
    startY += step;
    this.retire = new Deck(x, startY, side, 1);
    startY += step;
    this.exile = new Deck(x, startY, side, 2);
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
    if(this.board.phase == board.Phase.draw) {
      if(this.deck.cards.length == 0) {
        this.board.endGame("As cartas acabaram. Fim do Jogo!");
        return;
      }
      this.hand.push(this.popDeck()[0]);
      this.arrangePlayerHand(null,callback);
      this.board.phase = board.Phase.pre;
    }
  }
  drawCard(card) {
    
    if(this.isMain) {
      card.sprite = scene.add.sprite(
        this.startX,
        this.y,
        CardSide[this.deck.side],
        card.type
      ); 
    } else {
      card.sprite = scene.add.sprite(
        this.startX,
        this.y,
        "decks",
        0
      );
      card.isHidden = true;     
    }

    let cardDisplay = card.sprite;
    cardDisplay.setInteractive();

    cardDisplay.on("pointerdown", function (pointer) {
      this.setTint(0xff0000);
    });

    cardDisplay.on("pointerout", function (pointer) {
      this.clearTint();
    });

    let player = this;

    cardDisplay.on("pointerup", function (pointer) {
      if (player.isAtTurn && 
         (player.board.phase == board.Phase.pre || 
          player.board.phase == board.Phase.pos)) {
        player.useCard(card);
      }
      this.clearTint();
    });
  }
  arrangePlayerHand(removedCard, callback = function() {}) {
    if(removedCard != null) {
      this.hand.splice(this.hand.indexOf(removedCard),1);
    }

    if(this.hand.length == 0) {
      return;
    }

    let x = 240;

    let timeLine = scene.tweens.createTimeline();
    let moveLeft = (this.hand.length - 1) * 30;
    let card = 0;
    for(;card < this.hand.length-1;card++) {
      timeLine.add(
        CardAnimations.goto(
          this.hand[card].sprite,
          x - moveLeft,
          this.handRow * 60
        )
      );
      moveLeft -= 60
    }
    timeLine.add(
      CardAnimations.goto(
        this.hand[card].sprite,
        x - moveLeft,
        this.handRow * 60,
        callback
      )
    );
    timeLine.play();
  }
  selectCard() {
    return this.hand[
      Phaser.Math.Between(0, this.hand.length - 1)
    ];
  }
  calcDamage(card) {
    this.hp -= card.stats.attack;
    this.bar.setText(this.hp);
  }
}
