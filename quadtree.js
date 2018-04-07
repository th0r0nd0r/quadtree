class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  inBounds(point) {
    return (
      point.x >= this.x - this.width / 2 &&
      point.x < this.x + this.width / 2 &&
      point.y > this.y - this.height / 2 &&
      point.y <= this.y + this.height / 2
    );
  }
}

class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

class QuadTree {
  constructor(boundary) {
    this.boundary = boundary;
    this.capacity = 4;
    this.points = [];
    this.subtrees = {};
  }

  insert(point) {
    if (this.boundary.inBounds(point) && this.points.length < this.capacity) {
      this.points.push(point);
    } else {
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
  }


}