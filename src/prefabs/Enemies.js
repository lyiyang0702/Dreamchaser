class Enemies extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y,texture,frame){
        super (scene,x,y,texture,frame);
        scene.physics.add.existing(this);
        scene.add.existing (this);
        //mirrored = false;
    }

    create(){
        this.setScale(0.1);
        //this.setGravityY(1000);
        this.allowGravity = true;
        this.setCollideWorldBounds(true);
        this.setSize(200, 200);
        //is mirrored: facing to left
        mirrored = false;
        this.setVelocityX(-100);
    }

    changeDirection(){
        console.log("enemy hit heart");
        //when facing right
        if(enemy.body.blocked.right){       
            this.setVelocityX(-100);
            mirrored = false;
            if(mirrored == false){
                console.log("mirrored changed to false");
            }else{
                console.log("false");
            }
                
        }

        if(enemy.body.blocked.left){

            this.setVelocityX(100);
            mirrored = true;
            if(mirrored == true){
                console.log("mirrored changed to true");
            }else{
                console.log("false");
            }
        }
    }

    update(){
        if(enemy.body.blocked.left || enemy.body.blocked.right){
            this.changeDirection();
        }
    }
}