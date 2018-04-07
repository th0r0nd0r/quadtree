import * as Classes from './quadtree.js';

console.log(Classes);

const Rectangle = Classes.default.Rectangle;
const Point = Classes.default.Point;
const QuadTree = Classes.default.QuadTree;
console.log(Rectangle);
console.log(QuadTree);


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const qtree = new QuadTree(new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height));
});