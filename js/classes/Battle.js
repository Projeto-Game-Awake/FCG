class Battle {
  constructor() {
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

  addPlayerCard(player, card) {
    this.cards.push(card);

    if (player.board.currentDepth > 1) {
      this.round(player.board);
    }
    if (!player.board.phase.isEnd()) {
      player.board.phase.draw();
    }
  }

  round(board) {
    let total1 = board.Player1.table.length;
    let total2 = board.Player2.table.length;
    let minor = Math.min(total1, total2);
    let firstPlayer = board.Player1;
    let secondPlayer = board.Player2;
    let msg = "";
    try {      
      // Ataca diretamente o líder
      if (total1 != total2) {
        let maxBattle = Math.max(total1, total2);
        if (total1 < total2) {
          msg = this.directAttack(board.Player1, board.Player2, minor, maxBattle);
        } else {
          msg = this.directAttack(board.Player2, board.Player1, minor, maxBattle);
        }
      }
      if (msg != "") {
        board.endGame(msg);
      }
      let firstRemoved = [];
      let secondRemoved = [];
      for (let i = 0; i < minor; i++) {
        if (
          firstPlayer.table[i].stats.speed < secondPlayer.table[i].stats.speed
        ) {
          let temp = firstPlayer;
          firstPlayer = secondPlayer;
          secondPlayer = temp;
        }
        let first = firstPlayer.table[i];
        let second = secondPlayer.table[i];

        second.addHP(-first.stats.attack);
        if (first.stats.speed == second.stats.speed) {
          first.addHP(-second.stats.attack);
        }
        if (second.stats.hp <= 0) {
          secondRemoved.push(second);
        } else if (first.stats.speed != second.stats.speed) {
          first.addHP(-second.stats.attack);
        }
        if (first.stats.hp <= 0) {
          firstRemoved.push(first);
        }
      }
      for(let first in firstRemoved) {
        firstPlayer.retireCard(firstRemoved[first]);
      }
      for(let second in secondRemoved) {
        secondPlayer.retireCard(secondRemoved[second]);
      }
      
      board.arrangePlayerTable(firstPlayer);
      board.arrangePlayerTable(secondPlayer);
    } catch(ex) {
      console.log(ex);
      console.log(firstPlayer.table);
      console.log(secondPlayer.table);
    }
    board.phase.pos();
  }
  directAttack(playerReciver, playerDealer, minor, maxBattle) {
    for (let i = minor; i < maxBattle; i++) {
      playerReciver.calcDamage(playerDealer.table[i]);
    }
    let msg = "";
    if (playerReciver.hp <= 0) {
      playerReciver.hp = 0;
      if (playerDealer.table[0].side == 0) {
        msg = "A Luz prevaleceu!";
      } else {
        msg = "As Sombras prevaleceram!";
      }
    }
    return msg;
  }
}
