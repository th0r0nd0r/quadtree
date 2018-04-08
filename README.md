# QuadTree

### [Live Link](https://th0r0nd0r.github.io/quadtree/)

## Overview

This project is an interactive visualization of the quadtree data structure. Here's how it works:

- When you hover your cursor over a cell, it paints a dot into the cell a few times per second.  
- Once a cell has exceeded its maximum capacity of dots, it splits into four equal cells and pushes its dots into the new child cells.

The visualizer also has a heatmap- cells turn from green to red as they fill up with dots.

## Applications

Quad trees have a range of uses, including binary image processing and 2D collision detection.  

Say you dump 1,000 hockey pucks onto an ice rink in your physics simulation.  You want to make a program that follows all the pucks and checks to see which ones collide with each other.  You could keep checking each puck to see if it has collided with every other puck (all 999) of them, but that's a lot of checks.  

if n = the # of pucks, you'd need to perform ![eq](https://user-images.githubusercontent.com/29419913/38461526-b333890c-3a87-11e8-8a13-b5b74348a854.png) comparisons, giving us a time complexity of ![O(n^2)](https://user-images.githubusercontent.com/29419913/38461532-edcab3d8-3a87-11e8-8526-0c93d7f8dddc.png). 

With 1000 pucks on the ice, that works out to 500,500 checks. For 1000 pucks, and a modest framerate of 30fps, that works out to 15015000 checks per second. 15 **billion**.  We can do better than that.
