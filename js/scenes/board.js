class board extends Phaser.Scene {
  constructor() {
    super("FCG-board");

    this.Fields = [];
    this.Battle = new Battle();
    this.currentDepth = 1;
    this.Player1 = null;
    this.Player2 = null;
    this.phase = null;
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
    this.load.spritesheet("phase", "assets/spritesheets/phase.png", {
      frameWidth: 60,
      frameHeight: 30,
    });
    this.load.spritesheet("phases", "assets/spritesheets/phases.png", {
      frameWidth: 173,
      frameHeight: 75,
    });

    this.load.bitmapFont("hud", "assets/hud.png", "assets/hud.fnt");

    this.load.image("cardbase", "assets/spritesheets/cardbase.png");
    this.load.image("back", "assets/spritesheets/back.png");
  }
  create() {
    General.scene = "FCG-board";
    scene = General.getCurrentScene();

    let boardItemSize = 70;

    for (let i = 0; i < 5; i++) {
      this.Fields[i] = [];
      for (let j = 0; j < 2; j++) {
        this.Fields[i][j] = new Field(
          boardItemSize * (i + 2),
          boardItemSize * (j + 2),
          2
        );
      }

      this.Fields[i][2] = new Field(
        boardItemSize * (i + 2),
        boardItemSize * (2 + 2),
        1
      );

      for (let j = 3; j < 5; j++) {
        this.Fields[i][j] = new Field(
          boardItemSize * (i + 2),
          boardItemSize * (j + 2)
        );
      }
    }

    let isPlayerTurn = Phaser.Math.Between(0,1) == 0;
    this.Player1 = new Player(500, 420, 0, true);
    this.Player2 = new EnemyPlayer(60, 60, 1, false);

    const screenCenterX =
      scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY =
      scene.cameras.main.worldView.y + scene.cameras.main.height / 2;

    this.hud = new Hud(
      scene,
      screenCenterX,
      screenCenterY,
      this.Player1,
      this.Player2
    );
    let player1LifeBar = new AutoUpdaterTextComponent(
      scene,
      -(scene.cameras.main.width / 4 - 20),
      -(-scene.cameras.main.height / 4 + 20),
      32,
      this.Player1,
      "hp"
    );

    player1LifeBar.setTint(getTintBySide(0));
    let player2LifeBar = new AutoUpdaterTextComponent(
      scene,
      scene.cameras.main.width / 4 - 20,
      -scene.cameras.main.height / 4 + 20,
      32,
      this.Player2,
      "hp"
    );
    player2LifeBar.setTint(getTintBySide(1));

    this.hud.addItem(player1LifeBar);
    this.hud.addItem(player2LifeBar);

    let phases = this.add.sprite(60,450,"phase");
    this.phase = new Phase(this,120,300);
    phases.setInteractive();
    phases.on("pointerdown", function() {
      this.phase.visible = true;
    },this);

    this.selectStartHand(this.Player1);
    this.selectStartHand(this.Player2);

    let playerTurn = function() {};
    if(!isPlayerTurn) {
      let current = this;
      playerTurn = function() {
        current.switchPlayer(); 
      }
    }
    setTimeout(
      playerTurn, 300
    )
    
  }
  switchPlayer() {
    this.Player1.isAtTurn = !this.Player1.isAtTurn;
    this.Player2.isAtTurn = !this.Player2.isAtTurn;

    this.Player1.hasPlayed = false;
    this.Player2.hasPlayed = false;

    if (this.Player2.isAtTurn) {
      this.doNPCTurn();
    }
  }
  doNPCTurn() {
    this.Player2.doDrawCard(function () {
      let card = scene.Player2.selectCard();
      scene.Player2.useCard(card);
    });
  }
  getPlayerTurn() {
    if (this.Player1.isAtTurn) return this.Player1;
    else return this.Player2;
  }
  update(time, delta) {
    this.hud.update();

    let playerTurn = this.getPlayerTurn();
    if (playerTurn.hasPlayed) {
      this.switchPlayer();
      let battleFunction = function () {
        scene.phase = board.Phase.battle;
        //cardUsed.depth = scene.currentDepth++;
        scene.arrangePlayerTable(playerTurn);
      };

      /*if (playerTurn.isMain()) {
        battleFunction();
      } else {
        //cardUsed.isHidden = false;
        //cardUsed.turn(battleFunction);
      }*/
    }
  }
  arrangePlayerTable(player, cardUsed = null) {
    if (player.table.length == 0) {
      return;
    }
    let battle = this.Battle;
    let x = battle.battlePosition.x;
    let moveLeft = (player.table.length - 1) * 30;
    let card = 0;
    for (; card < player.table.length - 1; card++) {
      player.table[card].move(x - moveLeft, player.row * 60);
      moveLeft -= 60;
    }
    let board = this;
    player.table[card].move(x - moveLeft, player.row * 60, function () {
      if (cardUsed) {
        setTimeout(function () {
          battle.addPlayerCard(player, cardUsed);
          //board.switchPlayer();
        }, 400);
      }
    });
  }
  selectStartHand(player) {
    player.hand = player.popDeck(3);
    player.arrangePlayerHand(null);
  }
  endGame(msg) {
    alert(msg);
    this.phase.end();
  }
}
