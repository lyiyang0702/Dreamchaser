class Items extends Phaser.Physics.Arcade.Sprite {
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
}