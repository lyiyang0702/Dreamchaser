class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now
        this.load.audio('jump', 'jump.wav');
        this.load.image('door', 'door.png');
        this.load.atlas('animation_atlas', 'animations.png', 'animation_sprites.json');
        this.load.image('jungle', 'jungleBackground.png');
        this.load.image('tileStructure', 'Level1Background.png');
        this.load.spritesheet("Final_sheet", "Final_sheet.png", {
            frameWidth: 50,
            frameHeight: 50
        });
        this.load.tilemapTiledJSON("level1_map", "level1Map.json");    // Tiled JSON file
        this.load.audio('backMusic', 'backgroundMusic.mp3');
        this.load.audio('backstory', 'backstoryAudio.mp3');
    }

    create() {

        // set animations
        // idle left
        this.anims.create({
            key: 'idle_left',
            frames: this.anims.generateFrameNames('animation_atlas', {
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
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'idle_right_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: -1,
        });

        // cat idle left
        this.anims.create({
            key: 'cat_idle_left',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'cat_idle_left_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: -1,
        });

        // cat idle right
        this.anims.create({
            key: 'cat_idle_right',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'cat_idle_right_',
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
            frames: this.anims.generateFrameNames('animation_atlas', {
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
        this.anims.create({
            key: 'weapon_right',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'weapon_right_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 10,
        });

        // cat run left
        this.anims.create({
            key: 'cat_run_left',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'cat_run_left_',
                start: 1,
                end: 11,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 10,
        });

        // cat run right
        this.anims.create({
            key: 'cat_run_right',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'cat_run_right_',
                start: 1,
                end: 11,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 10,
        });


        // cat walk right
        this.anims.create({
            key: 'cat_walk_right',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'cat_walk_right_',
                start: 1,
                end: 14,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 10,
        });

        // cat walk left
        this.anims.create({
            key: 'cat_walk_left',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'cat_walk_left_',
                start: 1,
                end: 14,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 10,
        });


        // jump left
        this.anims.create({
            key: 'jump_left',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'jump_left_',
                start: 1,
                end: 7,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 10,
        });

        // jump right
        this.anims.create({
            key: 'jump_right',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'jump_right_',
                start: 1,
                end: 7,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 10,
        });

        // cat idle right
        this.anims.create({
            key: 'cat_idle_right',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'cat_idle_right_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 10,
        });

        // cat idle left
        this.anims.create({
            key: 'cat_idle_left',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'cat_idle_left_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 10,
        });

        // memory orb
        this.anims.create({
            key: 'memory_orb',
            defaultTextureKey: 'Final_sheet',
            frames: [ 
                { frame: 0 },
                { frame: 1 },
                { frame: 2 },
                { frame: 3 }
            ],
            frameRate: 6,
            repeat: -1
        });
        // ghost
        this.anims.create({
            key: 'ghost',
            defaultTextureKey: 'Final_sheet',
            frames: [ 
                { frame: 6 },
                { frame: 7 }
            ],
            frameRate: 6,
            repeat: -1
        });
        // ...and pass to the next Scene
        this.scene.start('menuScene');
    }
}