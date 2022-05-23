let backstoryMusic;
var dreamTherapist = [
"Dream Therapist\nSo what brings you here today?",
"Dream Therapist\nCan you describe them?",
"Dream Therapist\nI’ll see what I can do. Our breakthrough technology allows for you to be in control of your dream.",
"Dream Therapist\nMaybe you can go in there and find out the problem.",
"Dream Therapist\nAre you ready?",
"Dream Therapist\nLet’s start then."
];
var lucy = [
"Lucy\n...I’m scared",
"Lucy\nI've been having weird dreams, ones that feel too real",
"Lucy\nI keep hearing a voice calling out to me, but I can never seem to reach it. It always repeats the same words 'SAVE ME'",
"Lucy\nI chase after the voice, but right when I think I'm close, I wake up",
"Lucy\nI feel like a part of me is stuck there",
"Lucy\n…",
"Lucy\nYes"
];

var whichOne = [0,1,1,0,1,1,1,0,0,0,1,1,0-1];
var currTalk = 0;
var currDreamY = 20;
var currLucyY = 500;
var currDreamLine = 0;
var currLucyLine = 0;

let dreamConfig = {
    fontFamily: 'Copperplate',
    fontSize: '20px',
    //backgroundColor: '#F3B141',
    color: '#12acfc',
    align: 'left',
    padding: {
        top: 2,
        bottom: 2,
    },
    fixedWidth: 0
}

let lucyConfig = {
    fontFamily: 'Copperplate',
    fontSize: '20px',
    //backgroundColor: '#F3B141',
    color: '#ffffff',
    align: 'right',
    rtl: true,
    padding: {
        top: 2,
        bottom: 2,
    },
    fixedWidth: 0,
    wordWrap: { width: 800, useAdvancedWrap: true }
}
class Story extends Phaser.Scene {
    constructor() {
        super("story");
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