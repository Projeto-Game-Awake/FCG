class ReturnMagic extends CardMagic {
    constructor(parent,x,y) {
        super(parent,x,y,0);
    }
    canSelect() {
        if(this.parent.selectedHandCard != null) {
            if(this.parent.selectedHandCard.y < 600) {
                this.parent.selectedHandCard.y += 20;
                this.parent.selectedHandCard = null;

                if(this.parent.selectedHandCard = this) {
                    return false;
                }
            }
        }
        this.canUse();  
        return false;
    }
    canUse() { 
        let retireCards = this.parent.getPlayerTurn().retire.cards;
        for(let card in retireCards) {
            if(!(retireCards[card] instanceof CardMagic)) {
                let player = this.parent.getPlayerTurn();
                if(player instanceof Player) {
                    this.showPopup();
                }
                return true;
            }
        }
        return false;
    }
    use() {
        let retireCards = this.parent.getPlayerTurn().retire.cards;
        for(let card in retireCards) {
            if(!(retireCards[card] instanceof CardMagic)) {
                this.update(retireCards[card]);
            }
        }
    }
    showPopup() {
        let retireCards = this.parent.getPlayerTurn().retire.cards;
        this.y -= 20;
        this.parent.selectedHandCard = this;
        this.parent.scene.launch("returnlist", {
            cards: retireCards,
            player: this.parent.Player1
        });
    }
    update(card) {
        let player = this.parent.getPlayerTurn();
        player.retire.cards.splice(player.retire.cards.indexOf(card),1);
        player.table.push(card);
        card.reset();
        player.board.arrangePlayerTable(player);
    }
}