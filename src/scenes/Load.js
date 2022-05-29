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
        this.load.image('door', 'img/door.png');
        this.load.atlas('animation_atlas', 'img/animations.png', 'json/animation_sprites.json');
        this.load.image('jungle', 'img/jungleBackground.png');
        this.load.image('tileStructure', 'img/Level1Background.png');
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
        this.load.image('gameOverBack', 'img/gameOverBackground.PNG');

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

    // useful functions
    orbCollected(obj2, scene) {
        obj2.destroy();
        orbNum += 1;
        console.log(orbNum);
        // scene.orbCheck.text = "Orb: " + scene.orbNum;
    }

    groupAddpath(group, path, frame, scene) {
        for (var i = 0; i < group.children.entries.length; i++) {
            var mover = scene.add.follower(path, group.children.entries[i].x, group.children.entries[i].y, group.children.entries[i].texture.key, frame).setScale(1.5);
            mover.anims.play('ghost');
            scene.physics.world.enable(mover, Phaser.Physics.Arcade.DYNAMIC_BODY);
            mover.body.setImmovable(true);
            mover.body.setCircle(15).setOffset(10, 10);
            // vfx
            scene.ghostVfxManager = scene.add.particles('Final_sheet', 4);

            scene.ghostVfxEffect = scene.ghostVfxManager.createEmitter({
                follow: player,
                quantity: 1,
                scale: { start: 1, end: 1 },  // start big, end small
                speed: { min: 0, max: 50 }, // speed up
                lifespan: 800,   // short lifespan
                on: false   // do not immediately start, will trigger in collision
            });
            scene.physics.add.collider(player, mover, function () {
                player.healthLose(scene);
                scene.ghostVfxEffect.explode();
            }, null, scene)
            mover.startFollow({
                duration: 5000,
                yoyo: true,
                repeat: -1,
                rotateToPath: false,
                rotationOffset: 360
            });
        }
    }

    mapObject(Group, objects, objectKey, Frame, Map, objectLayerKey, scene) {
        objects = Map.createFromObjects(objectLayerKey, {
            name: objectKey,
            key: "Final_sheet",
            frame: Frame
        });
        scene.physics.world.enable(objects, Phaser.Physics.Arcade.STATIC_BODY);
        Group = scene.add.group(objects);
        switch (objectKey) {
            case 'Heart':
                scene.physics.add.overlap(player, Group, (obj1, obj2) => {
                    obj2.destroy(); // remove heart
                    let collectHealth = this.sound.add('collectHealth');
                    collectHealth.play();
                    if (scene.currentHealth < 3) {
                        scene.currentHealth += 1;
                    }
                    console.log("Health: " + scene.currentHealth); // HP +1
                })
                break;
            case 'Spikes':
                objects.map((objects) => {
                    objects.body.setSize(44, 20).setOffset(2, 28);
                });
                scene.physics.add.collider(player, Group, function () {
                    /* let ghostHit = this.sound.add('ghostHit');
                    ghostHit.play() */;
                    player.healthLose(scene);
                })
                break;
            case 'Memory orbs':
                objects.map((objects) => {
                    objects.body.setCircle(15).setOffset(10);
                });
                // vfx
                scene.powerUpVfxManager = scene.add.particles('Final_sheet', 15);

                scene.powerUpVfxEffect = scene.powerUpVfxManager.createEmitter({
                    follow: player,
                    quantity: 20,
                    scale: { start: 1.0, end: 0.0 },  // start big, end small
                    speed: { min: 50, max: 100 }, // speed up
                    lifespan: 800,   // short lifespan
                    on: false   // do not immediately start, will trigger in collision
                });
                Group.playAnimation('memory_orb');
                scene.orbNum = 0;
                // scene.orbCheck = scene.add.text(scene.pla, borderPadding * 6, "Orb: " + scene.orbNum, menuConfig).setScrollFactor(0);
                scene.physics.add.overlap(scene.dreamCatcher, Group, (obj1, obj2) => {
                    scene.powerUpVfxEffect.explode();  // trigger particle system
                    this.orbCollected(obj2, scene);
                    let collectOrbs = this.sound.add('collectOrbs');
                    collectOrbs.play();
                });
                break;
            case 'Ghost':
                Group.setVisible(false);
                this.groupAddpath(Group, curve, 5, scene);
                break;
            default:
                break;
        }
    }

    addSoul(scene, x, y, startLevel, sleepLevel) {
        scene.soul = scene.add.sprite(x, y, 'animation_atlas', 'soul_left_0001');
        scene.physics.world.enable(scene.soul, Phaser.Physics.Arcade.STATIC_BODY);
        scene.soul.anims.play('soul_left', true);
        scene.physics.add.collider(player, scene.soul, function () {
            if(orbNum == 3){
                game.scene.start(startLevel);
                game.scene.sleep(sleepLevel);
            }
        });
    }
}