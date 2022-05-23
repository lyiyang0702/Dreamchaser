
class Ending extends Phaser.Scene {
    constructor() {
        super("ending");
    }
    typewriteText(text){
        const length = text.length
        let i = 0;
        //funcRunning = true;
        this.time.addEvent({
            callback: () => {
                this.label.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 10
        })
        //funcRunning = false;
    }
    typewriteTextWrapped(text){
        const lines = this.label.getWrappedText(text);
        const wrappedText = lines.join('\n');
        this.typewriteText(wrappedText);
    }

    create() {
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        backstoryMusic = this.sound.add('backstory', backConfig);
        backstoryMusic.play();
        this.anims.create({
            key: 'backgroundAnimation',
            frames: this.anims.generateFrameNumbers('backstoryBack', { start: 0, end: 2, first: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.backBack = this.add.sprite(game.config.width / 2, game.config.height / 2 , 'backstoryBack');
        this.backBack.anims.play('backgroundAnimation');
        //this.label = this.add.text(100, 100, '').setWordWrapWidth(500);
	    //this.typewriteTextWrapped("Dream Therapist\nSo what brings you here today?");
        this.label = this.add.text(30, currDreamY, '', dreamConfig).setWordWrapWidth(750);
        this.typewriteTextWrapped(dreamTherapist[currDreamLine]);
        //this.add.text(30, currDreamY, dreamTherapist[currDreamLine], dreamConfig);
        currDreamY += 60;
        currDreamLine++;
        currTalk++;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if((currTalk != 0) && whichOne[currTalk]==0) {
                this.label = this.add.text(30, currDreamY, '', dreamConfig).setWordWrapWidth(750);
	            this.typewriteTextWrapped(dreamTherapist[currDreamLine]);
                //this.add.text(30, currDreamY, dreamTherapist[currDreamLine], dreamConfig);
                currDreamY += 60;
                currDreamLine++;
                currTalk++;
            } else if(whichOne[currTalk]==1) {
                //this.label = this.add.text(1220, currDreamY-20, '', lucyConfig).setWordWrapWidth(750);
	            //this.typewriteTextWrapped(lucy[currLucyLine]);
                this.add.text(1220, currDreamY-20, lucy[currLucyLine], lucyConfig);
                currDreamY += 60;
                currLucyLine++;
                currTalk++;
            } else {
                backstoryMusic.stop();
                this.scene.start('level_1');
            }
          }
    }


}