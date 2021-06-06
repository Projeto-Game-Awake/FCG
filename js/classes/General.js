class General {
    static scene = "";
    static getCurrentScene() {
        //try {
            //console.log(game.scene.getScene("FCG-board"));
            //console.log(game.scene.getScenes());
            return game.scene.getScene(General.scene);
        //} catch {
        //    alert("Erro");
        //}
    }
}