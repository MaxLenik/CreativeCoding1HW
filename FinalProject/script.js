let song;

function preload() {
  song = loadSound('challengersmatchpoint.mp3',
    () => console.log('Sound loaded successfully'),
    (err) => console.error('Sound failed to load', err)
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
fft = new p5.FFT()
}

function draw() {
  background(0);
  stroke(255)
  noFill()

  var wave = fft.waveform()

  beginShape()
  for (var i = 0; i <width; i++) {
    var index = floor(map(i, 0, width, 0, wave.length))

    var x = i
    var y = wave[index] * 300 + height / 2
    vertex(x,y)
  }
  endShape()
}

function mouseClicked() {
  userStartAudio();
  if (song.isPlaying()) {
    song.pause();
    noLoop()
  } else {
    song.play();
    loop()
  }
}