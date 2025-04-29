let song;
let fft;
let lastWaveform = [];
var particles = []
function preload() {
  song = loadSound('challengersmatchpoint.mp3',
    () => console.log('Sound loaded successfully'),
    (err) => console.error('Sound failed to load', err)
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  fft = new p5.FFT();
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

fft.analyze()
  amp = fft.getEnergy(20,200)

  let wave = fft.waveform();
  if (song.isPlaying()) {
    lastWaveform = wave;
  }

  for (var i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update();
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }
  // circle
  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i <= 180; i += 0.5) {
      let index = floor(map(i, 0, 180, 0, wave.length - 1));
      let r = map(wave[index], -1, 1, 150, 350);
      let x = r * sin(i) * t;
      let y = r * cos(i);
      stroke(249, 255, 3);
      strokeWeight(3)
      noFill();
      vertex(x, y);
    }
    endShape();
  }
  // white stripes
  for (let t = -1; t <= 1; t += 2) {
    stroke(255);
    noFill();
    beginShape();
    for (let a = 0; a <= 180; a += 1) {
      let index = floor(map(a, 0, 180, 0, wave.length - 1));
      let r = map(wave[index], -1, 1, 140, 320);
      let y = r * cos(a);
      
      let xBase = 100 * t;
      let xWave = map(wave[index], -1, 1, -50, 50) * sin(a * 2);

      vertex(xBase + xWave, y);
    }
    endShape();
  }
  var p = new Particle()
  particles.push(p)

for (var i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230);
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }
  
}

function mouseClicked() {
  userStartAudio();
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop(); 
  }
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = createVector(0, 0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

    this.w = random(3, 5)
  }
  update(cond) {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (cond) {
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }
  edges() {
    if (this.pos.x < -width /2 || this.pos.x > width /2 || this.pos.y < -height /2 || this.pos.y > height /2) {
      return true
    } else {
      return false
    }
  }
  show() {
    noStroke()
    fill(249, 255, 3)
    ellipse(this.pos.x, this.pos.y, 4)
  }
}