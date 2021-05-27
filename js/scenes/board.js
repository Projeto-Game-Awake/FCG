class board extends Phaser.Scene {
  static Phase = {
    draw:0,
    pre:1,
    battle:2,
    pos:3,
    end:4
  }
  constructor() {
    super("FCG-board");

    this.Fields = [];
    this.Battle = new Battle();
    this.currentDepth = 0;
    this.Player1 = null;
    this.Player2 = null;
    this.phase = board.Phase.draw;
  }
  preload() {
    this.load.spritesheet("decks", "assets/spritesheets/decks.png", {
      frameWidth: 60,
      frameHeight: 60,
    });
    this.load.spritesheet("fields", "assets/spritesheets/fields.png", {
      frameWidth: 60,
      frameHeight: 60,
    });
    this.load.spritesheet("lights", "assets/spritesheets/lights.png", {
      frameWidth: 60,
      frameHeight: 60,
    });
    this.load.spritesheet("shadows", "assets/spritesheets/shadows.png", {
      frameWidth: 60,
      frameHeight: 60,
    });
  }
  create() {
    scene = this;

    this.Player1 = new Player(this,420, 420, 0, scene, true);
    this.Player2 = new Player(this,60, 60, 1, scene);

    for (let i = 0; i < 5; i++) {
      this.Fields[i] = [];
      for (let j = 0; j < 2; j++) {
        this.Fields[i][j] = new Field(60 * (i + 2), 60 * (j + 2), 2);
      }

      this.Fields[i][2] = new Field(60 * (i + 2), 60 * (2 + 2), 1);

      for (let j = 3; j < 5; j++) {
        this.Fields[i][j] = new Field(60 * (i + 2), 60 * (j + 2));
      }
    }

    this.selectStartHand(this.Player1);
    this.selectStartHand(this.Player2);
  }

  swithPlayer() {
    this.Player1.isAtTurn = !this.Player1.isAtTurn;
    this.Player2.isAtTurn = !this.Player2.isAtTurn;

    this.Player1.hasPlayed = false;
    this.Player2.hasPlayed = false;

    if(this.Player2.isAtTurn) {
      this.doNPCTurn();
    }
  }
  doNPCTurn() {
    this.Player2.doDrawCard();
    //this.Player2.setCard();
  }
  getPlayerTurn() {
    if (this.Player1.isAtTurn) return this.Player1;
    else return this.Player2;
  }
  update(time, delta) {
    let playerTurn = this.getPlayerTurn();
    if (playerTurn.hasPlayed) {
      playerTurn.hasPlayed = false;
      this.phase = board.Phase.battle;
      let cardUsed = playerTurn.cardUsed;
      playerTurn.table.push(cardUsed);
      cardUsed.depth = this.currentDepth++;
      this.arrangePlayerTable(playerTurn, cardUsed);
    }
  }
  arrangePlayerTable(player, cardUsed = null) {
    if(player.table.length == 0) {
      return;
    }
    let cardAnimation = new CardAnimations();
    let battle = this.Battle;
    let x = battle.battlePosition.x;
    let timeLine = this.tweens.createTimeline();
    let moveLeft = (player.table.length - 1) * 30;
    let card = 0;
    for(;card < player.table.length-1;card++) {
      timeLine.add(
        cardAnimation.goto(
          player.table[card].sprite,
          x - moveLeft,
          player.row * 60
        )
      );
      moveLeft -= 60
    }
    let board = this;
    timeLine.add(
      cardAnimation.goto(
        player.table[card].sprite,
        x - moveLeft,
        player.row * 60,
        cardUsed == null ? null : function () {
          battle.addPlayerCard(player,cardUsed);
          board.swithPlayer();
        }
      )
    );
    timeLine.play();
  }
  selectStartHand(player) {
    player.hand = player.popDeck(3);
    player.arrangePlayerHand(null);
  }
}
