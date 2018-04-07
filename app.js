import * as Classes from './quadtree.js';
// import './p5.min.js';
// import './p5.js';

const Rectangle = Classes.default.Rectangle;
const Point = Classes.default.Point;
const QuadTree = Classes.default.QuadTree;

// const requestAnimationFrame = window.requestAnimationFrame ||
//                               window.mozRequestAnimationFrame ||
//                               window.webkitRequestAnimationFrame ||
//                               window.msRequestAnimationFrame;

// const cancelAnimationFrame = window.cancelAnimationFrame ||
//                               window.mozCancelAnimationFrame ||
//                               window.webkitCancelAnimationFrame ||
//                               window.msCancelAnimationFrame;

function random(min,max) {
    return Math.random()*(max-min+1)+min;
}

// document.addEventListener("DOMContentLoaded", () => {
//   const canvas = document.getElementById("canvas");
//   const ctx = canvas.getContext("2d");
//   ctx.fillStyle = 'green';
//   ctx.fillRect(500, 350, canvas.width / 4, canvas.height / 4);
  
//   const qtree = new QuadTree(new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height));

//   for (let i = 0; i < 5; i++) {
//     qtree.insert(new Point(random(0,1000), random(0,700)));
//   }

//   console.log(qtree);


// });

function setup() {
  createCanvas(640, 480);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}

draw();