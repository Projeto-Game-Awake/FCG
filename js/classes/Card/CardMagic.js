class CardMagic extends CardBase {
    constructor(parent,x,y,type) {
        super(parent,x,y,type,2);
    }
    canSelect() {
        if(this.parent.selectedHandCard != null) {
            this.parent.selectedHandCard.y += 20;    
        }
        if(this.parent.Player1.table.length > 0) {
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
}