class LEVEL_1 extends Phaser.Scene {
    constructor () {
        super ("level_1");
    }
    preload() {
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now
        this.load.image('kirby', 'square kirby.png');
        this.load.image('cat', 'MainCharacter.png');
        this.load.image('ground', 'ground.png');
    }

    create() {
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
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
        //player
        this.player = new Player(this, game.config.width/2, game.config.height/2,'cat');
        //this.enemies = new Enemies ( this, game.config.width/2 - 35, game.config.height/2 ,'kirby');
        //this.enemies.create();
        this.player.create();
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += 35) {
            let groundTile = new Ground(this, i, game.config.height - 35,'ground');
            groundTile.create();
            this.ground.add(groundTile);
        }
        this.physics.add.collider(this.player, this.ground);
        //this.physics.add.collider(this.enemies, this.ground);
    }
    
    update() {
        this.player.move();
    }


}