class Phase extends Phaser.GameObjects.Container {
    static state = {
        draw: 0,
        pre: 1,
        battle: 2,
        pos: 3,
        end: 4,
    };
    
    constructor(parent, x, y) {
      let popup = new Phaser.GameObjects.Rectangle(parent,0,0,1000,300,0xffffff);
      let preButton = new Phaser.GameObjects.Sprite(parent,10,10,"phases",0);
      let battleButton = new Phaser.GameObjects.Sprite(parent,210,10,"phases",1);
      let posButton = new Phaser.GameObjects.Sprite(parent,410,10,"phases",2);
      let endButton = new Phaser.GameObjects.Sprite(parent,210,100,"phases",3);
      super(parent, x, y, [popup,preButton, battleButton, posButton, endButton]);
      preButton.setInteractive();
      preButton.on("pointerdown", function() {
        this.visible = false;
      },this);

      battleButton.setInteractive();
      battleButton.on("pointerdown", function() {
        parent.phase.battle();
        this.visible = false;
      },this);

      posButton.setInteractive();
      posButton.on("pointerdown", function() {
        parent.phase.pos();
        this.visible = false;
      },this);

      endButton.setInteractive();
      endButton.on("pointerdown", function() {
        parent.phase.draw();
        this.visible = false;
        parent.getPlayerTurn().hasPlayed = true;
      },this);

      parent.add.existing(this);
      this.parent = parent;
      this.visible = false;
      this.draw();
    }
    draw() {
        this.value = Phase.state.draw;
    }
    isDraw() {
        return this.value == Phase.state.draw;
    }
    pre() {
        this.value = Phase.state.pre;
    }
    isPre() {
        return this.value == Phase.state.pre;
    }
    battle() {
        this.value = Phase.state.battle;
    }
    isBattle() {
        return this.value == Phase.state.battle;
    }
    pos() {
        this.value = Phase.state.pos;
    }
    isPos() {
        return this.value == Phase.state.pos;
    }
    end() {
        this.value = Phase.state.end;
    }
    isEnd() {
        return this.value == Phase.state.end;
    }
}