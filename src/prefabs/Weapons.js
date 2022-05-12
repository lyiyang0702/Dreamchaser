class Weapons extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setScale(0.5);
        this.firing = false;
        this.alpha = 0;
    }

    // Press SPACE to summon dream cathcer && DOWN to hide
    // or the weapon will disspear after 5secs
    attack(new_x, new_y) {
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.firing) {
            this.firing = true;
        }

        if (this.firing) {
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.setScale (-0.5);
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                this.setScale (0.5);
            }
            this.alpha = 1;
            this.x = new_x;
            this.y = new_y;
            this.anims.play('dreamCatcher', true);
            if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                this.reset();
            }
            else {
                this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                    this.reset();
                }, this);
            }
        }
    }

    // weapon reset
    reset() {
        this.alpha = 0;
        this.firing = false;
    }
}