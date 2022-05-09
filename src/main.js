let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu,Load,Gameover,LEVEL_1,LEVEL_2]
}

let game = new Phaser.Game(config);

// define keys
let keyUP,keyLEFT,keyRIGHT,keyENTER;
// Set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
