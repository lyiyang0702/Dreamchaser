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
                this.setGravityY(1000);
                this.allowGravity = true;
                break;
            case 'Door':
                //console.log(this.items);
                this.setScale(0.1);
                this.setImmovable(true);
                this.body.setSize(100, 100);
                break;
            default:
                break;
        }
    }
}