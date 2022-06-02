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
            },
            tileBias: 50
        }
    },
    scene: [Load,Function,Menu,Story,LEVEL_1,LEVEL_2,LEVEL_3,Gameover,Ending, Credit]
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
let keyW,keyA,keyS,keyENTER,keySPACE,keyD,keyQ,keyE,keyX, keyM;

//gameOver Experimental Key
let keyG, keyR; //end game key and restart key


let MAX_JUMP = 2;

let healthCheck, orbNum;

let level;

let curve = new Phaser.Curves.Line(new Phaser.Math.Vector2(100, 0), new Phaser.Math.Vector2(200, 0));

let UICam, player;