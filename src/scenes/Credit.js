class Credit extends Phaser.Scene {
    constructor() {
        super("credit");
    }

    create() {

        //bgm
        menuMusic = this.sound.add('backMusic', soundConfig);
        menuMusic.setLoop(true);
        menuMusic.play();

        this.add.tileSprite(0, 0, 1250, game.config.height, 'credit').setOrigin(0, 0);
        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            selectSound.play();
        }
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            let music = this.sound.add('selectSound');
            music.play();
            menuMusic.stop();
            this.scene.start('menuScene');
        }
    }

}