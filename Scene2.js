class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }
    
    init() {
        this.objectTexts = {
            slot1: "Climbing rope",
            slot2: "Ice ax",
            slot3: "Whiskey"
        };
    }
    
    create() {
        this.background = this.add.image(0, 0, "background");
        this.mist = this.add.tileSprite(0, 0, config.width, config.height, "mist");
        this.mist.alpha = 0.3;
        this.mist.blendMode = "ADD";
        
        this.particles = this.add.particles("flares");

        this.particles.createEmitter({
            frame: "blue",
            x: 0,
            y: { min: -10, max: 180 },
            alpha: { min: 0.2, max: 0.8 },
            lifespan: { min: 8000, max: 16000 },
            speedX: { min: 20, max: 40 },
            speedY: { min: -10, max: 20 },
            scale: { start: 0.05, end: 0 },
            frequency: 100,
            quantity: 1,
            timeScale: 2,
            blendMode: "SOFT_LIGHT"
        });
        
        this.frontBackground = this.add.image(0, 0, "frontBackground");
        this.background.setOrigin(0);
        this.mist.setOrigin(0);
        this.frontBackground.setOrigin(0);
        
        this.norris = new Character(this, 300, 100, "norris", "Norris");
        this.norris.play("norris_anim");
        
        this.macready = new Character(this, 265, 101, "macready", "MacReady");
        this.macready.play("macready_hand_anim");
        this.time.addEvent({
            delay: 3000,
            callback: this.updateMacReadyAnimation,
            callbackScope: this,
            loop: true
        });
        
        this.copper = new Character(this, 228, 108, "copper", "Dr. Copper");
        this.copper.play("copper_anim");
        
        this.startSceneDialogue();
        
        this.misterySound = this.sound.add("mistery_sound");
        
        this.music = this.sound.add("music");
        var musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };
        this.music.play(musicConfig);
        
        this.slot1 = new ObjectSlot(this, 16, 166, "slot1", this.objectTexts["slot1"]);
        this.slot2 = new ObjectSlot(this, 49, 166, "slot2", this.objectTexts["slot2"]);
        this.slot3 = new ObjectSlot(this, 82, 166, "slot3", this.objectTexts["slot3"]);
        
        this.cursor = this.physics.add.image(0, 0, "crosshair").setVisible(false); 
        this.input.on("pointermove", function(pointer) {
            this.cursor.setVisible(true).setPosition(pointer.x, pointer.y);
        }, this);
        
        this.events.on("onOverSlot", this.onOverSlot, this);
        this.events.on("onOutSlot", this.onOutSlot, this);
    }
    
    update() {
        this.mist.tilePositionX -= 0.5;
        this.mist.tilePositionY -= 0.2;
    }
    
    // general methods

    clearDialogue() {
        if (this.dialogue) this.dialogue.destroy();
    }
    
    createBitmapTextGroup(x, y, text, color, size) {
        var size = size || 16
        
        var textGroup = this.add.group();
        var textStroke = this.add.bitmapText(x+1, y+1, "pixelFont", text, size);
        var text = this.add.bitmapText(x, y, "pixelFont", text, size);
        text.setTint(color);
        textStroke.setTint(0x000);
        textGroup.add(textStroke);
        textGroup.add(text);
        
        return textGroup;
    }
    
    createFearAndParanoia(x, type) {
        var y = type == "fear" ? 160 : 172;
        let fearAndParanoiaSpr = new FearAndParanoia(this, x, y, type);
        this.time.addEvent({
            delay: 1500,
            callback: function() {
                this.play(this.type + "_standby");
            },
            callbackScope: fearAndParanoiaSpr,
            loop: false
        });
        
        return fearAndParanoiaSpr;
    }
    
    createText(x, y, text, color) {
        var align = x > config.width/2 ? "right" : "left";
        var textLabel = this.add.text(x, y, text, {
            fontFamily: 'Monkey',
            fontSize: 12,
            color: color,
            strokeThickness: 2,
            stroke: "#000",
            align: align,
            resolution: 16
        });
        textLabel.alpha = 0;
        this.tweens.add({
            targets: textLabel,
            alpha: 1,
            ease: "Power1",
            duration: 300,
            repeat: 0,
            callbackScope: this
        });
        textLabel.setOrigin(x > config.width/2 ? 1 : 0, 0);
        return textLabel;
    }
    
    launchCredits() {
        this.scene.start("gameCredits");
    }
    
    onOverSlot(zone) {
        this.setDescriptionText(this.cursor.x, this.cursor.y - 10, zone.name);
    }
    
    onOutSlot(zone) {
        if (this.descriptionText) this.descriptionText.destroy();
    }
    
    setDescriptionText(x, y, text) {
        if (this.descriptionText) this.descriptionText.destroy();
        this.descriptionText = this.createText(x, y, text, "#fff");
    }
    
    startSceneDialogue() {
        var queue = [
            function() {
                this.fade = this.add.image(0, 0, "fade");
                this.fade.setOrigin(0);
                this.fade.alpha = 1;
                this.tweens.add({
                    targets: this.fade,
                    alpha: 0,
                    ease: "Linear",
                    duration: 6000,
                    repeat: 0,
                    onComplete: function() {
                        this.fade.destroy();
                    },
                    callbackScope: this
                });
            },
            6000,
            function() {
                this.dialogue = this.createText(280, 16, "Jesus...", "#3793ec");
            },
            2000,
            function() {
                this.clearDialogue();
            },
            1500,
            function() {
                this.dialogue = this.createText(280, 16, "How long do you figure this has been\nin the ice?", "#3793ec");
            },
            3500,
            function() {
                this.clearDialogue();
            },
            1500,
            function() {
                this.dialogue = this.createText(310, 8, "Well...", "#6b6191");
            },
            2000,
            function() {
                this.clearDialogue();
            },
            1500,
            function() {
                this.dialogue = this.createText(310, 8, "The backscatter effect’s been bringing\nthings up from way down around here...", "#6b6191");
            },
            5000,
            function() {
                this.clearDialogue();
            },
            1500,
            function() {
                this.dialogue = this.createText(310, 8, "...for a long time.", "#6b6191");
            },
            2000,
            function() {
                this.clearDialogue();
            },
            1500,
            function() {
                this.dialogue = this.createText(310, 8, "I’d say...", "#6b6191");
            },
            2000,
            function() {
                this.clearDialogue();
            },
            1500,
            function() {
                this.dialogue = this.createText(310, 8, "I’d say the ice it’s buried in\nis 100.000 years old, at least.", "#6b6191");
            },
            4500,
            function() {
                this.clearDialogue();
            },
            1000,
            function() {
                this.createFearAndParanoia(274, "paranoia");
                this.misterySound.play();
            },
            500,
            function() {
                this.createFearAndParanoia(277, "paranoia");
            },
            500,
            function() {
                this.dialogue = this.createText(280, 16, "And those Norwegians blew it up?", "#3793ec");
            },
            3500,
            function() {
                this.clearDialogue();
            },
            2000,
            function() {
                this.dialogue = this.createText(310, 8, "Yeah.", "#6b6191");
            },
            1500,
            function() {
                this.clearDialogue();
            },
            500,
            function() {
                this.createFearAndParanoia(289, "fear");
            },
            500,
            function() {
                this.createFearAndParanoia(292, "fear");
                this.misterySound.play();
            },
            500,
            function() {
                this.createFearAndParanoia(295, "fear");
            },
            2500,
            function() {
                this.fade = this.add.image(0, 0, "fade");
                this.fade.setOrigin(0);
                this.fade.alpha = 0;
                this.tweens.add({
                    targets: this.fade,
                    alpha: 1,
                    ease: "Power1",
                    duration: 2500,
                    repeat: 0,
                    onComplete: this.launchCredits,
                    callbackScope: this
                });
            }
        ];
        Phaser.Utils.enqueue(queue, this).start();
    }
    
    updateMacReadyAnimation() {
        var anims = ["macready_hand_anim", "macready_breath_anim"]; //, "macready_standby_anim"];
        var animToPlay = Phaser.Utils.Array.GetRandom(anims);
        this.macready.play(animToPlay);
    }
}