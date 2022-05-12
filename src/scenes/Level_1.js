class LEVEL_1 extends Phaser.Scene {
    constructor () {
        super ("level_1");
    }

    create() {
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // set camera
        this.cameras.main.setBounds(0, 0, 1800, 720);
        this.physics.world.setBounds(0, 0, 1800, 720);
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
        //set up player
        player = new Player(this, game.config.width/2, game.config.height/2,'cat_atlas','idle_down_0001',MAX_JUMP);
        // camera follow character
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        player.create();
        //this.enemies = new Enemies ( this, game.config.width/2 - 35, game.config.height/2 ,'kirby');
        //this.enemies.create();

        //set up dream catcher
        this.dreamCatcher = new Weapons(this, player.x,player.y,'cat_atlas','weapon_normal_0001');
        groundGroup = this.add.group();
        heartGroup = this.add.group();

        // randomize && add properties later
        let heart = new Items(this, game.config.width/2 + 100, game.config.height/2 + 100,'heart',0,'Heart');
        heart.create();
        heartGroup.add(heart);
        door = new Items(this, 1800 - 100, game.config.height - 100,'door',0,'Door');
        door.create();
        this.createPlatform(35,groundGroup,'ground');

        //add collider
        //this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(player, groundGroup);
        this.physics.add.collider(heartGroup, groundGroup);
        this.physics.add.collider(player, door);
    }
    
    update() {
        player.update();
        this.dreamCatcher.attack(player.x,player.y - player.width - 10);
        this.physics.add.collider(door, player, this.travel());
    }

    // create Platform
    createPlatform(tileSize,Group,texture){
        for (let i = 0; i < 1800; i += tileSize){
            let groundTile = new Ground(this, i, game.config.height - tileSize*2, texture);
            groundTile.create();
            Group.add(groundTile);
        }
    }

    // send to level 2
    travel(){
        //this.scene.start('level_2');
        console.log('test');
    }

}