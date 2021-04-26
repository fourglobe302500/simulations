var sketch = function (p5) {
    var angle = p5.PI / 4;
    var origin = p5.createVector();
    var bob = p5.createVector();
    var g = 1;
    var speed = 0;
    var lastLen = 10;
    var lastInitialAngle = p5.PI / 4;
    var lastResistance = 1;
    var container = p5.createDiv().class("container");
    var aContainer = p5.createDiv().class("middle").parent(container);
    p5.createA("..", "Go Back").parent(aContainer);
    var lenContainer = p5.createDiv().class("middle").parent(container);
    p5.createElement("label", "Length: ")
        .style("for", "lenSlider")
        .parent(lenContainer);
    var lenSlider = p5
        .createSlider(100, p5.windowWidth / 2, 10, 10)
        .id("lenSlider")
        .parent(lenContainer);
    var lenSpan = p5.createSpan("100").parent(lenContainer);
    var angleContainer = p5.createDiv().class("middle").parent(container);
    p5.createElement("label", "Initial Angle: ")
        .style("for", "angleSlider")
        .parent(angleContainer);
    var angleSlider = p5
        .createSlider(0, p5.PI / 2, p5.PI / 4, 0.01)
        .id("angleSlider")
        .parent(angleContainer);
    var angleSpan = p5.createSpan("45º").parent(angleContainer);
    var resistenceContainer = p5.createDiv().class("middle").parent(container);
    p5.createElement("label", "Resistances Slider: ")
        .style("for", "resistanceSlider")
        .parent(resistenceContainer);
    var resistanceSlider = p5
        .createSlider(0.9, 1, 1, 0.001)
        .id("resistanceSlider")
        .parent(resistenceContainer);
    var resistanceSpan = p5.createSpan("1.000").parent(resistenceContainer);
    var getSliders = function () { return [
        lenSlider.value(),
        angleSlider.value(),
        resistanceSlider.value(),
    ]; };
    var reset = function () {
        var _a = getSliders(), len = _a[0], initialAngle = _a[1], resistance = _a[2];
        lastLen = len;
        lastInitialAngle = initialAngle;
        angle = lastInitialAngle;
        lastResistance = resistance;
        lenSpan.html(len.toString());
        angleSpan.html(p5.round(p5.map(initialAngle, 0, p5.PI / 2, 0, 90)) + "\u00BA");
        resistanceSpan.html(resistance.toFixed(3));
        bob.set(origin).add(p5.sin(angle) * len, p5.cos(angle) * len);
        speed = 0;
    };
    p5.setup = function () {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        origin.set(p5.windowWidth / 2, 0);
        reset();
    };
    p5.draw = function () {
        var _a = getSliders(), len = _a[0], initialAngle = _a[1], resistance = _a[2];
        if (len !== lastLen ||
            initialAngle !== lastInitialAngle ||
            lastResistance !== resistance) {
            reset();
        }
        var acel = (-g * p5.sin(angle)) / len;
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
    p5.windowResized = function () { return p5.resizeCanvas(p5.windowWidth, p5.windowHeight); };
};
new p5(sketch);
//# sourceMappingURL=app.js.map