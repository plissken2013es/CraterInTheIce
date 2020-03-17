var config, game, gameSettings;

window.onload = function() {
    config = {
        width: 320,
        height: 180,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
        },
        backgroundColor: 0x000000,
        scene: [Scene1, Scene2, Scene3],
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        }
    };
    
    gameSettings = {};
    
    game = new Phaser.Game(config);
};