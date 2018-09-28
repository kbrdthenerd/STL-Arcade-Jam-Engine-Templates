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
  this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

  this.period = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);
  this.forwardSlash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH);

  this.backTick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKTICK);
  this.oneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

  console.log(window.innerWidth - 50)
  console.log(window.innerWidth)
  this.physics.world.setBounds(50, 50, (window.innerWidth - 100), (window.innerHeight - 100), true, true, true, true);
}

function update() {
  var player1Buttons = { name: 'player1',
    up: this.cursors.up,
    down: this.cursors.down,
    left: this.cursors.left,
    right: this.cursors.right,
    button1: this.period,
    button2: this.forwardSlash,
    color1: 0xff0000,
    color2: 0xffff00
  }

  var player2Buttons = { name: 'player2',
    up: this.wKey,
    down: this.sKey,
    left: this.aKey,
    right: this.dKey,
    button1: this.backTick,
    button2: this.oneKey,
    color1: 0x0000ff,
    color2: 0x00ffff
  }

  movePlayer(this, player1Buttons, Phaser)
  movePlayer(this, player2Buttons, Phaser)

  handleEscapePress(Phaser, this.esc)
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

function movePlayer(self, options, Phaser) {
    var player = self[options.name]
    if (player) {
        if (options.left.isDown) {
            player.setVelocityX(-200)
        }
         if (options.right.isDown) {
             player.setVelocityX(200)
        }
         if (options.up.isDown) {
             player.setVelocityY(-200)
        }
         if (options.down.isDown) {
             player.setVelocityY(200)
        }
        if(Phaser.Input.Keyboard.JustDown(options.button1)) {
            player.setTint(options.color1)
        }
        if(Phaser.Input.Keyboard.JustDown(options.button2)) {
            player.setTint(options.color2)
        }
    }
}

function handleEscapePress(Phaser, esc) {
    if (Phaser.Input.Keyboard.JustDown(esc))
     {
         var remote = require('electron').remote;
         var window = remote.getCurrentWindow();
         window.close();
     }
}
