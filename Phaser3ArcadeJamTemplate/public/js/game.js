var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 750,
  height: 900,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var hasLogged = false

function preload() {
  this.load.image('player', 'assets/sp_player_0.png');
}

function create() {
  addPlayer(this)
  this.cursors = this.input.keyboard.createCursorKeys();
  this.physics.world.setBounds(0, 0, 750, 900, true, true, true, true);


}

function update() {
  if (this.player1) {
    if (this.cursors.left.isDown) {
      this.player1.setVelocityX(-100)
    } 
     if (this.cursors.right.isDown) {
      this.player1.setVelocityX(100)
    }
     if (this.cursors.up.isDown) {
      this.player1.setVelocityY(-100)
    }
     if (this.cursors.down.isDown) {
      this.player1.setVelocityY(100)
    }
  }

}

function addPlayer(self, playerInfo) {
  self.player1 = self.physics.add.image(375, 800, 'player').setOrigin(0.5, 0.5);
  self.player1.setDrag(100);
  self.player1.setAngularDrag(100);
  self.player1.setMaxVelocity(200);

  self.player1.body.setCollideWorldBounds(true);
  self.player1.body.onWorldBounds = true;
}
