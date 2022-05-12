class LEVEL_2 extends Phaser.Scene {
    constructor () {
        super ("level_2");
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
        this.add.text (game.config.width/2, game.config.height/2 - borderUISize - borderPadding*5, 'LEVEL 2',menuConfig).setOrigin(0.5);
        this.player = new Player(this, game.config.width/2, game.config.height/2,'cat_atlas', 'idle_down_0001', MAX_JUMP);
        this.player.create();
    }
    
    update() {

    }


}