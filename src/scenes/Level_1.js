let bgmMusic;
let heart1, heart2, heart3;
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
        this.cameras.main.setBounds(0, 0, 2000, 750);
        this.physics.world.setBounds(0, 0, 2000, 800);
        // define scene
        const level_1 = this.scene.get('level_1');
        const load = this.scene.get('loadScene');
        // Initial HP
        this.currentHealth = 3;
        // delete later
        this.add.text(10, 10, 'LEVEL 1', menuConfig).setScrollFactor(0);

        // create tilemap
        // add game background
        this.add.tileSprite(0, 0, 2000, game.config.height, 'tileStructure').setOrigin(0);
        // add a tilemap
        this.map = this.add.tilemap("Map");
        // add a tileset to the map
        this.tileset = this.map.addTilesetImage("Final_sheet");
        // create tilemap layers
        this.groundLayer = this.map.createLayer("ground", this.tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        //set up player
        const p1Spawn = this.map.findObject("Object", obj => obj.name === "P1 Spawn");
        player = new Player(this, p1Spawn.x, 0, 'animation_atlas', 'idle_right_0001', MAX_JUMP).setOrigin(0, 0);

        // camera follow character
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        player.create();

        //set up dream catcher
        this.dreamCatcher = new Weapons(this, player.x, player.y, 'animation_atlas', 'weapon_right_0001');
        // set up objects
        // heart
        load.mapObject(heartGroup, hearts, 'Heart', 4, this.map, 'Object', level_1);
        // spikes
        load.mapObject(heartGroup, spikes, 'Spikes', 30, this.map, 'Object', level_1);
        // memeory orbs
        load.mapObject(orbsGroup, orbs, 'Memory orbs', 0, this.map, 'Object', level_1);
        // ghost
        load.mapObject(ghostGroup, ghosts, 'Ghost', 5, this.map, 'Object', level_1);

        //add collider
        this.physics.add.collider(player, this.groundLayer);
        // shift to next level
        load.addSoul(level_1, 1950, 100, 'level_2', 'level_1');

        bgmMusic = this.sound.add('backMusic', soundConfig);
        bgmMusic.play();
        // HP bar
        heart1 = this.add.tileSprite(30, 30, 150, 50, 'oneH').setOrigin(0, 0).setScrollFactor(0);;
        heart2 = this.add.tileSprite(30, 30, 150, 50, 'twoH').setOrigin(0, 0).setScrollFactor(0);;
        heart3 = this.add.tileSprite(30, 30, 150, 50, 'threeH').setOrigin(0, 0).setScrollFactor(0);;

    }

    update() {
        this.modeShift(player);
        player.update();
        this.dreamCatcher.attack(player.x, player.y - player.height + 40);
        // HP Bar update
        if (this.currentHealth == 3) {
            heart3.visible = true;
        } else if (this.currentHealth == 2) {
            heart3.visible = false;
            heart2.visible = true;
        } else if (this.currentHealth == 1) {
            heart1.visible = true;
            heart3.visible = false;
            heart2.visible = false;
        } else if (this.currentHealth == 0) {
            heart3.visible = false;
            heart2.visible = false;
            heart1.visible = false;
        }
        //gameOver Trigger
        if (player.y > game.config.height || this.currentHealth == 0) {
            gameOverStatus = true;
            this.checkGameOver();
        } else if (gameOverStatus) {
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

    modeShift(player) {
        if (keyF1.isDown || keyF2.isDown) {
            // temporarily hide player
            player.alpha = 0;
            // create explosion at ship's position
            let boom = this.add.sprite(player.x, player.y, 'Final_sheet', 10).setOrigin(0, 0);
            boom.anims.play('explosion');           
            boom.on('animationcomplete', () => {    
                player.alpha = 1;                    
                boom.destroy();                   
            });
        }
    }
}