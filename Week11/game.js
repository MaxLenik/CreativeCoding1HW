let player;
let obstacles = [];
let extraObstacles = [];
let exit;

function setup() {
  createCanvas(800, 800);
  background(0);

  player = {
    x: 0,
    y: height / 2,
    size: 30,
    speed: 5
  };

  obstacles.push({
    x: random(width),
    y: random(height),
    w: 100,
    h: 40,
    color: color(255, 0, 0),
    dx: random(-2, 2),
    dy: random(-2, 2)
  });

  obstacles.push({
    x: random(width),
    y: random(height),
    w: 60,
    h: 120,
    color: color(0, 0, 255),
    dx: random(-3, 3),
    dy: random(-3, 3)
  });

  exit = {
    x: width - 50,
    y: height / 2 - 25,
    w: 40,
    h: 50,
    color: color(0, 255, 0)
  };
}

function draw() {
  background(0);

  for (let obs of obstacles) {
    fill(obs.color);
    rect(obs.x, obs.y, obs.w, obs.h);
    obs.x += obs.dx;
    obs.y += obs.dy;

    if (obs.x > width) obs.x = 0;
    else if (obs.x < 0) obs.x = width;
    if (obs.y > height) obs.y = 0;
    else if (obs.y < 0) obs.y = height;
  }

  for (let obs of extraObstacles) {
    fill(255, 255, 0);
    rect(obs.x, obs.y, obs.w, obs.h);
  }

  fill(0, 255, 0);
  ellipse(player.x, player.y, player.size);

  if (keyIsDown(87)) { // W
    player.y -= player.speed;
  } else if (keyIsDown(83)) { // S
    player.y += player.speed;
  }

  if (keyIsDown(65)) { // A
    player.x -= player.speed;
  } else if (keyIsDown(68)) { // D
    player.x += player.speed;
  }

  if (player.x < 0) player.x = 0;
  else if (player.x > width) player.x = width;
  if (player.y < 0) player.y = 0;
  else if (player.y > height) player.y = height;

  fill(exit.color);
  rect(exit.x, exit.y, exit.w, exit.h);

  if (player.x > exit.x &&
      player.x < exit.x + exit.w &&
      player.y > exit.y &&
      player.y < exit.y + exit.h) {
    fill(0, 255, 0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("You're Winner!", width / 2, height / 2);
    noLoop();
  }
}

function mousePressed() {
  extraObstacles.push({
    x: mouseX,
    y: mouseY,
    w: random(40, 100),
    h: random(20, 60)
  });
}