let player;
let obstacles = [];
let extraObstacles = [];
let exit;


function setup() {
  createCanvas(800, 800);
  playerMake();
  obstacleMake();
  exitMake();
}

function draw() {
  background(0);
  borderMake();
  obstacle1Move();
  obstacle2Move();
  obstacleClick();
  playerMove();
  exitMake();
  winscreenMake();
}

function playerMake() {
  player = {
    x: 0,
    y: height / 2,
    size: 30,
    speed: 5
  };
}

function playerMove() {
  fill(0, 255, 0);
  ellipse(player.x, player.y, player.size);

  if (keyIsDown(87)) player.y -= player.speed;
  if (keyIsDown(83)) player.y += player.speed;
  if (keyIsDown(65)) player.x -= player.speed;
  if (keyIsDown(68)) player.x += player.speed;

  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

function obstacleClick() {
  for (let obs of extraObstacles) {
    fill(255, 255, 0);
    rect(obs.x, obs.y, obs.w, obs.h);
  }
}

function obstacleMake() {
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
}

function obstacle1Move() {
  let obs = obstacles[0];
  fill(obs.color);
  rect(obs.x, obs.y, obs.w, obs.h);
  obs.x += obs.dx;
  obs.y += obs.dy;
  wrapObstacle(obs);
}

function obstacle2Move() {
  let obs = obstacles[1];
  fill(obs.color);
  rect(obs.x, obs.y, obs.w, obs.h);
  obs.x += obs.dx;
  obs.y += obs.dy;
  wrapObstacle(obs);
}

function wrapObstacle(obs) {
  if (obs.x > width) obs.x = 0;
  else if (obs.x < 0) obs.x = width;
  if (obs.y > height) obs.y = 0;
  else if (obs.y < 0) obs.y = height;
}

function borderMake() {
  noFill();
  stroke(255);
  strokeWeight(4);
  rect(0, 0, width, height);
  noStroke();
}

function exitMake() {
  if (!exit) {
    exit = {
      x: width - 50,
      y: height / 2 - 25,
      w: 40,
      h: 50,
      color: color(0, 255, 0)
    };
  }

  fill(exit.color);
  rect(exit.x, exit.y, exit.w, exit.h);
}

function winscreenMake() {
  if (
    player.x > exit.x &&
    player.x < exit.x + exit.w &&
    player.y > exit.y &&
    player.y < exit.y + exit.h
  ) {
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
