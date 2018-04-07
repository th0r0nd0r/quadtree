import * as Classes from './quadtree.js';
const Rectangle = Classes.default.Rectangle;
const Point = Classes.default.Point;
const QuadTree = Classes.default.QuadTree;

function random(min,max) {
    return Math.random()*(max-min+1)+min;
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const qtree = new QuadTree(new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height));

  for (let i = 0; i < 5; i++) {
    qtree.insert(new Point(random(0,1000), random(0,700)));
  }

  console.log(qtree);


});