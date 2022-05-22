class Items extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y,texture,frame,key){
        super (scene,x,y,texture,frame);
        scene.physics.add.existing(this);
        scene.add.existing (this);
        this.items = key;
    }

    create(){

        switch(this.items) {
            case 'Heart':
                //console.log(this.items);
                this.setScale(0.1);
                break;
            case 'Ghost':
                //console.log(this.items);
                this.setImmovable(true);
                //this.anims.play('soul_left',true);
                break;
            default:
                break;
        }
    }
}