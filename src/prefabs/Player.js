class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y,texture,frame){
        super (scene,x,y,texture,frame);
        scene.physics.add.existing(this);
        scene.add.existing (this);
    }

    create(){
        this.setScale(1);
        this.setGravityY(500);
        this.allowGravity = true;
    }

    update (){
        if (keyLEFT.isDown) {
            this.setVelocityX(-100); 
            this.anims.play('idle_left', true);
        }
        else if (keyRIGHT.isDown){
            this.setVelocityX(100); 
            this.anims.play('idle_right', true);
        }
        else if (Phaser.Input.Keyboard.JustDown(keyUP)){
            this.setVelocityY(-300);
            this.anims.play('idle_down', true);
        }
        else {
            this.setVelocityX(0);
            this.anims.play('idle_down', true);
        }
    }
}