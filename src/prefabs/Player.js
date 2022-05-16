class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, MAXjump) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.max = MAXjump;
    }

    create() {
        this.setGravityY(500);
        this.allowGravity = true;
        this.jumpCount = 0;
        this.jumping = false;
        this.setCollideWorldBounds(true);
        // image order priority
        this.setDepth(1);
    }

    update() {
        // left & right movement
        if (keyLEFT.isDown) {
            this.setVelocityX(-80);
            this.anims.play('idle_left', true);
            this.body.setSize(20, 80,true);
        }
        else if (keyRIGHT.isDown) {
            this.setVelocityX(80);
            this.anims.play('idle_right', true);
            this.body.setSize(20, 80,true);
        }
        else {
            this.setVelocityX(0);
            this.anims.play('idle_down', true);
            this.body.setSize(40, 80,true);
        }
        // jump (Max: 2)
        this.isGrounded = this.body.blocked.down;
        if (this.isGrounded) {
            this.jumpCount = 0;
        }

        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.jumpCount < this.max) {
            this.jumpCount ++;
            this.setVelocityY(-250);
        }

        
    }
}
