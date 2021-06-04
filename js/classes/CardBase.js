class CardBase extends Phaser.GameObjects.Container {
  constructor(parent, x, y, type, side) {
    let stats = getCardStatsByTypeAndSide(type, side);
    let tintColor = getTintBySide(side);

    let cardImage = new Phaser.GameObjects.Sprite(
      parent,
      0,
      0,
      "cardbase"
    ).setTint(tintColor);

    let backImage = new Phaser.GameObjects.Sprite(parent, 0, 0, "back").setTint(
      tintColor
    );

    let statPosByType = {
      hp: {
        x: -21,
        y: cardImage.height / 2 - 42,
        size: 16,
      },
      attack: {
        x: -9,
        y: cardImage.height / 2 - 42,
        size: 16,
      },
      speed: {
        x: 10,
        y: cardImage.height / 2 - 42,
        size: 16,
      },
      name: {
        x: -cardImage.width / 2,
        y: cardImage.height / 2 - 28,
        size: 10,
      },
    };

    let statsItems = Object.keys(stats);
    let statsValues = Object.values(stats);

    super(parent, x, y, [cardImage, backImage]);

    let statTexts = [];
    this.statTexts = statTexts;

    for (let index = 0; index < statsItems.length; index++) {
      const element = statsItems[index];

      let statText = new Phaser.GameObjects.BitmapText(
        parent,
        statPosByType[element].x,
        statPosByType[element].y,
        "hud",
        statsValues[index],
        statPosByType[element].size,
        Phaser.GameObjects.BitmapText.ALIGN_CENTER
      );
      this.statTexts.push(statText);

      this.add(statText);

      this.isShowingFace = true;
    }

    this.cardImage = cardImage;
    this.backImage = backImage;
    this.parent = parent;
    this.stats = stats;
    this.parent.add.existing(this);

    this.setInteractive(
      new Phaser.Geom.Circle(0, 0, 60),
      Phaser.Geom.Circle.Contains
    );

    this.visible = false;
  }

  registerClick(callback) {
    card.on("pointerup", callback);
  }

  showBack() {
    this.isShowingFace = false;
    this.visible = true;
    this.cardImage.visible = false;
    this.backImage.visible = true;

    this.statTexts.forEach((element) => {
      element.visible = false;
    });
  }
  showFront() {
    this.isShowingFace = true;
    this.visible = true;
    this.cardImage.visible = true;
    this.backImage.visible = false;
    this.statTexts.forEach((element) => {
      element.visible = true;
    });
  }

  move(x, y, callback) {
    let timeLine = this.parent.tweens.createTimeline();
    timeLine.add(CardAnimations.goto(this, x, y, callback));

    timeLine.play();
  }

  turn(callback) {
    let card = this;
    let timeLine = this.parent.tweens.createTimeline();
    timeLine.add(CardAnimations.startFlip(card, card.x, card.y));
    timeLine.add(
      CardAnimations.endFlip(card, card.x, card.y, function () {
        if (card.isShowingFace) {
          card.showBack();
        } else {
          card.showFront();
        }
        if (callback) {
          callback();
        }
      })
    );
    timeLine.play();
  }
}
