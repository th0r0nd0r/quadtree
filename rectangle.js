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

export default Rectangle;
