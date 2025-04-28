var song

function preload() {
    song = loadSound('challengersmatchpoint.mp3')
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0,0,0)
}

function mouseClicked() {
    if (song.isPlaying()) {
        song.pause()
    } else {
        song.play()
    }
}