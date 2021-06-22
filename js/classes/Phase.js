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
      super(parent, x, y, [popup,preButton,battleButton,posButton,endButton]);

      this.setDisabledAlpha(preButton);
      this.setDisabledAlpha(battleButton);
      this.setDisabledAlpha(posButton);

      popup.setInteractive();
      popup.on("pointerdown", function() {
        this.visible = false;
      },this);

      this.preButton = preButton;
      preButton.setInteractive();
      preButton.on("pointerdown", function() {
        this.visible = false;
      },this);

      this.battleButton = battleButton;
      battleButton.setInteractive();
      battleButton.on("pointerdown", function() {
        if(battleButton.alpha == 1) {
            parent.phase.battle();
            this.setDisabledAlpha(preButton);
            this.setDisabledAlpha(battleButton);
        }
        this.visible = false;
      },this);

      this.posButton = posButton;
      posButton.setInteractive();
      posButton.on("pointerdown", function() {
        this.pos();
        this.visible = false;
      },this);

      endButton.setInteractive();
      endButton.on("pointerdown", function() {
        this.setEnabledAlpha([battleButton,posButton]);
        parent.phase.end();
        parent.phase.draw();
      },this);

      parent.add.existing(this);
      this.parent = parent;
      this.visible = false;
      this.value = 0;
      this.draw();
    }
    setEnabledAlpha(buttons) {
        for(let button in buttons) {
            buttons[button].alpha = 1;
        }
    }
    setDisabledAlpha(button) {
        button.alpha = 0.3;
    }
    draw() {
        this.value = Phase.state.draw;
        if(this.parent.currentDepth > 1) {
            this.setEnabledAlpha([this.battleButton,this.posButton]);
        }
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
        new Battle().round(scene.Player2.board);
    }
    isBattle() {
        return this.value == Phase.state.battle;
    }
    pos() {
        this.value = Phase.state.pos;

        if(this.posButton.alpha == 1) {
            this.setDisabledAlpha(this.preButton);
            this.setDisabledAlpha(this.battleButton);
            this.setDisabledAlpha(this.posButton);
        }
        this.visible = false;
    }
    isPos() {
        return this.value == Phase.state.pos;
    }
    end() {
        this.value = Phase.state.end;
        this.visible = false;
        this.parent.getPlayerTurn().hasPlayed = true;
        this.parent.hasSummoned = false;
    }
    isEnd() {
        return this.value == Phase.state.end;
    }
}