class Gameover extends Phaser.Scene {
    constructor () {
        super ("gameover");
    }


    create() {
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    
    update() {
        this.add.tileSprite(0, 0, game.config.width*2, game.config.height*2, 'gameOverBack');
        if(keyR.isDown){
            game.scene.start('menuScene');
            game.scene.sleep('gameover');
        }
    }


}