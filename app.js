class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.inBounds = this.inBounds.bind(this);
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



// function random(min,max) {
//     return Math.random()*(max-min+1)+min;
// }

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

// draw();