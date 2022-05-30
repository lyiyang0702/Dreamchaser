let config = {
    type: Phaser.CANVAS,
    width: 1250,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
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
    volume: 0.3,
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
let heartGroup, player, spikesGroup, ghostGroup, orbsGroup;

let healthCheck, orbNum;

let mirrored = false;

let curve = new Phaser.Curves.Line(new Phaser.Math.Vector2(100, 0), new Phaser.Math.Vector2(200, 0));

let textConfig = {
    fontFamily: 'OPTICopperplate',
    fontSize: '30px',
    color: '#FFFF00',
    stroke: '#0D2C37',
    strokeThickness: 5,
    padding: {
        top: 20,
        bottom: 2,
    },
    fixedWidth: 0
}

let UICam;