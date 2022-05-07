let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scene: [Menu,Gameover,LEVEL_1,LEVEL_2]
}

let game = new Phaser.Game(config);
