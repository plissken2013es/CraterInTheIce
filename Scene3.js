class Scene3 extends Phaser.Scene {
    constructor() {
        super("gameCredits");
    }
    
    init() {
        for (var i=0; i<3; i += 2) {
            let icon = this.add.image(100, 55 + (i*50), "twitterIcon");
            icon.setOrigin(0, 0.5);
        }
        
        this.titleLabel = this.add.text(config.width/2, 15, "CREDITS", {
            fontFamily: 'Monkey',
            fontSize: 12,
            align: "center",
            resolution: 16,
            color: "#eef78c"
        });
        this.titleLabel.setOrigin(0.5);
        
        this.artistLabel = this.add.text(config.width/2, 35, "Pixel Art By", {
            fontFamily: 'Monkey',
            fontSize: 12,
            align: "center",
            resolution: 16,
            color: "#3793ec"
        });
        this.artistLabel.setOrigin(0.5);
        
        this.artistName = this.add.text(config.width/2 - 40, 54, "@DoomCube", {
            fontFamily: 'Monkey',
            fontSize: 12,
            align: "left",
            resolution: 16
        });
        this.artistName.setOrigin(0, 0.5);
        
        this.musicLabel = this.add.text(config.width/2, 85, "Music By", {
            fontFamily: 'Monkey',
            fontSize: 12,
            align: "center",
            resolution: 16,
            color: "#6b6191"
        });
        this.musicLabel.setOrigin(0.5);
        
        this.musicianName = this.add.text(config.width/2 - 59, 104, "pascalbelisle.com", {
            fontFamily: 'Monkey',
            fontSize: 12,
            align: "left",
            resolution: 16,
            color: "#eef78c"
        });
        this.musicianName.setOrigin(0, 0.5);
        
        this.codeLabel = this.add.text(config.width/2, 135, "Code By", {
            fontFamily: 'Monkey',
            fontSize: 12,
            align: "center",
            resolution: 16,
            color: "#ab2c2a"
        });
        this.codeLabel.setOrigin(0.5);
        
        this.coderName = this.add.text(config.width/2 - 40, 154, "@impactophaser", {
            fontFamily: 'Monkey',
            fontSize: 12,
            align: "left",
            resolution: 16
        });
        this.coderName.setOrigin(0, 0.5);
    }
    
    create() {
        this.input.on('pointerdown', function() {
            
        }, this);
    }
    
    // general methods
    
}