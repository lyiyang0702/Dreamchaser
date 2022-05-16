class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now
        this.load.audio('jump', 'jump.wav');
        this.load.image('cat', 'MainCharacter.png');
        this.load.image('ground', 'ground.png');
        this.load.image ('heart','heart.png');
        this.load.image('bg','TempBg.png');
        this.load.image('door','door.png');
        this.load.atlas('cat_atlas', 'Spritesheet.png', 'sprites.json');
        this.load.atlas('enemy_atlas', 'ghost_left.png', 'ghostLeftMap.json');
        this.load.image('jungle', 'jungleBackground.png');
        this.load.image('tileStructure', 'Level1Background.png');
        this.load.image('ghost_left', 'arrowKey.png');
        this.load.image('White_Tile', 'level1SingleTile.png');
        this.load.tilemapTiledJSON('map', 'Level1TileMap.json');
        this.load.audio('backMusic', 'backgroundMusic.mp3');
    }

    create() {
        
        // set animations
        // idle left
        this.anims.create({
            key: 'idle_left',
            frames: this.anims.generateFrameNames('cat_atlas', {
                prefix: 'idle_left_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: -1,
        });
        // idle right
        this.anims.create({
            key: 'idle_right',
            frames: this.anims.generateFrameNames('cat_atlas', {
                prefix: 'idle_right_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: -1,
        });
        //idle down
        this.anims.create({
            key: 'idle_down',
            frames: this.anims.generateFrameNames('cat_atlas', {
                prefix: 'idle_down_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: -1,
        });
        // dreamcatcher
        let dconfig = {
            key: 'dreamCatcher',
            frames: this.anims.generateFrameNames('cat_atlas', {
                prefix: 'weapon_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8, 
            repeat: 10, 
        }
        this.anims.create(dconfig);
        // enemy
        let econfig = {
            key: 'enemy',
            frames: this.anims.generateFrameNames('enemy_atlas', {
                prefix: 'ghost_left_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8, 
            repeat: 10, 
        }
        this.anims.create(econfig);
        // ...and pass to the next Scene
        this.scene.start('menuScene');
    }
}