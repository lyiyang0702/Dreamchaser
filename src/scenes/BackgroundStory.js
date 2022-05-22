var dreamTherapist = [
"So what brings you here today?",
"Isn’t that what everyone does?",
"I’ll see what I can do.",
"Our breakthrough technology allows for you to be in control of your dream.",
"Maybe you can go in there and find out the problem.",
"Are you ready?",
"Let’s start then."
];
var lucy = [
"I’m scared…",
"Everytime I go to sleep, I dream.",
"No you don’t understand, I DREAM.",
"So much that it hurts when I wake up.",
"The whole day, I wait for it to become night so I can fall asleep again.",
"I don’t know why, but something pulls me,",
"And I can’t resist.",
"I feel like a part of me is stuck there.",
"Help me.",
"…",
"…",
"Yes"
];

var whichOne = [0,1,1,0,1,1,1,1,1,1,1,0,0,0,1,0,1,1,0,-1];
var currTalk = 0;
var currDreamY = 20;
var currLucyY = 100;
var currDreamLine = 0;
var currLucyLine = 0;

let dreamConfig = {
    fontFamily: 'Courier',
    fontSize: '24px',
    //backgroundColor: '#F3B141',
    color: '#aa20bf',
    align: 'left',
    padding: {
        top: 2,
        bottom: 2,
    },
    fixedWidth: 0
}

let lucyConfig = {
    fontFamily: 'Courier',
    fontSize: '24px',
    //backgroundColor: '#F3B141',
    color: '#ffffff',
    align: 'right',
    padding: {
        top: 2,
        bottom: 2,
    },
    fixedWidth: 0
}
class Story extends Phaser.Scene {
    constructor() {
        super("story");
    }

    create() {
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if(whichOne[currTalk]==0) {
                this.add.text(30, currDreamY, dreamTherapist[currDreamLine], dreamConfig);
                currDreamY += 30;
                currDreamLine++;
                currTalk++;
            } else if(whichOne[currTalk]==1) {
                this.add.text(720, currDreamY, lucy[currLucyLine], lucyConfig);
                currDreamY += 30;
                currLucyLine++;
                currTalk++;
            } else {
                this.scene.start('level_1');
            }
          }
    }

}