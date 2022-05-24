let menuMusic;
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //bgm
        menuMusic = this.sound.add('backMusic', soundConfig);
        menuMusic.setLoop(true);
        menuMusic.play();
        this.add.tileSprite(0, 0, 1250, game.config.height, 'titlePageBackground').setOrigin(0, 0);
        this.add.tileSprite(0, 0, 1250, game.config.height, 'enter').setOrigin(0, 0);
        this.anims.create({
            key: 'logoAnim',
            frames: this.anims.generateFrameNumbers('logo', { start: 0, end: 3, first: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.logoPlay = this.add.sprite(game.config.width / 2, game.config.height / 2 - 100, 'logo');
        this.logoPlay.anims.play('logoAnim');
        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            menuMusic.stop();
            this.scene.start('story');
        }
    }

}