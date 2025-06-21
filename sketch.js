let x = [];
let fourierX = [];
let font;
let rawPoints = [];

let time = 0;
let path = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  const skip = 10;
  for (let i = 0; i < drawing.length; i += skip) {
    const c = new Complex(drawing[i].x, drawing[i].y);
    x.push(c);
  }
  fourierX = dft(x);

  fourierX.sort((a, b) => b.amp - a.amp);
}

function epiCycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    const prevX = x;
    const prevY = y;

    const { freq, amp, phase } = fourier[i];
    x += amp * cos(freq * time + phase + rotation);
    y += amp * sin(freq * time + phase + rotation);

    stroke(255, 100);
    noFill();
    ellipse(prevX, prevY, 2 * amp);

    stroke(255);
    line(prevX, prevY, x, y);
  }

  return createVector(x, y);
}

function draw() {
  background(0);

  const v = epiCycles(window.width / 2, height / 2, 0, fourierX);

  path.unshift(v);

  beginShape();
  noFill();
  stroke("yellow");
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierX.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
}
