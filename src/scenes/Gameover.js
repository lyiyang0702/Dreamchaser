class Gameover extends Phaser.Scene {
    constructor () {
        super ("gameover");
    }
    
    preload() {

    }

    create() {
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    
    update() {
         // delete later
         let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.tileSprite(0, 0, 1250, game.config.height, 'gameOverBack');
        /* this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'GameOver', menuConfig).setOrigin(0.5);
        this.add.text (game.config.width/2, game.config.height/2, 'Press R Back to Menu ', menuConfig).setOrigin(0.5); */
        if(keyR.isDown){
            game.scene.start('menuScene');
            game.scene.sleep('gameover');
        }
    }


}