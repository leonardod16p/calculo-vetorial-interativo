function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("canvas-holder");
  background(255);
}

function draw() {
  background(255);
  stroke(0);
  for (let x = 50; x < width; x += 40) {
    for (let y = 50; y < height; y += 40) {
      let dx = 0;
      let dy = x / 50; // Campo: ω = x dy
      let len = sqrt(dx * dx + dy * dy);
      let scale = 10 / len;
      line(x, y, x + dx * scale, y + dy * scale);
    }
  }
}

