class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, description) {
        super(scene, x, y, texture);
        
        scene.add.existing(this);
        
        this.zone = new Phaser.GameObjects.Zone(scene, x, y, this.width, this.height)
            .setInteractive()
            .on("pointerover", function(obj, x, y) {
                scene.events.emit("onOverSlot", this);
            })
            .on("pointerout", function(obj, x, y) {
                scene.events.emit("onOutSlot", this);
            })
        this.zone.name = description;
    }
}