class LEVEL_3 extends Phaser.Scene {
    constructor () {
        super ("level_3");
    }
    
    preload() {

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
        this.add.text(10, 10, 'LEVEL 3', menuConfig).setScrollFactor(0);
    }
    
    update() {

    }


}