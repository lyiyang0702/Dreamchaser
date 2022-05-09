class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now
        this.load.image('arrowKey', 'arrowKey.png');
        this.load.image('cat', 'MainCharacter.png');
        this.load.image('ground', 'ground.png');
    }

    create() {
        // ...and pass to the next Scene
        this.scene.start('menuScene');
    }
}