var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: window.innerWidth,
  height:  window.innerHeight,
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

window.addEventListener("click",function(event){
  event.stopPropagation()
  fullscreen()
  //game.resize(window.innerWidth, window.innerHeight);
},false);



function preload() {
  this.load.image('player', 'assets/sp_player_0.png');
}

function create() {
  var player1Info = { color: 0xff0000, name: 'player1' }
  var player2Info = { color: 0x0000ff, name: 'player2' }

  addPlayer(this, player1Info)
  addPlayer(this, player2Info)

  this.cursors = this.input.keyboard.createCursorKeys();
  this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  this.physics.world.setBounds(0, 0, 750, 900, true, true, true, true);
}

function update() {
  var player1Buttons = { name: 'player1',
    up: this.cursors.up,
    down: this.cursors.down,
    left: this.cursors.left,
    right: this.cursors.right
  }

  var player2Buttons = { name: 'player2',
    up: this.wKey,
    down: this.sKey,
    left: this.aKey,
    right: this.dKey
  }

  movePlayer(this, player1Buttons)
  movePlayer(this, player2Buttons)
}

function addPlayer(self, playerInfo) {
  var name = playerInfo.name

  self[name] = self.physics.add.image(375, 800, 'player').setOrigin(0.5, 0.5);
  self[name].setDrag(100);
  self[name].setAngularDrag(100);
  self[name].setMaxVelocity(200);
  self[name].setTint(playerInfo.color)

  self[name].body.setCollideWorldBounds(true);
  self[name].body.onWorldBounds = true;
}

function movePlayer(self, options) {
  var player = self[options.name]
  if (player) {
    if (options.left.isDown) {
      player.setVelocityX(-100)
    }
     if (options.right.isDown) {
      player.setVelocityX(100)
    }
     if (options.up.isDown) {
      player.setVelocityY(-100)
    }
     if (options.down.isDown) {
      player.setVelocityY(100)
    }
  }
}

function fullscreen() {
  var elem = document.documentElement;
  if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled ||document.msFullscreenEnabled)
    {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
    }
}
