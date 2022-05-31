class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = './assets/';
        // take care of all of our asset loading now
        this.load.audio('jump', 'audio/jump.mp3');
        this.load.audio('selectSound', 'audio/selectSound.wav');
        this.load.audio('collectHealth', 'audio/collectHealth.mp3');
        this.load.audio('collectOrbs', 'audio/collectOrbs.mp3');
        this.load.audio('ghostHit', 'audio/ghostHit.mp3');
        this.load.audio('oneStepWalk', 'audio/oneStepWalk.mp3');
        this.load.atlas('animation_atlas', 'img/animations.png', 'json/animation_sprites.json');
        this.load.image('jungle', 'img/jungleBackground.png');
        this.load.image('tileStructure', 'img/Level1Background.png');
        this.load.image('desert','img/desertBackground.png');
        this.load.image('lucy', 'img/MainCharacter.png');
        this.load.spritesheet("Final_sheet", "img/Final_sheet.png", {
            frameWidth: 50,
            frameHeight: 50
        });
        this.load.tilemapTiledJSON("Map", "json/GameMap.json");    // Tiled JSON file
        this.load.audio('backMusic', 'audio/mainSong.m4a');
        this.load.audio('backstory', 'audio/backstoryAudio.mp3');
        this.load.spritesheet('backstoryBack', 'img/BackstoryBackground.png', { frameWidth: 1250, framHeight: 720, startFrame: 0, endFrame: 2 });
        this.load.image('titlePageBackground', 'img/TitlePageBackground.png');
        this.load.image('enter', 'img/enterButton.png');
        this.load.spritesheet('logo', 'img/gameLogo.png', { frameWidth: 919, framHeight: 498, startFrame: 0, endFrame: 3 });
        this.load.image('threeH', 'img/threeHearts.png');
        this.load.image('twoH', 'img/twoHearts.png');
        this.load.image('oneH', 'img/oneHeart.png');
        this.load.image('blackOrb', 'img/blackOrb.png');
        this.load.image('colorOrb', 'img/colorOrb.png');
        this.load.image('gameOverBack', 'img/gameOverBackground.png');

        // load bitmap font
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml');
        this.load.json('dialog', 'json/dialog.json');
        this.load.image('dialogbox', 'img/dialogbox.PNG');
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
            repeat: 10,
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
            repeat: 10,
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

        // soul
        this.anims.create({
            key: 'soul_left',
            frames: this.anims.generateFrameNames('animation_atlas', {
                prefix: 'soul_left_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: -1,
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
                { frame: 5 },
                { frame: 6 }
            ],
            frameRate: 6,
            repeat: -1
        });

        // explosion
        this.anims.create({
            key: 'explosion',
            defaultTextureKey: 'Final_sheet',
            frames: [
                { frame: 13 },
                { frame: 14 },
                { frame: 15 },
                { frame: 16 },
                { frame: 17 },
                { frame: 18 },
                { frame: 19 },
                { frame: 20 },
                { frame: 21 },
                { frame: 22 },
            ],
            frameRate: 16,
        });
        // ...and pass to the next Scene
        this.scene.start('menuScene');
    }

}