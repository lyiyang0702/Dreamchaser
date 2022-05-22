class Menu extends Phaser.Scene {
    constructor () {
        super ("menuScene");
    }

    create() {
       
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
    

        // show menu text
        this.add.text (game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'DREAMCATHER',menuConfig).setOrigin(0.5);
        this.add.text (game.config.width/2, game.config.height/2, 'Use arrows to move ', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text (game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ENTER to start', menuConfig).setOrigin (0.5);
        this.add.text (game.config.width/2, game.config.height/2 + borderUISize + borderPadding *4, 'Press SPACE to collect & keyDOWN to hide weapon', menuConfig).setOrigin (0.5);

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
          this.scene.start('story'); 
        }
    }

}