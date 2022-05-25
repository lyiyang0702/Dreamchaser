let config = {
    type: Phaser.CANVAS,
    width: 1250,
    height: 750,
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
    scene: [Load,Menu,Story,LEVEL_1,LEVEL_2,LEVEL_3,Gameover,Ending]
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

let hearts,spikes,orbs,ghosts;
let heartGroup, door, player, enemy, spikesGroup, ghostGroup, orbsGroup;

let healthCheck;

let mirrored = false;

let curve = new Phaser.Curves.Line(new Phaser.Math.Vector2(100, 0), new Phaser.Math.Vector2(200, 0));

let menuConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 0
}