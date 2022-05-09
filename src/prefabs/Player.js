class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y,texture,frame){
        super (scene,x,y,texture,frame);
        scene.physics.add.existing(this);
        scene.add.existing (this);
    }

    create(){
        this.setScale(0.1);
        this.setGravityY(1000);
        this.allowGravity = true;
    }

    move (){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.setVelocityX(-10); 
        }
        else if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.setVelocityX(10); 
        }
    }
}