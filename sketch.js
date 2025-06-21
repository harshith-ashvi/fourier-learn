const USER = 0;
const FOURIER = 1;

let x = [];
let y = []; // signal
let fourierX = [];
let fourierY = []; // discret fourier tranform of that signal

let drawing = [];
let state = -1;

let time = 0;
let path = [];

function mousePressed() {
  state = USER;
  x = [];
  y = [];
  fourierX = [];
  fourierY = [];
  time = 0;
  path = [];
  drawing = [];
}

function mouseReleased() {
  state = FOURIER;

  const skip = 1;
  for (let i = 0; i < drawing.length; i += skip) {
    x.push(drawing[i].x);
    y.push(drawing[i].y);
  }
  fourierX = dft(x);
  fourierY = dft(y);

  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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

  if (state === USER) {
    const drawingPoint = createVector(mouseX - width / 2, mouseY - height / 2);
    drawing.push(drawingPoint);
    beginShape();
    noFill();
    stroke("yellow");
    for (let i = 0; i < drawing.length; i++) {
      vertex(drawing[i].x + width / 2, drawing[i].y + height / 2);
    }
    endShape();
  } else if (state === FOURIER) {
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
}
