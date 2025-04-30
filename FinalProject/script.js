var song;
var img;
var fft;
var lastWaveform = [];
var particles = [];
var progressBarHeight = 20;
var progressBarY = 20;
var isDragging = false;
var targetTime = 0;
var isPaused = false;
var playPauseSize = 30;
var playPauseX = 10;
var playPauseY = 10;
var volumeLevels = [0, 0.2, 0.5, 1];
var volumeLabels = ['Vol: Mute', 'Vol: Low', 'Vol: Medium', 'Vol: High'];
var currentVolumeIndex = 2;
var volumeButtonX = 50;
var volumeButtonY = 45;
var volumeButtonWidth = 80;
var volumeButtonHeight = 20;
var showTitle = true;
var titleStartTime;
var titleDuration = 3500;

function preload() {
  song = loadSound('challengersmatchpoint.mp3');
  img = loadImage('bg3.jpg');
  ballImg = loadImage('teball.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  rectMode(CENTER);
  fft = new p5.FFT(0.4);
  song.setVolume(volumeLevels[currentVolumeIndex]);
  titleStartTime = millis();
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  fft.analyze();
  var amp = fft.getEnergy(20, 200);

  push();
  if (amp > 230) rotate(random(-0.3, 0.3));
  image(img, 0, 0, width + 10, height + 10);
  pop();

  resetMatrix();
  rectMode(CENTER);
  fill(0, map(amp, 0, 255, 180, 150));
  noStroke();
  rect(width / 2, height / 2, width, height);



  translate(width / 2, height / 2);
  var wave = fft.waveform();
  if (song.isPlaying()) lastWaveform = wave;

  // Circle
  for (var t = -1; t <= 1; t += 2) {
    beginShape();
    for (var i = 0; i <= 180; i += 0.5) {
      var index = floor(map(i, 0, 180, 0, wave.length - 1));
      var r = map(wave[index], -1, 1, 150, 350);
      var x = r * sin(i) * t;
      var y = r * cos(i);
      stroke(249, 255, 3);
      strokeWeight(3);
      noFill();
      vertex(x, y);
    }
    endShape();
  }

  // Stripes
  for (var t = -1; t <= 1; t += 2) {
    stroke(255);
    noFill();
    beginShape();
    for (var a = 0; a <= 180; a += 1) {
      var index = floor(map(a, 0, 180, 0, wave.length - 1));
      var r = map(wave[index], -1, 1, 140, 320);
      var y = r * cos(a);
      var xBase = 100 * t;
      var xWave = map(wave[index], -1, 1, -50, 50) * sin(a * 2);
      vertex(xBase + xWave, y);
    }
    endShape();
  }

  if (song.isPlaying()) {
    particles.push(new Particle());
  }
  
  for (var i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      if (song.isPlaying()) {
        particles[i].update(amp > 230, amp);
      }
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }

  resetMatrix();
  drawPlayPauseIcon();
  drawProgressBar();
  drawVolumeButton();

  if (showTitle) {
    var elapsed = millis() - titleStartTime;
    var alpha = map(elapsed, 0, titleDuration, 255, 0);
    if (elapsed >= titleDuration) {
        showTitle = false;
      } else {
        drawTitleCard(alpha);
      }
    }
  } 

function drawPlayPauseIcon() {
  noStroke();
  fill(180, 0, 255);
  var iconCenterY = progressBarY + progressBarHeight / 2 - 10;
  if (song.isPlaying()) { // Pause
    rectMode(CORNER);
    rect(playPauseX + 10, iconCenterY, 5, 20);
    rect(playPauseX + 20, iconCenterY, 5, 20);
  } else { // Play
    triangle(playPauseX + 12, iconCenterY, playPauseX + 12, iconCenterY + 20, playPauseX + 27, iconCenterY + 10);
  }
}

function drawProgressBar() { // Progress bar
  var barX = playPauseX + playPauseSize + 10;
  var barWidth = width - barX - 20;
  var duration = song.duration();
  var progress = isDragging ? map(targetTime, 0, duration, 0, barWidth) : map(song.currentTime(), 0, duration, 0, barWidth);
  noStroke();
  fill(80, 0, 120);
  rectMode(CORNER);
  rect(barX, progressBarY, barWidth, progressBarHeight, 10);
  fill(180, 0, 255);
  rect(barX, progressBarY, constrain(progress, 0, barWidth), progressBarHeight, 10);
}

function drawVolumeButton() { // Volume button
  fill(180, 0, 255);
  rect(volumeButtonX, volumeButtonY + 5, volumeButtonWidth, volumeButtonHeight, 5);
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(volumeLabels[currentVolumeIndex], volumeButtonX + volumeButtonWidth / 2, volumeButtonY + volumeButtonHeight - 4);
}
function drawTitleCard(alpha) { // TITLE CARD!!!
  push();
  resetMatrix();
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(0, alpha * 0.75);
  rectMode(CENTER);
  rect(width / 2, height / 2, windowWidth, windowHeight, 20);

  fill(255, alpha);
  textSize(44);
  textFont("Rockwell")
  text("Challengers: Match Point\n\nSong by Trent Reznor & Atticus Ross\n\nVisualized by Max Lenik\n\nHigh Volume Recommended!", width / 2, height / 2);
  pop();
}

function mousePressed() {
  if (
    mouseX > playPauseX && mouseX < playPauseX + playPauseSize &&
    mouseY > playPauseY && mouseY < playPauseY + playPauseSize
  ) {
    userStartAudio();
    if (song.isPlaying()) {
      song.pause();
      noLoop();
      isPaused = true;
    } else {
      song.play();
      loop();
      isPaused = false;
    }
    return;
  }

  var barX = playPauseX + playPauseSize + 10;
  var barWidth = width - barX - 100;
  if (
    mouseY >= progressBarY && mouseY <= progressBarY + progressBarHeight &&
    mouseX >= barX && mouseX <= barX + barWidth
  ) {
    isDragging = true;
    targetTime = map(mouseX - barX, 0, barWidth, 0, song.duration());
    if (!song.isPlaying()) {
      song.jump(constrain(targetTime, 0, song.duration()));
    }
  }

  if (
    mouseX > volumeButtonX && mouseX < volumeButtonX + volumeButtonWidth &&
    mouseY > volumeButtonY && mouseY < volumeButtonY + volumeButtonHeight
  ) {
    currentVolumeIndex = (currentVolumeIndex + 1) % volumeLevels.length;
    song.setVolume(volumeLevels[currentVolumeIndex]);
  }
}

function mouseDragged() {
  if (isDragging) {
    var barX = playPauseX + playPauseSize + 10;
    var barWidth = width - barX - 100;
    targetTime = map(mouseX - barX, 0, barWidth, 0, song.duration());
  }
}

function mouseReleased() {
  if (isDragging) {
    song.jump(constrain(targetTime, 0, song.duration()));
  }
  isDragging = false;
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250);
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
    this.w = random(3, 5);
    this.angle = random();
    this.rotationSpeed = random(-0.05, 0.05);
  }

  update(boost, amp) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  
   
  var ampFactor = map(amp, 0, 255, 10, 40);
    this.angle += this.rotationSpeed * ampFactor;
  
    if (boost) {
      this.pos.add(this.vel).add(this.vel).add(this.vel);
    }
  }
  

  edges() {
    return (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    );
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(ballImg, 0, 0, this.w * 4, this.w * 4);
    pop();
  }
}
