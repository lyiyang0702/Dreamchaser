let backstoryMusic;
// var dreamTherapist = [
//     "Dream Therapist\nSo what brings you here today?",
//     "Dream Therapist\nCan you describe them?",
//     "Dream Therapist\nI’ll see what I can do. Our breakthrough technology allows for you to be in control of your dream.",
//     "Dream Therapist\nMaybe you can go in there and find out the problem.",
//     "Dream Therapist\nAre you ready?",
//     "Dream Therapist\nLet’s start then."
// ];
// var lucy = [
//     "Lucy\n...I’m scared",
//     "Lucy\nI've been having weird dreams, ones that feel too real",
//     "Lucy\nI keep hearing a voice calling out to me, but I can never seem to reach it. It always repeats the same words 'SAVE ME'",
//     "Lucy\nI chase after the voice, but right when I think I'm close, I wake up",
//     "Lucy\nI feel like a part of me is stuck there",
//     "Lucy\n…",
//     "Lucy\nYes"
// ];

// var whichOne = [0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 - 1];
// var currTalk = 0;
// var currDreamY = 20;
// var currLucyY = 500;
// var currDreamLine = 0;
// var currLucyLine = 0;

// let dreamConfig = {
//     fontFamily: 'OPTICopperplate',
//     fontSize: '15px',
//     //backgroundColor: '#F3B141',
//     color: '#12acfc',
//     align: 'left',
//     padding: {
//         top: 2,
//         bottom: 2,
//     },
//     fixedWidth: 0
// }

// let lucyConfig = {
//     fontFamily: 'OPTICopperplate',
//     fontSize: '15px',
//     //backgroundColor: '#F3B141',
//     color: '#ffffff',
//     align: 'right',
//     rtl: true,
//     padding: {
//         top: 2,
//         bottom: 2,
//     },
//     fixedWidth: 0,
//     wordWrap: { width: 800, useAdvancedWrap: true }
// }
class Story extends Phaser.Scene {
    constructor() {
        super("story");
        // dialog constants
        this.DBOX_X = 0;			    // dialog box x-position
        this.DBOX_Y = 500;			    // dialog box y-position
        this.DBOX_FONT = 'gem_font';	// dialog box font key

        this.TEXT_X = 50;			// text w/in dialog box x-position
        this.TEXT_Y = 545;			// text w/in dialog box y-position
        this.TEXT_SIZE = 24;		// text font size (in pixels)
        this.TEXT_MAX_WIDTH = 1150;	// max width of text within box

        this.NEXT_TEXT = '[SPACE]';	// text to display for next prompt
        this.NEXT_X = 1200;			// next text prompt x-position
        this.NEXT_Y = 674;			// next text prompt y-position

        this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing

        // character variables
        this.lucy = null;
        this.tweenDuration = 500;

        this.OFFSCREEN_X = -500;        // x,y values to place characters offscreen
        this.OFFSCREEN_Y = 1000;
    }
    // typewriteText(text) {
    //     const length = text.length
    //     let i = 0;
    //     //funcRunning = true;
    //     this.time.addEvent({
    //         callback: () => {
    //             this.label.text += text[i]
    //             ++i
    //         },
    //         repeat: length - 1,
    //         delay: 10
    //     })
    //     //funcRunning = false;
    // }
    // typewriteTextWrapped(text) {
    //     const lines = this.label.getWrappedText(text);
    //     const wrappedText = lines.join('\n');
    //     this.typewriteText(wrappedText);
    // }

    // create() {
    //     keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //     backstoryMusic = this.sound.add('backstory', backConfig);
    //     backstoryMusic.play();
    //     this.anims.create({
    //         key: 'backgroundAnimation',
    //         frames: this.anims.generateFrameNumbers('backstoryBack', { start: 0, end: 2, first: 0 }),
    //         frameRate: 10,
    //         repeat: -1
    //     });
    //     this.backBack = this.add.sprite(game.config.width / 2, game.config.height / 2, 'backstoryBack');
    //     this.backBack.anims.play('backgroundAnimation');
    //     //this.label = this.add.text(100, 100, '').setWordWrapWidth(500);
    //     //this.typewriteTextWrapped("Dream Therapist\nSo what brings you here today?");
    //     this.label = this.add.text(30, currDreamY, '', dreamConfig).setWordWrapWidth(750);
    //     this.typewriteTextWrapped(dreamTherapist[currDreamLine]);
    //     //this.add.text(30, currDreamY, dreamTherapist[currDreamLine], dreamConfig);
    //     currDreamY += 60;
    //     currDreamLine++;
    //     currTalk++;
    // }

