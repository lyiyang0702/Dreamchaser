let bgmMusic;
class LEVEL_1 extends Phaser.Scene {
    constructor() {
        super("level_1");
    }

    create() {
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        // set camera
        this.cameras.main.setBounds(0, 0, 2000, 720);
        this.physics.world.setBounds(0, 0, 2000, 800);
        // delete later
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
        this.add.tileSprite(0, 0, 2000, game.config.height, 'tileStructure').setOrigin(0, 0);
        // add a tilemap
        const map = this.add.tilemap("level1_map");
        // add a tileset to the map
        const tileset = map.addTilesetImage("Final_sheet");
        // create tilemap layers
        const groundLayer = map.createLayer("ground", tileset, 0, 0);
        groundLayer.setCollisionByProperty({
            collides: true
        });

        const p1Spawn = map.findObject("Object", obj => obj.name === "P1 Spawn");
        this.add.text(10, 10, 'LEVEL 1', menuConfig);
        //health debug
        currentHealth = 3;
        healthCheck = this.add.text(this.pla, borderPadding * 5, "Health: " + currentHealth, menuConfig);
        //set up player
        player = new Player(this, p1Spawn.x, 0, 'Final_sheet', 94, MAX_JUMP);
        //set up enemy
        enemy = new Enemies(this, game.config.width / 2 - 100, game.config.height / 2 - 100, 'enemy_atlas', 'ghost_left_0001').setScale(0.01);;

        // camera follow character
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        player.create();
        enemy.create();

        //set up dream catcher
        this.dreamCatcher = new Weapons(this, player.x, player.y, 'cat_atlas', 'weapon_normal_0001');
        heartGroup = this.add.group();

        // randomize && add properties later
        let heart = new Items(this, 630, 100, 'heart', 0, 'Heart');
        heart.create();
        heartGroup.add(heart);
        door = new Items(this, 1970, 60, 'door', 0, 'Door');
        door.create();


        //add collider
        this.physics.add.collider(heartGroup, groundLayer);
        this.physics.add.collider(player, door, function () {
            game.scene.start('level_2');
            game.scene.sleep('level_1');
        });
        this.physics.add.collider(player, groundLayer);

        this.physics.add.collider(enemy, groundLayer);

        //heart disappear when player collide with it
        this.physics.add.overlap(player, heartGroup, this.healthCollect);

        bgmMusic = this.sound.add('backMusic', soundConfig);
        bgmMusic.play();

        this.physics.add.overlap(player, enemy, function(){
            player.healthLose();
        }, null, this);

    }

    //collect items
    healthCollect(player, heart) {
        heartGroup.killAndHide(heart);
        heart.body.enable = false;
        if (currentHealth < 3) {
            currentHealth += 1;
        }
        healthCheck.text = "Health: " + currentHealth;
    }

    update() {
        player.update();
        enemy.update();

        this.dreamCatcher.attack(player.x, player.y - player.width - 10);
        //gameOver Trigger (statement is temporarily)
        if (player.y > game.config.height) {
            gameOverStatus = true;
            this.checkGameOver();
        }else if (gameOverStatus) {
            bgmMusic.stop();
            gameOverStatus = false;
            this.scene.restart();
        }

    }

    checkGameOver() {
        bgmMusic.stop();
        game.scene.start('gameover');
        game.scene.sleep('level_1');
    }


}