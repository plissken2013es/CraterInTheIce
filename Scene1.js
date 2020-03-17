class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    
    init() {
        this.infoTextLabel = this.add.text(config.width/2, config.height/2, "Loading game...", {
            fontFamily: 'Monkey',
            fontSize: 12,
            align: "center",
            resolution: 16
        });
        this.infoTextLabel.setOrigin(0.5);
    }
    
    preload() {
        this.load
            .image("background", "assets/png/background.png")
            .image("frontBackground", "assets/png/background_front.png")
            .image("mist", "assets/png/clouds.png")
            .image("fade", "assets/png/fade.png")
            .image("crosshair", "assets/png/crosshair.png")
            .image("twitterIcon", "assets/png/twitter_icon.png");
        
        this.load.
            spritesheet("slot1", "assets/png/slot1.png", {
                frameWidth: 29,
                frameHeight: 21
            })
            .spritesheet("slot2", "assets/png/slot2.png", {
                frameWidth: 29,
                frameHeight: 21
            })
            .spritesheet("slot3", "assets/png/slot3.png", {
                frameWidth: 29,
                frameHeight: 21
            })
            .spritesheet("fear_paranoia", "assets/png/fear_paranoia_sprite.png", {
                frameWidth: 2,
                frameHeight: 3
            })
            .spritesheet("copper", "assets/png/copper.png", {
                frameWidth: 33,
                frameHeight: 78
            })
            .spritesheet("macready", "assets/png/macready.png", {
                frameWidth: 31,
                frameHeight: 85
            })
            .spritesheet("norris", "assets/png/norris.png", {
                frameWidth: 32,
                frameHeight: 80
            });
        
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        
        this.load.atlas('flares', 'assets/png/flares.png', 'assets/png/flares.json');
        
        this.load.audio("music", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/sci-fi_platformer12.ogg"]);
        this.load.audio("mistery_sound", ["assets/sounds/mistery.mp3", "assets/sounds/mistery.ogg"]);
    }
    
    create() {
        this.infoTextLabel.destroy();
        this.infoTextLabel = this.add.text(config.width/2, config.height/2, "Please click to start", {
            fontFamily: 'Monkey',
            fontSize: 12,
            align: "center",
            resolution: 16
        });
        this.infoTextLabel.setOrigin(0.5);
        
        var copperFrames = this.anims.generateFrameNumbers("copper", { start: 0, end: 2});
        this.anims.create({
            key: "copper_anim",
            frames: [copperFrames[0], copperFrames[1], copperFrames[2], copperFrames[1], copperFrames[2], copperFrames[1]],
            frameRate: 1,
            repeat: -1
        });
        var macReadyFrames = this.anims.generateFrameNumbers("macready", { start: 0, end: 2});
        this.anims.create({
            key: "macready_hand_anim",
            frames: [macReadyFrames[0], macReadyFrames[2], macReadyFrames[2], macReadyFrames[0]],
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "macready_standby_anim",
            frames: [macReadyFrames[0]],
            frameRate: 0,
            repeat: -1
        });
        this.anims.create({
            key: "macready_breath_anim",
            frames: [macReadyFrames[0], macReadyFrames[1], macReadyFrames[1], macReadyFrames[2], macReadyFrames[2], macReadyFrames[1], macReadyFrames[1], macReadyFrames[1]],
            frameRate: 2,
            repeat: -1
        });
        var norrisFrames = this.anims.generateFrameNumbers("norris", { start: 0, end: 2});
        this.anims.create({
            key: "norris_anim",
            frames: [norrisFrames[0], norrisFrames[1], norrisFrames[2], norrisFrames[0], norrisFrames[2], norrisFrames[1], norrisFrames[2], norrisFrames[0], norrisFrames[2], norrisFrames[1]],
            frameRate: 4,
            repeat: -1
        });
        
        var fearAndParanoia = this.anims.generateFrameNumbers("fear_paranoia", { start: 0, end: 2});
        this.anims.create({
            key: "fear_augment",
            frames: [fearAndParanoia[0], fearAndParanoia[1]],
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "fear_standby",
            frames: [fearAndParanoia[1]],
            frameRate: 0,
            repeat: 0
        });
        this.anims.create({
            key: "paranoia_augment",
            frames: [fearAndParanoia[0], fearAndParanoia[2]],
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "paranoia_standby",
            frames: [fearAndParanoia[2]],
            frameRate: 0,
            repeat: 0
        });
        
        this.injectEnqueueUtil();
        
        this.cursor = this.add.image(0, 0, "crosshair").setVisible(false);        
        this.input.on("pointermove", function(pointer) {
            this.cursor.setVisible(true).setPosition(pointer.x, pointer.y);
        }, this);
        
        this.input.on('pointerdown', function() {
            this.scene.start("playGame");
        }, this);
    }
    
    // general methods
    
    injectEnqueueUtil() {
        if (Phaser.Utils) {
            Phaser.Utils.enqueue = Phaser.Utils.enqueue || function(cfg, scope) {
                var start = (function(args, scope) {
                    var queue = [];
                    for (var i in args) {
                        queue.push(args[i]);
                    }

                    var start = function() {
                        var job = function() {
                            var o = queue.shift();
                            if (o) {
                                switch (typeof o) {
                                    case "number":
                                        scope.time.addEvent({
                                            delay: o,
                                            callback: job,
                                            callbackScope: this,
                                            loop: false
                                        });
                                        break;

                                    case "function":
                                        o.call(scope);
                                        job();
                                        break;
                                }
                            }
                        };
                        job();
                    };
                    return start;
                })(cfg, scope);
                return {
                    start: start
                };
            };
        }
    }
}