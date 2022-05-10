class LEVEL_1 extends Phaser.Scene {
    constructor () {
        super ("level_1");
    }
    preload() {
        // try to load in load.js but failed
        // need help
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now
        this.load.image('kirby', 'square kirby.png');
        this.load.image('cat', 'MainCharacter.png');
        this.load.image('ground', 'ground.png');
        this.load.image ('heart','heart.png');
        this.load.atlas('cat_atlas', 'Spritesheet.png', 'sprites.json');
    }

    create() {
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // delete later
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text (game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'LEVEL 1',menuConfig).setOrigin(0.5);

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
            //repeat: -1,
            hideOnComplete: true
        }
        this.anims.create(dconfig);
        //set up player
        this.player = new Player(this, game.config.width/2, game.config.height/2,'cat_atlas','idle_down_0001');
        //this.enemies = new Enemies ( this, game.config.width/2 - 35, game.config.height/2 ,'kirby');
        //this.enemies.create();
        this.dreamCatcher = new Weapons(this, this.player.x,this.player.y,'kirby');
        this.player.create();
        this.ground = this.add.group();
        this.hearts = this.add.group();

        // randomize && add properties later
        let heart = new Items(this, game.config.width/2 + 100, game.config.height/2 + 100,'heart');
        heart.create();
        this.hearts.add(heart);
        this.createPlatform(35,this.ground,'ground');

        //add collider
        //this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.hearts, this.ground);
    }
    
    update() {
        this.player.update();
        if (keyLEFT.isDown){
            this.dreamCatcher.attack(this.player.x - this.player.width,this.player.y);
        }
        else if (keyRIGHT.isDown){
            this.dreamCatcher.attack(this.player.x + this.player.width,this.player.y);
        }
    }

    // create Platform
    createPlatform(tileSize,Group,texture){
        for (let i = 0; i < game.config.width; i += tileSize){
            let groundTile = new Ground(this, i, game.config.height - tileSize*2, texture);
            groundTile.create();
            Group.add(groundTile);
        }
    }

}