    // update() {
    //     if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
    //         if ((currTalk != 0) && whichOne[currTalk] == 0) {
    //             this.label = this.add.text(30, currDreamY, '', dreamConfig).setWordWrapWidth(750);
    //             this.typewriteTextWrapped(dreamTherapist[currDreamLine]);
    //             //this.add.text(30, currDreamY, dreamTherapist[currDreamLine], dreamConfig);
    //             currDreamY += 60;
    //             currDreamLine++;
    //             currTalk++;
    //         } else if (whichOne[currTalk] == 1) {
    //             //this.label = this.add.text(1220, currDreamY-20, '', lucyConfig).setWordWrapWidth(750);
    //             //this.typewriteTextWrapped(lucy[currLucyLine]);
    //             this.add.text(1220, currDreamY - 20, lucy[currLucyLine], lucyConfig);
    //             currDreamY += 60;
    //             currLucyLine++;
    //             currTalk++;
    //         } else {
    //             backstoryMusic.stop();
    //             this.scene.start('level_1');
    //         }
    //     }
    // }
    create() {
        backstoryMusic = this.sound.add('backstory', backConfig);
        backstoryMusic.play();
        // parse dialog from JSON file
        this.dialog = this.cache.json.get('dialog');
        //console.log(this.dialog);

        // add dialog box sprite
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogbox').setOrigin(0);

        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);

        // ready the character dialog images offscreen
        this.lucy = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'lucy').setOrigin(0, 1).setScale(0.5);
        //this.therapist = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'animation_atlas', 'soul_left_0001').setOrigin(0, 1);

        // input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // start dialog
        this.typeText();        
    }

    update() {
        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.dialogTyping) {
            // trigger dialog
            this.typeText();
        }
    }

    typeText() {
        // lock input while typing
        this.dialogTyping = true;

        // clear text
        this.dialogText.text = '';
        this.nextText.text = '';

        /* Note: In my conversation data structure: 
                - each array within the main JSON array is a "conversation"
                - each object within a "conversation" is a "line"
                - each "line" can have 3 properties: 
                    1. a speaker (required)
                    2. the dialog text (required)
                    3. an (optional) flag indicating if this speaker is new
        */

        // make sure there are lines left to read in this convo, otherwise jump to next convo
        if(this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
            this.dialogLine = 0;
            // I increment conversations here, but you could create logic to exit the dialog here
            this.dialogConvo++;
        }
        
        // make sure we haven't run out of conversations...
        if(this.dialogConvo >= this.dialog.length) {
            // here I'm simply "exiting" the last speaker and removing the dialog box,
            // but you could build other logic to change game states here
            console.log('End of Conversations');
            // tween out prior speaker's image
            if(this.dialogLastSpeaker) {
                this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: this.OFFSCREEN_X,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }
            // make text box invisible
            this.dialogbox.visible = false;
            backstoryMusic.stop();
            this.scene.start("level_1");

        } else {
            // if not, set current speaker
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];
            // check if there's a new speaker (for exit/enter animations)
            if(this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
                // tween out prior speaker's image
                if(this.dialogLastSpeaker) {
                    this.tweens.add({
                        targets: this[this.dialogLastSpeaker],
                        x: this.OFFSCREEN_X,
                        duration: this.tweenDuration,
                        ease: 'Linear'
                    });
                }
                // tween in new speaker's image
                this.tweens.add({
                    targets: this[this.dialogSpeaker],
                    x: this.DBOX_X + 50,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }

            // build dialog (concatenate speaker + line of text)
            this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

            // create a timer to iterate through each letter in the dialog text
            let currentChar = 0; 
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.dialogLines.length - 1,
                callback: () => { 
                    // concatenate next letter from dialogLines
                    this.dialogText.text += this.dialogLines[currentChar];
                    // advance character position
                    currentChar++;
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if(this.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                        // un-lock input
                        this.dialogTyping = false;
                        // destroy timer
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this // keep Scene context
            });
            
            // set bounds on dialog
            this.dialogText.maxWidth = this.TEXT_MAX_WIDTH;

            // increment dialog line
            this.dialogLine++;

            // set past speaker
            this.dialogLastSpeaker = this.dialogSpeaker;
        }
    }

}