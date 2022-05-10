class Weapons extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y,texture,frame){
        super (scene,x,y,texture,frame);
        scene.physics.add.existing(this);
        scene.add.existing (this);
        this.firing = false;
        this.alpha = 0;
    }
    // long press SPACE to attack
    attack (new_x,new_y){
        if (keySPACE.isDown){
            this.firing = true;
            this.alpha = 1;
            this.x = new_x;
            this.y = new_y;
            this.anims.play('dreamCatcher', true);
        }
        else{
            this.anims.play('dreamCatcher', false);
        }
    }
}