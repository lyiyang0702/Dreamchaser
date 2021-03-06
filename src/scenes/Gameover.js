class Gameover extends Phaser.Scene {
    constructor () {
        super ("gameover");
    }


    create() {
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        currentHealth = 3;
    }
    
    update() {
        this.add.tileSprite(0, 0, game.config.width*2, game.config.height*2, 'gameOverBack');
        if(keyR.isDown){
            this.scene.stop('gameover');
            this.scene.start(level);
        }
        if(keyM.isDown){
            this.scene.stop('gameover');
            this.scene.start('menuScene');
        }
    }


}