class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  inBounds(point) {
    return (
      point.x >= this.x - this.width &&
      point.x < this.x + this.width &&
      point.y > this.y - this.height &&
      point.y <= this.y + this.height
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
  }

  insert() {

  }

  divide() {

  }


}