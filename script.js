let h = screen.height/2;
let w = 318*h/550;

let NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8"]

function change_state() {
    for (let i = 0; i < 4; i++) {
      let id = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
      const element = document.getElementById(id);
      element.classList.remove("fade");
      element.classList.add("progress"); 
    }

    for (let i = 0; i < 4; i++) {
      let id = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
      const element = document.getElementById(id);
      element.classList.remove("progress");
      element.classList.add("fade"); 
    }
}



function makeSketch(imgPath, containerId) { return new p5(function(p) {
let PATH = imgPath;
let img;

const num = 6;
let area = 100;
let objects = [];
const letters = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
const chars = "█▓▒░";

class Glitch {
  constructor(w, h) {
    this.a = 0;
    this.w = w;
    this.h = h;
    this.step = 9;
    this.x = this.w;
    this.y = this.h;
    this.vx = p.random(-5, 5);
    this.vy = p.random(-5, 5);
  }

  pixelate() {
    //console.log(this.x, this.y, this.vx, this.vy);
    for (let py = this.y; py < this.y + area; py += this.step) {
      for (let px = this.x; px < this.x + area; px += this.step) {
        let idx = (p.floor(py) * img.width + p.floor(px)) * 4;
        if (idx < 0 || idx >= img.pixels.length) continue;

        let r = img.pixels[idx];
        let g = img.pixels[idx + 1];
        let b = img.pixels[idx + 2];

        let bright = (r + g + b) / 3;
        let index = p.floor(p.map(bright, 0, 255, 0, chars.length - 1));
        let indexLetters = p.floor(p.map(bright, 0, 255, 0, letters.length - 1));

        this.replacement(px, py, r, g, b, index, indexLetters);
      }
    }
  }

  replacement(px, py, r, g, b, index, indexLetters) {
    let c = chars[index];
    let l = letters[indexLetters];

    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(17);
    p.fill(r, g, b, this.a);
    p.text(c, px, py);

    p.textSize(p.random(16));
    p.fill(r * 3, b * 3, g * 3, this.a);
    p.text(l, px + 3, py + 3);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.x = 0;
      this.vx *= -1;
    } else if (this.x + area > p.width) {
      this.x = p.width - area;
      this.vx *= -1;
    }

    if (this.y < 0) {
      this.y = 0;
      this.vy *= -1;
    } else if (this.y + area > p.height) {
      this.y = p.height - area;
      this.vy *= -1;
    }
  }

  draw_glitch() {
    p.image(img, this.x, this.y, area, area, this.x, this.y, area, area);
    this.pixelate();
    if (this.a < 255) this.a += 4;
    this.move();
  }

  draw_fade() {
    p.image(img, this.x, this.y, area, area, this.x, this.y, area, area);
    this.pixelate();
    if (this.a > 0) this.a -= 10;
    this.move();    
  }
}

p.preload = function() {
  img = p.loadImage(PATH);
}

p.setup = function() { 
  p.createCanvas(w, h);
  p.background(0);
  img.resize(w, h);
  p.image(img, 0, 0);
  img.loadPixels();

  for (let i = 0; i < num; i++) {
    let w = p.floor(p.random(0, p.width - area));
    let h = p.floor(p.random(0, p.height - area));
    objects.push(new Glitch(w, h));
  }    
}

p.draw = function() {
  const element = document.getElementById(containerId);
  if (element.classList.contains("fade")) {
    if (p.frameCount % 15 == 0) {
        p.image(img, 0 ,0);
        for (let i = 0; i < objects.length; i++) objects[i].draw_fade();
    }    
  }
  else {
    if (p.frameCount % 10 == 0) {
        p.image(img, 0 ,0);
        for (let i = 0; i < objects.length; i++) objects[i].draw_glitch();
    }
  }
}
}, document.getElementById(containerId)); }

makeSketch("images/1.jpg", "1");
makeSketch("images/2.jpg", "2");
makeSketch("images/3.jpg", "3");
makeSketch("images/4.jpg", "4");
makeSketch("images/5.jpg", "5");
makeSketch("images/6.jpg", "6");
makeSketch("images/7.jpg", "7");
makeSketch("images/8.jpg", "8");


setInterval(change_state, 7000);