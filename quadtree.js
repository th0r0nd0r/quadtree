import Point from './point';
import Rectangle from './rectangle';

class QuadTree {
  constructor(boundary) {
    this.boundary = boundary;
    this.capacity = 4;
    this.points = [];
    this.subtrees = {};
  }

  insert(point) {
    if (this.boundary.inBounds(point)) {
      this.points.push(point);
    }
    
    if (this.points.length >= this.capacity) {
      this.divide();
    } 
  }

  divide() {
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.width;
    const h = this.boundary.height;

    const nw = new Rectangle(x - w/4, y - h/4, w/2, h/2);
    const ne = new Rectangle(x + w/4, y - h/4, w/2, h/2);
    const sw = new Rectangle(x - w/4, y + h/4, w/2, h/2);
    const se = new Rectangle(x + w/4, y + h/4, w/2, h/2);

    this.subtrees.northWest = new QuadTree(nw);
    this.subtrees.northEast = new QuadTree(ne);
    this.subtrees.southWest = new QuadTree(sw);
    this.subtrees.southEast = new QuadTree(se);

    const trees = Object.values(this.subtrees);

    this.points.forEach(function(point) {
      trees.forEach(function(tree) {
        tree.insert(point);
      });
    });

    this.points = [];
  }


}

export default {QuadTree, Rectangle, Point};
// console.log("aslkdfjasldkfjas;ldfjasldkfjasdlfj");
// console.log(QuadTree);
// console.log(Rectangle);
// console.log(Point);