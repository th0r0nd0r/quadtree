const point = require('./point');
const Point = point.Point;
const rectangle = require('./rectangle');
const Rectangle = rectangle.Rectangle;

class QuadTree {
  constructor(boundary) {
    this.boundary = boundary;
    this.capacity = 4;
    this.points = [];
    this.subtrees = {};
    this.divided = false;

    this.insert = this.insert.bind(this);
    this.distributePoints = this.distributePoints.bind(this);
    this.divide = this.divide.bind(this);
  }

  insert(point) {
    if (this.boundary.inBounds(point)) {
      this.points.push(point);
    }

    if (this.divided) {
      this.distributePoints();
    } else if (this.points.length >= this.capacity) {
      this.divide();
    } 
  }

  distributePoints() {
    const trees = Object.values(this.subtrees);

    this.points.forEach(function(point) {
      trees.forEach(function(tree) {
        tree.insert(point);
      });
    });

    this.points = [];
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

    this.distributePoints();
    this.divided = true;
  }


}

module.exports = {QuadTree, Rectangle, Point};
