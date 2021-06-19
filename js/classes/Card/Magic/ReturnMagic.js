class ReturnMagic extends CardMagic {
    constructor(parent,x,y) {
        super(parent,x,y,0);
        this.popup = new RetireSummonCards(this.parent,120,150);
    }
    canSelect() {
        if(this.parent.selectedHandCard != null) {
            this.parent.selectedHandCard.y += 20;
        }
        let retireCards = this.parent.Player1.retire.cards;
        for(let card in retireCards) {
            if(!(retireCards[card] instanceof CardMagic)) {
                this.y -= 20;
                this.parent.selectedHandCard = this;
                this.popup.show(retireCards);
                this.popup.visible = true;
                break;
            }
        }
        return false;
    }
    update(card) {
        let player = this.parent.getPlayerTurn();
        player.retire.cards.splice(player.retire.cards.indexOf(card),1);
        player.table.push(card);
        player.board.arrangePlayerTable(player);
    }
}