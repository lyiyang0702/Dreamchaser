let config = {
    type: Phaser.CANVAS,
    width: 1250,
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
    scene: [Load,Menu,LEVEL_1,LEVEL_2,Gameover]
}

let game = new Phaser.Game(config);

// define keys
let keyUP,keyLEFT,keyRIGHT,keyENTER,keySPACE,keyDOWN;
// Set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let MAX_JUMP = 2;

let groundGroup, heartGroup, door,player;

