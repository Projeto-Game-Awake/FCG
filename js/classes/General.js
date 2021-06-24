class General {
    static scene = "";
    static getCurrentScene() {
        return game.scene.getScene(General.scene);
    }
}