class Enemies extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y,texture,frame){
        super (scene,x,y,texture,frame);
        scene.physics.add.existing(this);
        scene.add.existing (this);
        //mirrored = false;
    }

    create(){
        this.setScale(1);
        this.setGravityY(1000);
        this.allowGravity = true;
        this.setCollideWorldBounds(true);
        //is mirrored: facing to left
        mirrored = false;
        this.setVelocityX(200);
    }

    changeDirection(){
        console.log("enemy hit heart");
        //when facing right
        //if(mirrored == false){
            // this.setVelocityX(200);
            //console.log("mirrored: false");
            //if(enemy.body.blocked.right){
            if(enemy.body.blocked.right){
                
                this.setVelocityX(-200);
                mirrored = false;
                if(mirrored == false){
                    console.log("mirrored changed to false");
                }else{
                    console.log("false");
                }
                
            }
            //this.setVelocityX(200);
        //}else{
            //this.setVelocityY(-200);
            //console.log("mirrored: true");
            //if(enemy.body.blocked.left){
            if(enemy.body.blocked.left){
                //this.x -= 1;
                this.setVelocityX(200);
                mirrored = true;
                if(mirrored == true){
                    console.log("mirrored changed to true");
                }else{
                    console.log("false");
                }
            }
            //this.setVelocityY(-200);
        //}
    }

    update(){
        if(enemy.body.blocked.left || enemy.body.blocked.right){
            this.changeDirection();
        }
    }
}