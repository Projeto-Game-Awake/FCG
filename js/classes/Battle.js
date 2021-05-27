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

  addPlayerCard(player,card) {
    this.cards.push(card);
    if (player.board.currentDepth > 1) {
      this.round(player.board);
    }
  }

  round(board) {
    let total1 = board.Player1.table.length;
    let total2 = board.Player2.table.length;
    let minor = Math.min(total1,total2);
    let firstPlayer = board.Player1;
    let secondPlayer = board.Player2;
    // Ataca diretamente o líder
    if(total1 != total2) {
      let maxBattle = Math.max(total1,total2);
      if(total1 < total2) {
        this.directAttack(board.Player1, board.Player2,minor,maxBattle);
      } else {
        this.directAttack(board.Player2, board.Player1,minor,maxBattle);
      }
    }
    for(let i=0;i<minor;i++) {
      if (firstPlayer.table[i].stats.speed < secondPlayer.table[i].stats.speed) {
        let temp = firstPlayer;
        firstPlayer = secondPlayer;
        secondPlayer = temp;
      }
      let first = firstPlayer.table[i];
      let second = secondPlayer.table[i];
      
      second.stats.hp -= first.stats.attack;
      if (first.stats.speed == second.stats.speed) {
        first.stats.hp -= second.stats.attack;
      }
      if(second.stats.hp <= 0) {
        this.retireCard(secondPlayer,second);
      } else {
        first.stats.hp -= second.stats.attack;
      }
      if(first.stats.hp <= 0) {
        this.retireCard(firstPlayer,first);
      }
    }
    board.arrangePlayerTable(firstPlayer);
    board.arrangePlayerTable(secondPlayer);
  }
  retireCard(player,card) {
    player.table.splice(player.table.indexOf(card), 1)
    let timeLine = scene.tweens.createTimeline();
    timeLine.add(CardAnimations.toRetire(player,card.sprite));
    timeLine.play();
  }
  directAttack(playerReciver, playerDealer, minor, maxBattle) {
    for(let i=minor;i<maxBattle;i++) {
      playerReciver.calcDamage(playerDealer.table[i]);
    }
  }
}
