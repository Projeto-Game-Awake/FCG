class board extends Phaser.Scene {
  constructor() {
    super("main");

    this.Fields = [];
    this.Battle = new Battle();
    this.currentDepth = 1;
    this.Player1 = null;
    this.Player2 = null;
    this.phase = null;
    this.selectedHandCard = null;
    this.hasSummoned = false;
    this.boardScale = 0.7;
  }
  preload() {
    this.load.spritesheet("decks", "assets/spritesheets/decks.png", {
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
    this.load.image("field", "assets/spritesheets/field.png");
  }

  drawBoard(centerX = 0, centerY = 0) {
    let boardItemSizeX = 50;
    let boardItemSizeY = 94;
    let deltaX = 15;
    let deltaY = 20;
    let scale = this.boardScale;

    for (let i = 0; i < 5; i++) {
      this.Fields[i] = [];
      for (let j = 0; j < 2; j++) {
        this.Fields[i][j] = new Field(
          scene,
          centerX + (boardItemSizeX + deltaX) * (i + 2) * scale,
          centerY + (boardItemSizeY + deltaY) * (j + 2) * scale,
          2,
          scale
        );
      }

      this.Fields[i][2] = new Field(
        scene,
        centerX + (boardItemSizeX + deltaX) * (i + 2) * scale,
        centerY + (boardItemSizeY + deltaY) * (2 + 2) * scale,
        1,
        scale
      );

      for (let j = 3; j < 5; j++) {
        this.Fields[i][j] = new Field(
          scene,
          centerX + (boardItemSizeX + deltaX) * (i + 2) * scale,
          centerY + (boardItemSizeY + deltaY) * (j + 2) * scale,
          0,
          scale
        );
      }
    }
  }

  drawHUD() {
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
      -(scene.cameras.main.width / 4 - 8),
      -(-scene.cameras.main.height / 4 + 20),
      32,
      this.Player1,
      "hp"
    );

    player1LifeBar.setTint(getTintBySide(0));
    let player2LifeBar = new AutoUpdaterTextComponent(
      scene,
      scene.cameras.main.width / 4 - 28,
      -scene.cameras.main.height / 4 + 20,
      32,
      this.Player2,
      "hp"
    );
    player2LifeBar.setTint(getTintBySide(1));

    this.hud.addItem(player1LifeBar);
    this.hud.addItem(player2LifeBar);
  }
  create() {
    General.scene = "main";
    scene = General.getCurrentScene();
    this.drawBoard(100, 10);

    let isPlayerTurn = Phaser.Math.Between(0, 1) >= 0;
    this.Player1 = new Player(500, 420, 0, true);
    this.Player2 = new EnemyPlayer(60, 60, 1, false);

    this.drawHUD();

    let phases = this.add.sprite(60, 450, "phase");
    this.phase = new Phase(this, 120, 300);
    phases.setInteractive();
    phases.on(
      "pointerdown",
      function () {
        if (!this.phase.isDraw()) {
          this.children.bringToTop(this.phase);
          this.phase.visible = true;
        }
      },
      this
    );

    this.selectStartHand(this.Player1);
    this.selectStartHand(this.Player2);

    let playerTurn = function () {};
    if (!isPlayerTurn) {
      let current = this;
      playerTurn = function () {
        current.switchPlayer();
      };
    }
    setTimeout(playerTurn, 300);
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
    let p2 = this.Player2;
    p2.doDrawCard(function () {
      let card = p2.selectCard();
      for(let i=0;i<p2.stack.length;i++) {
        p2.useCard(p2.stack[i], function () {});
      }
      p2.useCard(card, function () {
        if (p2.board.currentDepth > 1) {
          p2.board.phase.battle();
        }

        p2.board.switchPlayer();
        p2.board.phase.draw();
      });
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
      scene.currentDepth++;
      setTimeout(function() {
        scene.switchPlayer();
      }, 1);
    }
  }
  arrangePlayerTable(player, callback) {
    if (player.table.length == 0) {
      return;
    }
    let battle = this.Battle;
    let x = battle.battlePosition.x;
    let moveLeft = (player.table.length - 1) * 30;
    let card = 0;
    for (; card < player.table.length - 1; card++) {
      player.table[card].move(x - moveLeft, player.row * 60, this.boardScale);
      moveLeft -= 60;
    }
    let board = this;
    player.table[card].move(
      x - moveLeft,
      player.row * 60,
      this.boardScale,
      callback
    );
  }
  selectStartHand(player) {
    player.hand = player.popDeck(5);
    player.arrangePlayerHand(null);
  }
  endGame(msg) {
    alert(msg);
    this.phase.end();
  }

  createWindow(func)
  {
      var x = Phaser.Math.Between(400, 600);
      var y = Phaser.Math.Between(64, 128);

      var handle = 'returnCard';

      var win = this.add.zone(x, y, func.WIDTH, func.HEIGHT).setInteractive().setOrigin(0);

      var demo = new func(handle, win);

      try {
        let s = this.scene.add(handle, demo, true);
        this.scene.bringToTop(s);
      } catch {

      }
  }

  resize (width, height)
  {
      if (width === undefined) { width = this.game.config.width; }
      if (height === undefined) { height = this.game.config.height; }

      this.cameras.resize(width, height);
  }
}
