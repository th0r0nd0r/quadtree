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
    this.capacity = 5;
    this.points = [];
    this.subtrees = {};
    this.divided = false;

    this.insert = this.insert.bind(this);
    this.distributePoints = this.distributePoints.bind(this);
    this.divide = this.divide.bind(this);
    this.show = this.show.bind(this);
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

  show(offset) {
    
    function getColor(value, max) {
      let newValue = (value / max);
      //value from 0 to 1
      let hue = ((offset - newValue) * 200);
      return [hue,50,70];
    }

    const boxColor = getColor(this.points.length, this.capacity);
    // console.log(boxColor[0], 50, 70);

    stroke(boxColor[0], 60, 70);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(this.boundary.x, this.boundary.y, this.boundary.width - 1, this.boundary.height - 1);
    strokeWeight(4);
    stroke(color('gray'), 60, 70);
    this.points.forEach(function(pt) {
      point(pt.x, pt.y);
    })
    if (this.divided) {
      Object.values(this.subtrees).forEach(function(tree) {
        tree.show(offset);
      })
    }
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
  
// });

let canvas;
let qtree;


function setup() {
  colorMode(HSL);
  frameRate(24);
  canvas = createCanvas(1000, 700).canvas;
  // console.log(createCanvas());
  qtree = new QuadTree(new Rectangle(canvas.clientWidth / 2, canvas.clientHeight / 2, canvas.clientWidth, canvas.clientHeight));
  
  for (let i = 0; i < 50; i++) {
    qtree.insert(new Point(random(0,canvas.clientWidth), random(0,canvas.clientHeight)));
  }
  
  console.log(qtree);
  console.log(canvas);
}

let offset = 0.8;

function draw() {
  let pt = new Point(mouseX, mouseY);
  qtree.insert(pt);

  qtree.show(offset);
}

// const canvas = createCanvas(1000, 700);






// draw();