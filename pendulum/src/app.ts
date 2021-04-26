let sketch = (p5: p5) => {
  let angle = p5.PI / 4;
  const origin = p5.createVector();
  const bob = p5.createVector();
  const g = 1;
  let speed = 0;

  let lastLen = 10;
  let lastInitialAngle = p5.PI / 4;
  let lastResistance = 1;
  const container = p5.createDiv().class("container");
  const aContainer = p5.createDiv().class("middle").parent(container);
  p5.createA("..", "Go Back").parent(aContainer);
  const lenContainer = p5.createDiv().class("middle").parent(container);
  p5.createElement("label", "Length: ")
    .style("for", "lenSlider")
    .parent(lenContainer);
  const lenSlider = p5
    .createSlider(100, p5.windowWidth / 2, 10, 10)
    .id("lenSlider")
    .parent(lenContainer);
  const lenSpan = p5.createSpan("100").parent(lenContainer);
  const angleContainer = p5.createDiv().class("middle").parent(container);
  p5.createElement("label", "Initial Angle: ")
    .style("for", "angleSlider")
    .parent(angleContainer);
  const angleSlider = p5
    .createSlider(0, p5.PI / 2, p5.PI / 4, 0.01)
    .id("angleSlider")
    .parent(angleContainer);
  const angleSpan = p5.createSpan("45º").parent(angleContainer);
  const resistenceContainer = p5.createDiv().class("middle").parent(container);
  p5.createElement("label", "Resistances Slider: ")
    .style("for", "resistanceSlider")
    .parent(resistenceContainer);
  const resistanceSlider = p5
    .createSlider(0.9, 1, 1, 0.001)
    .id("resistanceSlider")
    .parent(resistenceContainer);
  const resistanceSpan = p5.createSpan("1.000").parent(resistenceContainer);

  const getSliders = () => [
    lenSlider.value() as number,
    angleSlider.value() as number,
    resistanceSlider.value() as number,
  ];

  const reset = () => {
    const [len, initialAngle, resistance] = getSliders();
    lastLen = len;
    lastInitialAngle = initialAngle;
    angle = lastInitialAngle;
    lastResistance = resistance;
    lenSpan.html(len.toString());
    angleSpan.html(`${p5.round(p5.map(initialAngle, 0, p5.PI / 2, 0, 90))}º`);
    resistanceSpan.html(resistance.toFixed(3));
    bob.set(origin).add(p5.sin(angle) * len, p5.cos(angle) * len);
    speed = 0;
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    origin.set(p5.windowWidth / 2, 0);
    reset();
  };

  p5.draw = () => {
    const [len, initialAngle, resistance] = getSliders();
    if (
      len !== lastLen ||
      initialAngle !== lastInitialAngle ||
      lastResistance !== resistance
    ) {
      reset();
    }

    const acel = (-g * p5.sin(angle)) / len;

    angle += speed += acel;

    speed *= resistance;

    bob.set(origin).add(len * p5.sin(angle), len * p5.cos(angle));

    p5.background(255)
      .strokeWeight(2)
      .stroke(0)
      .fill(125)
      .line(origin.x, origin.y, bob.x, bob.y)
      .ellipse(bob.x, bob.y, 10, 10);
  };

  p5.windowResized = () => p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
};

new p5(sketch);
