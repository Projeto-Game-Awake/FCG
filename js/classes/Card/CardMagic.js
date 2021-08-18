class CardMagic extends CardBase {
    constructor(parent,x,y,type) {
        super(parent,x,y,type,2);
    }
    doSelect() {
        return false;
    }
    canSelect() {
        if(this.parent.selectedHandCard != null) {
            if(this.parent.selectedHandCard.y < 600) {
                this.parent.selectedHandCard.y += 20;
                this.parent.selectedHandCard == null

                if(this.parent.selectedHandCard = this) {
                    return false;
                }
            }
        }
        if(this.parent.getPlayerTurn().table.length > 0) {
            this.y -= 20;
            this.parent.selectedHandCard = this;
        } else {
            
        }
        return false;
    }
    update() {

    }
    showPopup() {

    }
    use() {

    }
}