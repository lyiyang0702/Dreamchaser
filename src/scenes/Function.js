class Function extends Phaser.Scene {
    constructor() {
        super('functionScene');
    }

    // useful functions
    orbCollected(obj2, scene) {
        obj2.destroy();
        orbNum += 1;
        console.log(orbNum);
    }

    groupAddpath(group, path, frame, scene, camera) {
        for (var i = 0; i < group.children.entries.length; i++) {
            var mover = scene.add.follower(path, group.children.entries[i].x, group.children.entries[i].y, group.children.entries[i].texture.key, frame).setScale(1.5);
            camera.ignore(mover);
            mover.anims.play('ghost');
            scene.physics.world.enable(mover, Phaser.Physics.Arcade.DYNAMIC_BODY);
            mover.body.setImmovable(true);
            mover.body.setCircle(15).setOffset(10, 10);
            // vfx
            scene.ghostVfxManager = scene.add.particles('Final_sheet', 4);
            camera.ignore(scene.ghostVfxManager);
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

    mapObject(Group, objects, objectKey, Frame, Map, objectLayerKey, scene, Camera) {
        objects = Map.createFromObjects(objectLayerKey, {
            name: objectKey,
            key: "Final_sheet",
            frame: Frame
        });
        Camera.ignore(objects);
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
                })
                break;
            case 'Spikes':
                objects.map((objects) => {
                    objects.body.setSize(44, 20).setOffset(2, 28);
                });
                scene.physics.add.collider(player, Group, function () {
                    player.healthLose(scene);
                })
                break;
            case 'Memory orbs':
                objects.map((objects) => {
                    objects.body.setCircle(15).setOffset(10);
                });
                // vfx
                scene.powerUpVfxManager = scene.add.particles('Final_sheet', 15);
                Camera.ignore(scene.powerUpVfxManager);
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
                this.groupAddpath(Group, curve, 5, scene, Camera);
                break;
            default:
                break;
        }
    }

    addSoul(scene, x, y, startLevel, sleepLevel, camera) {
        scene.soul = scene.add.sprite(x, y, 'animation_atlas', 'soul_left_0001');
        scene.physics.world.enable(scene.soul, Phaser.Physics.Arcade.STATIC_BODY);
        camera.ignore(scene.soul);
        scene.soul.anims.play('soul_left', true);
        scene.physics.add.collider(player, scene.soul, function () {
            if (orbNum == 3) {
                game.scene.start(startLevel);
                game.scene.sleep(sleepLevel);
            }
        });
    }
}