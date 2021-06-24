class VibrationUpMagic extends CardMagic {
    constructor(parent,x,y) {
        super(parent,x,y,1);
    }
    update(card) {
        card.addAttack(1);
    }
}