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
    scene: [Load,Menu,Story,LEVEL_1,LEVEL_2,Gameover,Ending]
}

let soundConfig = {
    mute: false,
    volume: 0.6,
    rate: 1,
    loop: true,
}

let backConfig = {
    mute: false,
    volume: 0.4,
    rate: 1,
    loop: true,
}
let game = new Phaser.Game(config);
let gameOverStatus = false;
// define keys
let keyW,keyA,keyS,keyENTER,keySPACE,keyD,keyF1,keyF2;

//gameOver Experimental Key
let keyG, keyR; //end game key and restart key

// Set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let MAX_JUMP = 2;

let heartGroup, door, player, enemy, spikesGroup, ghostGroup, orbsGroup;

let healthCheck, currentHealth;

let mirrored = false;