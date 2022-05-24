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
            this.alpha = 1;

            this.anims.play('weapon_right', true);
            this.x = new_x;
            this.y = new_y;
        
            if (Phaser.Input.Keyboard.JustDown(keyA)){
                this.flipX = true;
            }
            if (Phaser.Input.Keyboard.JustDown(keyD)){
                this.flipX = false;
            }
            if (Phaser.Input.Keyboard.JustDown(keyS)) {
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