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

Enter the quadtree.  By splitting each region in quarters whenever n for that region is greater than it's capacity (say 6), we create a tree structure of depth ![log](https://user-images.githubusercontent.com/29419913/38461636-68d50cb6-3a8a-11e8-82cb-0c91562c9698.png) in the average case (we'll look at the worst case soon). Each leaf node contains between 0 and 6 pucks, which will only add a constant factor to our time complexity.  

So in order to do our collision check, for each puck we must traverse down ![log](https://user-images.githubusercontent.com/29419913/38461636-68d50cb6-3a8a-11e8-82cb-0c91562c9698.png) levels of the tree, and then check it against an average of 2 other pucks. multiply this by the total number of pucks and you get:

![qtree_eq](https://user-images.githubusercontent.com/29419913/38461664-3f5eef90-3a8b-11e8-865d-e9047d087342.png)

Calculating this for 1000 pucks gives us just over 600 **thousand** checks. Much more manageable.

With a roughly evenly distributed field of pucks, we reduce our time complexity down from ![O(n^2)](https://user-images.githubusercontent.com/29419913/38461532-edcab3d8-3a87-11e8-8526-0c93d7f8dddc.png) to ![nlogn](https://user-images.githubusercontent.com/29419913/38461728-856c99dc-3a8c-11e8-9638-0534c2548f08.png).

Now let's tackle the worst case scenario.  If, instead of releasing the pucks on the ice in random directions, you stacked them up directly on top of each other, you'd end up with a quadtree depth of n, not log(n).  This puts us right back at ![O(n^2)](https://user-images.githubusercontent.com/29419913/38461532-edcab3d8-3a87-11e8-8526-0c93d7f8dddc.png) time complexity.  

Luckily, this situation isn't very common in collision detection, so quadtrees are often a useful tool.  If you find your pucks stacked this way often in your data, however, you may want to consider another structure.
