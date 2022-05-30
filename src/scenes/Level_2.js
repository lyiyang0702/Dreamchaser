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
        // HP bar
        this.heart1 = this.add.tileSprite(30, 30, 150, 50, 'oneH').setOrigin(0, 0).setScrollFactor(0);
        this.heart2 = this.add.tileSprite(30, 30, 150, 50, 'twoH').setOrigin(0, 0).setScrollFactor(0);
        this.heart3 = this.add.tileSprite(30, 30, 150, 50, 'threeH').setOrigin(0, 0).setScrollFactor(0);

        // Orbs track
        this.bOrb1 = this.add.image(55, 120, 'blackOrb').setScale(0.13).setScrollFactor(0);
        this.bOrb2 = this.add.image(100, 120, 'blackOrb').setScale(0.13).setScrollFactor(0);
        this.bOrb3 = this.add.image(145, 120, 'blackOrb').setScale(0.13).setScrollFactor(0);

        // UI Camera
        UICam = this.cameras.add(0, 0, 2000, 750);
        // set camera
        this.cameras.main.setBounds(0, 0, 2000, 720);
        this.physics.world.setBounds(0, 0, 2000, 850);
        // level text
        this.level = this.add.text(game.config.width / 2, 10, 'LEVEL 2', textConfig).setScrollFactor(0);

        // define scene
        const level_2 = this.scene.get('level_2');
        const load = this.scene.get('functionScene');

        // Initial HP
        this.currentHealth = 3;
        // Initial OrbNum
        orbNum = 0;

        // create tilemap
        // add game background
        this.jungle = this.add.tileSprite(0, 0, 2000, 720, 'jungle').setOrigin(0);
        // add a tilemap
        this.map = this.add.tilemap("Map");
        // add a tileset to the map
        this.tileset = this.map.addTilesetImage("Final_sheet");
        // create tilemap layers
        this.groundLayer = this.map.createLayer("ground2", this.tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        //set up player
        const p2Spawn = this.map.findObject("Object2", obj => obj.name === "P2 Spawn");
        player = new Player(this, p2Spawn.x, p2Spawn.y, 'animation_atlas', 'idle_right_0001', MAX_JUMP).setOrigin(0, 0);

        // camera follow character
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        player.create();
        this.cameras.main.setZoom(1.5);

        //set up dream catcher
        this.dreamCatcher = new Weapons(this, player.x, player.y, 'animation_atlas', 'weapon_right_0001');

        // set up objects
        // heart
        load.mapObject(this.heartGroup, this.hearts, 'Heart', 4, this.map, 'Object2', level_2, UICam);
        // spikes
        load.mapObject(this.spikesGroup, this.spikes, 'Spikes', 30, this.map, 'Object2', level_2, UICam);
        // memeory orbs
        load.mapObject(this.orbsGroup,this.orbs, 'Memory orbs', 0, this.map, 'Object2', level_2, UICam);
        // ghost
        load.mapObject(this.ghostGroup, this.ghosts, 'Ghost', 5, this.map, 'Object2', level_2, UICam);

        // add collider
        this.physics.add.collider(player, this.groundLayer);
        // shift to next level
        load.addSoul(level_2, 1950, 50, 'level_3', 'level_2', UICam);
        // main camera
        this.cameras.main.ignore([this.heart1, this.heart2, this.heart3, this.bOrb1, this.bOrb2, this.bOrb3, this.level]);
        // UI camera
        UICam.ignore([player, this.dreamCatcher, this.groundLayer, this.jungle]);
    }

    update() {
        if (!gameOverStatus) {
            this.modeShift(player, UICam);
            player.update();
            this.dreamCatcher.attack(player.x, player.y - player.height + 40);
            if (keyW.isDown) {
                let jumpSound = this.sound.add('jump', { loop: false });
                if (player.body.blocked.down) {
                    jumpSound.play();
                }
            }
            // HP Bar update
            if (this.currentHealth == 3) {
                this.heart3.visible = true;
            } else if (this.currentHealth == 2) {
                this.heart3.visible = false;
                this.heart2.visible = true;
            } else if (this.currentHealth == 1) {
                this.heart1.visible = true;
                this.heart3.visible = false;
                this.heart2.visible = false;
            } else if (this.currentHealth == 0) {
                this.heart3.visible = false;
                this.heart2.visible = false;
                this.heart1.visible = false;
            }
            // orbs update
            if (orbNum == 1) {
                this.add.image(55, 120, 'colorOrb').setScale(0.13).setScrollFactor(0);
            } else if (orbNum == 2) {
                this.add.image(100, 120, 'colorOrb').setScale(0.13).setScrollFactor(0);
            } else if (orbNum == 3) {
                this.add.image(145, 120, 'colorOrb').setScale(0.13).setScrollFactor(0);
            }
        }

        //gameOver Trigger
        if (player.y > game.config.height || this.currentHealth == 0) {
            gameOverStatus = true;
            this.scene.stop("level_2");
            this.scene.start("gameover");
        } else if (gameOverStatus) {
            gameOverStatus = false;
            this.scene.restart();
        }

    }

    modeShift(player, Camera) {
        if (keyF1.isDown || keyF2.isDown) {
            // temporarily hide player
            player.alpha = 0;
            // create explosion at player's position
            let boom = this.add.sprite(player.x, player.y, 'Final_sheet', 10).setOrigin(0, 0);
            Camera.ignore(boom);
            boom.anims.play('explosion');
            boom.on('animationcomplete', () => {
                player.alpha = 1;
                boom.destroy();
            });
        }
    }
}