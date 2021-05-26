class Battle {
  constructor() {
    this.cards = [];

    //Garantir que exista uma batalha só
    if (this.constructor.instance) {
      return this.constructor.instance;
    }

    this.constructor.instance = this;

    this.battlePosition = {
      x: 4 * 60,
      y: 4 * 60,
    };
  }

  addPlayerCard(card) {
    this.cards.push(card);
    if (this.cards.length > 1) {
      this.round();
    }
  }

  round() {
    let playerA = this.cards[0];
    let playerB = this.cards[1];
    let dammagedPlayer = playerA;
    let attackerPlayer = playerB;

    if (playerA.stats.speed > playerB.stats.speed) {
      dammagedPlayer = playerB;
      attackerPlayer = playerA;
      this.cards = [];
    }

    dammagedPlayer.stats.hp -= attackerPlayer.stats.attack;
  }
}
