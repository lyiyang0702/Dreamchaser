class LEVEL_2 extends Phaser.Scene {
    constructor () {
        super ("level_2");
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
        this.jungle = this.add.tileSprite(0, 0, 2000, game.config.height, 'jungle').setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*5, 'LEVEL 2',menuConfig).setOrigin(0.5);
        player = new Player(this, game.config.width/2, game.config.height/2,'cat_atlas', 'idle_down_0001', MAX_JUMP);
        enemy = new Enemies(this, game.config.width/2 - 100, game.config.height/2,'ghost_left',0).setOrigin(0, 0);;
        player.create();
        enemy.create();

        // camera follow character
        this.cameras.main.startFollow(player, true, 0.05, 0.05);

        //health debug
        healthCheck = this.add.text(borderPadding*10, borderPadding*5, "Health: " + currentHealth, menuConfig);
    
        // randomize && add properties later
        let heart = new Items(this, game.config.width / 2 + 100, game.config.height / 2 + 100, 'heart', 0, 'Heart');

        groundGroup = this.add.group();
        heartGroup = this.add.group();
        heart.create();
        heartGroup.add(heart);
        door = new Items(this, 1800 - 100, game.config.height - 100, 'door', 0, 'Door');
        door.create();
        this.createPlatform(35, groundGroup, 'ground');

        //collider
        this.physics.add.collider(player, groundGroup);
        this.physics.add.collider(heartGroup, groundGroup);
        this.physics.add.collider(enemy, groundGroup);
        //heart disappear when player collide with it
        this.physics.add.overlap(player, heartGroup, this.healthCollect);
        this.physics.add.overlap(player, enemy, this.healthLose);
        
    }

    //collect items
    healthCollect(player, heart){
        heartGroup.killAndHide(heart);
        heart.body.enable = false;
        if(currentHealth < 3){
            currentHealth += 1;
        }
        healthCheck.text = "Health: " + currentHealth;
        console.log("Health: " + currentHealth);
    }

    healthLose(){
        //heartGroup.destory(enemy);
        if(currentHealth > 0){
            currentHealth -= 1;
        }
        healthCheck.text = "Health: " + currentHealth;
        console.log("Health: " + currentHealth);
    }

    
    update() {
        player.update();
    }

    // create Platform
    createPlatform(tileSize, Group, texture) {
        for (let i = 0; i < 1800; i += tileSize) {
            let groundTile = new Ground(this, i, game.config.height - tileSize * 2, texture);
            groundTile.create();
            Group.add(groundTile);
        }
    }


}