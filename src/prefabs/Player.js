class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, MAXjump) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.max = MAXjump;
    }
    create() {
        this.setGravityY(900);
        this.allowGravity = true;
        this.jumpCount = 0;
        this.jumping = false;
        this.setCollideWorldBounds(true);
        // image order priority
        this.setDepth(1);
    }

    update() {
        this.isGrounded = this.body.blocked.down;
        if (this.isGrounded) {
            this.jumpCount = 0;
        }
        // left & right movement
        if (keyA.isDown) {
            this.setVelocityX(-200);
            if (this.isGrounded){
                this.anims.play('cat_walk_left', true);
            }
            this.body.setSize(this.width,this.height,true);
            this.right = false;
            this.left = true;
        }
        else if (keyD.isDown) {
            this.setVelocityX(200);
            if (this.isGrounded){
                this.anims.play('cat_walk_right', true);
            }
            this.body.setSize(this.width,this.height,true);
            this.left = false;
            this.right = true;
        }
        else if (this.isGrounded) {
            this.setVelocityX(0);
            if (this.right){
                this.anims.play('idle_right', true);
            }
            else if(this.left){
                this.anims.play('idle_left', true);
            }
            this.body.setSize(this.width,this.height,true);
        }
        // jump (Max: 2)

        if (Phaser.Input.Keyboard.JustDown(keyW) && this.jumpCount < this.max) {
            this.jumpCount ++;
            if (this.left){
                this.anims.play ('jump_left',true);
            }
            else if (this.right){
                 this.anims.play ('jump_right',true);
            }
            this.setVelocityY(-350);
        }
    }
}
