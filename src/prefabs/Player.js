class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, MAXjump) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.max = MAXjump;
        this.cat = false;
        this.onHit = false;
        this.hitEvent = scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.onHit = false;
            },
            loop: true,
            callbackScope: this,
            paused: true,
        });
        this.hitTimer = scene.time.addEvent(this.hitEvent);
    }
    create() {
        this.setGravityY(1000);
        this.allowGravity = true;
        this.jumpCount = 0;
        this.jumping = false;
        this.right = true;
        this.left = false;
        this.setCollideWorldBounds(true);
        // image order priority
        this.setDepth(1);
    }

    update() {
        this.isGrounded = this.body.blocked.down;
        if (this.isGrounded) {
            this.jumpCount = 0;
        }
        if (keyF1.isDown && !this.cat) {
            this.cat = true;
            this.y -= this.height;
        }
        else if (keyF2.isDown && this.cat) {
            this.cat = false;
            this.y -= this.height;
        }
        // left & right movement
        if (keyA.isDown) {
            this.setVelocityX(-300);
            if (this.isGrounded) {
                if (this.cat) {
                    this.anims.play('cat_run_left', true);
                }
                else {
                    this.anims.play('cat_walk_left', true);
                }
            }
            this.body.setSize(this.width, this.height, true);
            this.right = false;
            this.left = true;
        }
        else if (keyD.isDown) {
            this.setVelocityX(300);
            if (this.isGrounded) {
                if (this.cat) {
                    this.anims.play('cat_run_right', true);
                }
                else {
                    this.anims.play('cat_walk_right', true);
                }
            }
            this.body.setSize(this.width, this.height, true);
            this.left = false;
            this.right = true;
        }
        else if (this.isGrounded) {
            this.setVelocityX(0);
            if (this.right && this.cat) {
                this.anims.play('cat_idle_right', true);
                this.body.setSize(this.width, this.height, true);
            }
            else if (this.right) {
                this.anims.play('idle_right', true);
                this.body.setSize(this.width, this.height, true);
            }

            else if (this.left && this.cat) {
                this.anims.play('cat_idle_left', true);
                this.body.setSize(this.width, this.height, true);
            }
            else if (this.left) {
                this.anims.play('idle_left', true);
                this.body.setSize(this.width, this.height, true);
            }
        }


        // jump (Max: 2)

        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.jumpCount < this.max && !this.cat) {
            this.jumpCount++;
            if (this.left) {
                this.anims.play('jump_left', true);
            }
            else if (this.right) {
                this.anims.play('jump_right', true);
            }
            this.setVelocityY(-450);
        }

    }

    healthLose() {
        //update num
        if (currentHealth > 0 && !this.onHit) {
            currentHealth -= 1;
            this.onHit = true;
            this.hitTimer.paused = false;
        }

        //debug output for health number
        //healthCheck.text = "Health: " + currentHealth;
    }
}
