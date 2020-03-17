class FearAndParanoia extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, "fear_paranoia");
        
        this.type = type;
        scene.add.existing(this);
        
        if (type == "fear") {
            this.play("fear_augment");
        } else {
            this.play("paranoia_augment");
        }
    }
}