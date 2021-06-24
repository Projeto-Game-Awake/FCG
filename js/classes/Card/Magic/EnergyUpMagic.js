class EnergyUpMagic extends CardMagic {
    constructor(parent,x,y) {
        super(parent,x,y,2);
    }
    update(card) {
        card.addHP(1);
    }
}