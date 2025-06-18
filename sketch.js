let time = 0;

let waves = [];

let slider;

let timeSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(1, 20, 1);
  slider.position(10, 10);

  timeSlider = createSlider(0, 10, 1);
  timeSlider.position(10, 40);
}

function draw() {
  background(0);
  translate(200, 200);

  let x = 0;
  let y = 0;

  for (let i = 0; i < slider.value(); i++) {
    const n = i * 2 + 1;
    const radius = 50 * (4 / (n * PI));

    const prevX = x;
    const prevY = y;

    x += radius * cos(n * time);
    y += radius * sin(n * time);

    stroke(255, 100);
    noFill();
    ellipse(prevX, prevY, 2 * radius);

    stroke(255);
    line(prevX, prevY, x, y);
  }

  waves.unshift(y);

  translate(200, 0);
  line(x - 200, y, 0, waves[0]);

  beginShape();
  noFill();
  for (let i = 0; i < waves.length; i++) {
    vertex(i, waves[i]);
  }
  endShape();

  if (waves.length > 600) {
    waves.pop();
  }

  time += timeSlider.value() / 100;
}
