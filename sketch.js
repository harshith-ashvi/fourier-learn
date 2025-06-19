let x = [];
let y = []; // signal
let fourierX = [];
let fourierY = []; // discret fourier tranform of that signal

let time = 0;
let path = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  const skip = 10;
  for (let i = 0; i < drawing.length; i += skip) {
    x.push(drawing[i].x);
    y.push(drawing[i].y);
  }
  fourierX = dft(x);
  fourierY = dft(y);

  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);
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

  const vx = epiCycles(window.width / 2, 100, 0, fourierX);
  const vy = epiCycles(100, height / 2, HALF_PI, fourierY);
  const v = createVector(vx.x, vy.y);

  path.unshift(v);

  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);

  beginShape();
  noFill();
  stroke("yellow");
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierY.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
}
