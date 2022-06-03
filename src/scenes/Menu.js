let menuMusic;
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

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
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            selectSound.play();
        }
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            let music = this.sound.add('selectSound');
            music.play();
            menuMusic.stop();
            this.scene.start('level_3');
        }
    }

}