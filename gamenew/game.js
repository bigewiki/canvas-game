// credit to Matt Hackett!!
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/

const startGame = () => {
  // Create the canvas
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 480;
  canvas.height = 270;

  // Background image
  var bgReady = false;
  var bgImage = new Image();
  bgImage.onload = function() {
    bgReady = true;
  };
  bgImage.src = "images/roadbg.jpg";

  // Hero image
  var heroReady = false;
  var heroImage = new Image();
  heroImage.onload = function() {
    heroReady = true;
  };
  heroImage.src = "images/hero.png";
  // Hero's a little too big...
  heroImage.width = 18;
  heroImage.height = 35;

  // Monster image
  var monsterReady = false;
  var monsterImage = new Image();
  monsterImage.onload = function() {
    monsterReady = true;
  };
  monsterImage.src = "images/caveman.png";

  // Game objects
  var hero = {
    speed: 256 // movement in pixels per second
  };
  var monster = {};
  var monstersCaught = 0;

  // Handle keyboard controls
  var keysDown = {};

  // addtional game buttons
  const upButton = document.getElementById("up-arrow");
  const leftButton = document.getElementById("left-arrow");
  const rightButton = document.getElementById("right-arrow");
  const downButton = document.getElementById("down-arrow");

  const stop = () => {
    movingUp = false;
    movingLeft = false;
    movingDown = false;
    movingRight = false;
  };

  stop();

  const moveUp = () => {
    movingUp = true;
  };

  const moveDown = () => {
    movingDown = true;
  };

  const moveLeft = () => {
    movingLeft = true;
  };

  const moveRight = () => {
    movingRight = true;
  };

  upButton.onmousedown = moveUp;
  upButton.onmouseup = stop;
  leftButton.onmousedown = moveLeft;
  leftButton.onmouseup = stop;
  rightButton.onmousedown = moveRight;
  rightButton.onmouseup = stop;
  downButton.onmousedown = moveDown;
  downButton.onmouseup = stop;
  upButton.ontouchstart = moveUp;
  upButton.ontouchend = stop;
  leftButton.ontouchstart = moveLeft;
  leftButton.ontouchend = stop;
  rightButton.ontouchstart = moveRight;
  rightButton.ontouchend = stop;
  downButton.ontouchstart = moveDown;
  downButton.ontouchend = stop;

  addEventListener(
    "keydown",
    function(e) {
      keysDown[e.keyCode] = true;
    },
    false
  );

  addEventListener(
    "keyup",
    function(e) {
      delete keysDown[e.keyCode];
    },
    false
  );

  // Reset the game when the player catches a monster
  var reset = function() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Throw the monster somewhere on the screen randomly
    monster.x =
      monsterImage.width +
      Math.random() * (canvas.width - monsterImage.width * 2);
    monster.y =
      monsterImage.width +
      Math.random() * (canvas.height - monsterImage.width * 2);
  };

  // Update game objects
  var update = function(modifier) {
    if (38 in keysDown || movingUp) {
      // Player holding up
      hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown || movingDown) {
      // Player holding down
      hero.y += hero.speed * modifier;
    }
    if (37 in keysDown || movingLeft) {
      // Player holding left
      hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown || movingRight) {
      // Player holding right
      hero.x += hero.speed * modifier;
    }

    // Are they touching?
    if (
      hero.x <= monster.x + heroImage.width &&
      monster.x <= hero.x + heroImage.width &&
      hero.y <= monster.y + heroImage.height &&
      monster.y <= hero.y + heroImage.height
    ) {
      ++monstersCaught;
      reset();
    } else if (hero.x < -40) {
      hero.x = canvas.width + 10;
    } else if (hero.x > canvas.width + 10) {
      hero.x = -40;
    } else if (hero.y < -10) {
      hero.y = -10;
    } else if (hero.y > canvas.height - 30) {
      hero.y = canvas.height - 30;
    }
  };

  // Draw everything
  var render = function() {
    if (bgReady) {
      ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
      ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
      ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    // Score
    const scoreWrapper = document.getElementById("score-wrapper");
    scoreWrapper.innerHTML = "Cavemen caught: " + monstersCaught;
  };

  // The main game loop
  var main = function() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;
  };

  // Let's play this game!
  reset();
  var then = Date.now();
  setInterval(main, 1); // Execute as fast as possible
};

window.onload = startGame;
