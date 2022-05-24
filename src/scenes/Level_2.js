class LEVEL_2 extends Phaser.Scene {
    constructor() {
        super("level_2");
    }

    create() {
        // define keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        keyF1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F1);
        keyF2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F2);

        // set camera
        this.cameras.main.setBounds(0, 0, 2000, 750);
        this.physics.world.setBounds(0, 0, 2000, 850);

        //config
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
        this.jungle = this.add.tileSprite(0, 0, 2000, game.config.height, 'jungle').setOrigin(0, 0);
        // add a tilemap
        this.map = this.add.tilemap("Map");
        // add a tileset to the map
        this.tileset = this.map.addTilesetImage("Final_sheet");
        // create tilemap layers
        this.groundLayer = this.map.createLayer("ground2", this.tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({
            collides: true
        });
        const p2Spawn = this.map.findObject("Object2", obj => obj.name === "P2 Spawn");
        this.add.text(10, 10, 'LEVEL 2', menuConfig).setScrollFactor(0);
        currentHealth = 3;
        //set up player
        player = new Player(this, p2Spawn.x, p2Spawn.y, 'animation_atlas', 'idle_right_0001', MAX_JUMP).setOrigin(0, 0);

        // camera follow character
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        player.create();

        //set up dream catcher
        this.dreamCatcher = new Weapons(this, player.x, player.y, 'animation_atlas', 'weapon_right_0001');
        // set up objects
        // heart
        this.heart = this.map.createFromObjects("Object2", {
            name: "Heart",
            key: "Final_sheet",
            frame: 4
        });
        this.physics.world.enable(this.heart, Phaser.Physics.Arcade.STATIC_BODY);
        heartGroup = this.add.group(this.heart);
        this.physics.add.overlap(player, heartGroup, (obj1, obj2) => {
            obj2.destroy(); // remove heart
            if (currentHealth < 3) {
                currentHealth += 1;
            }
            console.log("Health: " + currentHealth); // HP +1

        })
        // spikes
        this.spikes = this.map.createFromObjects("Object2", {
            name: "Spikes",
            key: "Final_sheet",
            frame: 24
        });
        this.physics.world.enable(this.spikes, Phaser.Physics.Arcade.STATIC_BODY);
        this.spikes.map((spikes) => {
            spikes.body.setSize(44,20).setOffset(2,28); 
        });
        spikesGroup = this.add.group(this.spikes);
        this.physics.add.overlap(player, spikesGroup, function() {
            player.healthLose();
        })

        // memeory orbs
        this.orbs= this.map.createFromObjects("Object2", {
            name: "Memory orbs",
            key: "Final_sheet",
            frame: 0
        });
        this.physics.world.enable(this.orbs, Phaser.Physics.Arcade.DYNAMIC_BODY);
        this.orbs.map((orbs) => {
            orbs.body.setCircle(15).setOffset(10); 
        });
        orbsGroup = this.add.group(this.orbs);
        orbsGroup.playAnimation('memory_orb');
        this.obsNum = 0;
        this.obsCheck = this.add.text(this.pla, borderPadding * 6, "Obs: " + this.obsNum, menuConfig).setScrollFactor(0);
        this.physics.add.overlap(this.dreamCatcher, orbsGroup, (obj1, obj2) => {
            obj2.anims.play('explosion');
            this.obsCollected(obj2);
        });

        // ghost
        this.ghosts = this.map.createFromObjects("Object2", {
            name: "Ghost",
            key: "Final_sheet",
            frame: 5
        });
        ghostGroup = this.add.group(this.ghosts);
        ghostGroup.setVisible(false);
        this.groupAddpath(ghostGroup,curve,5);
        // this.physics.world.enable(this.ghosts, Phaser.Physics.Arcade.DYNAMIC_BODY);
        // ghostGroup = this.add.group(this.ghosts);
        // ghostGroup.playAnimation('ghost');
        // this.physics.add.overlap(player, ghostGroup, function(){
        //     player.healthLose();
        // }, null, this)

        //add collider
        this.physics.add.collider(player, this.groundLayer);

        this.soul = new Items(this, 1950, 100, 'animation_atlas', 'soul_left_0001', 'Ghost'); 
        this.soul.anims.play('soul_left',true);
        this.physics.add.collider(player,this.soul,function(){
            game.scene.start('level_3');
            game.scene.sleep('level_2');
        });

        bgmMusic = this.sound.add('backMusic', soundConfig);
        bgmMusic.play();
        /* this.heart1 = new Items(this, 50, 50, 'Final_sheet', 4, 'Heart'); 
        this.heart2 = new Items(this, 100, 50, 'Final_sheet', 4, 'Heart');
        this.heart3 = new Items(this, 150, 50, 'Final_sheet', 4, 'Heart'); */
        heart1 = this.add.tileSprite(30, 30, 150, 50, 'oneH').setOrigin(0, 0).setScrollFactor(0);;
        heart2 = this.add.tileSprite(30, 30, 150, 50, 'twoH').setOrigin(0, 0).setScrollFactor(0);;
        heart3 = this.add.tileSprite(30, 30, 150, 50, 'threeH').setOrigin(0, 0).setScrollFactor(0);;

    }

    //collect items
    healthCollect(player, heart) {
        //remove heart after collected
        heartGroup.killAndHide(heart);
        heart.body.enable = false;
        //update num
        if (currentHealth < 3) {
            currentHealth += 1;
        }
        //debug output for health number
        healthCheck.text = "Health: " + currentHealth;
        console.log("Health: " + currentHealth);
    }

    healthLose() {
        //heartGroup.destory(enemy);
        //update num
        if (currentHealth > 0) {
            currentHealth -= 1;
        }
        //debug output for health number
        healthCheck.text = "Health: " + currentHealth;
        console.log("Health: " + currentHealth);
    }


    update() {
        player.update();
        this.dreamCatcher.attack(player.x, player.y - player.height + 40);
        if(currentHealth == 3) {
            heart3.visible = true;
        } else if(currentHealth == 2) {
            heart3.visible = false;
            heart2.visible = true;
        } else if(currentHealth == 1) {
            heart1.visible = true;
            heart3.visible = false;
            heart2.visible = false;
        } else if(currentHealth == 0) {
            heart3.visible = false;
            heart2.visible = false;
            heart1.visible = false;
        }
        //gameOver Trigger (statement is temporarily)
        if (player.y > game.config.height || currentHealth == 0) {
            gameOverStatus = true;
            this.checkGameOver();
        }else if (gameOverStatus) {
            bgmMusic.stop();
            gameOverStatus = false;
            this.scene.restart();
        }

        this.ghosts.x += this.ghostSpeed;

    }

    checkGameOver() {
        bgmMusic.stop();
        game.scene.start('gameover');
        game.scene.sleep('level_2');
    }

    changeDirection(enemy){
        console.log("enemy hit heart");
        //when facing right
        if(enemy.body.blocked.right){       
            enemy.body.setVelocityX(-100);
            this.ghostSpeed = -1;
            this.ghostMirrored = false;
            if(this.ghostMirrored == false){
                console.log("mirrored changed to false");
            }else{
                console.log("false");
            }
                
        }else if(enemy.body.blocked.left){

            enemy.body.setVelocityX(100);
            this.ghostSpeed = 1;
            this.ghostMirrored = true;
            if(this.ghostMirrored == true){
                console.log("mirrored changed to true");
            }else{
                console.log("false");
            }
        }
    }

    obsCollected(obj2){
        obj2.destroy();
        this.obsNum += 1;
        this.obsCheck.text = "Obs: " + this.obsNum;
    }

    groupAddpath (group,path,frame){
        for (var i = 0; i < group.children.entries.length; i++) {
            var mover = this.add.follower(path, group.children.entries[i].x, group.children.entries[i].y, group.children.entries[i].texture.key,frame).setScale(1.5);
            mover.anims.play('ghost');
            this.physics.world.enable(mover, Phaser.Physics.Arcade.DYNAMIC_BODY);
            this.physics.add.overlap(player, mover, function(){
                player.healthLose();
            }, null, this)
            mover.body.setCircle (15).setOffset(10,10);
            mover.startFollow({
                duration: 5000,
                yoyo: true,
                repeat: -1,
                rotateToPath: false,
                rotationOffset: 360
            });
          }
    }


}