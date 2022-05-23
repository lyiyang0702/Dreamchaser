let bgmMusic;
class LEVEL_1 extends Phaser.Scene {
    constructor() {
        super("level_1");
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
        this.map = this.add.tilemap("level1_map");
        // add a tileset to the map
        this.tileset = this.map.addTilesetImage("Final_sheet");
        // create tilemap layers
        this.groundLayer = this.map.createLayer("ground", this.tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        const p1Spawn = this.map.findObject("Object", obj => obj.name === "P1 Spawn");
        
        // define a render debug so we can see the tilemap's collision bounds
        /* const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.groundLayer.renderDebug(debugGraphics, {
            tileColor: null,    // color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),    // color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)                // color of colliding face edges
        }); */
        
        this.add.text(10, 10, 'LEVEL 1', menuConfig);
        //health debug
        currentHealth = 3;
        healthCheck = this.add.text(this.pla, borderPadding * 5, "Health: " + currentHealth, menuConfig);
        //set up player
        player = new Player(this, p1Spawn.x, 0, 'animation_atlas', 'idle_right_0001', MAX_JUMP);

        // camera follow character
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        player.create();

        //set up dream catcher
        this.dreamCatcher = new Weapons(this, player.x, player.y, 'animation_atlas', 'weapon_right_0001');
        // set up objects
        // heart
        this.heart = this.map.createFromObjects("Object", {
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
            healthCheck.text = "Health: " + currentHealth;
            console.log("Health: " + currentHealth); // HP +1

        })
        // spikes
        this.spikes = this.map.createFromObjects("Object", {
            name: "Spikes",
            key: "Final_sheet",
            frame: 24
        });
        this.physics.world.enable(this.spikes, Phaser.Physics.Arcade.STATIC_BODY);
        this.spikes.map((spikes) => {
            spikes.body.setSize(50,25).setOffset(0,20); 
        });
        spikesGroup = this.add.group(this.spikes);
        this.physics.add.overlap(player, spikesGroup, function() {
            player.healthLose();
        })

        // memeory orbs
        this.orbs= this.map.createFromObjects("Object", {
            name: "Memory orbs",
            key: "Final_sheet",
            frame: 0
        });
        this.physics.world.enable(this.orbs, Phaser.Physics.Arcade.DYNAMIC_BODY);
        orbsGroup = this.add.group(this.orbs);
        orbsGroup.playAnimation('memory_orb');
        // ghost
        this.ghosts= this.map.createFromObjects("Object", {
            name: "Ghost",
            key: "Final_sheet",
            frame: 5
        });
        this.physics.world.enable(this.ghosts, Phaser.Physics.Arcade.DYNAMIC_BODY);
        ghostGroup = this.add.group(this.ghosts);
        ghostGroup.playAnimation('ghost');
        this.physics.add.overlap(player, ghostGroup, function(){
            player.healthLose();
        }, null, this)

        //add collider
        this.physics.add.collider(player, this.groundLayer);

        this.soul = new Items(this, 1950, 125, 'animation_atlas', 'soul_left_0001', 'Ghost'); 
        this.soul.anims.play('soul_left',true);
        this.physics.add.collider(player,this.soul,function(){
            game.scene.start('level_2');
            game.scene.sleep('level_1');
        });

        bgmMusic = this.sound.add('backMusic', soundConfig);
        bgmMusic.play();

    }

    update() {
        player.update();
        this.dreamCatcher.attack(player.x, player.y - player.height + 10);

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