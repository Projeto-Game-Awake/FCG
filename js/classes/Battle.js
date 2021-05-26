class Battle {
  constructor() {
    this.cards = [];
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

    console.log("A", dammagedPlayer, attackerPlayer);

    dammagedPlayer.stats.hp -= attackerPlayer.stats.attack;

    console.log(dammagedPlayer);
  }
}
