# [Quad areas](http://www.spoj.com/BYU2015F/problems/AREAS)

Solved by: [13](http://www.spoj.com/BYU2015F/ranks/AREAS)

You can make post-contest submissions [here](http://www.spoj.com/problems/AREAS).

## Solution

Since the triangle area formula was already given, the only significant part of the problem is finding the intersection of the two lines.

This is a very commonly solved problem, but it is easy to misstep in a calculation. The most common failures stem from improper handling of horizontal or vertical lines.

This shows how it can be solved with vector math:

```scala
// Scala
import java.util.Scanner

object Main {
  case class Point(x: Float, y: Float) {
    def *(scalar: Float) = Point(x * scalar, y * scalar) // scalar multiplication
    def /(scalar: Float) = Point(x / scalar, y / scalar) // scalar division
    def -(point: Point) = Point(x - point.x, y - point.y) // vector subtraction
    def ×(point: Point) = x * point.y - point.x * y // 2D cross product
  }

  def main(args: Array[String]) = {
    val scanner = new Scanner(System.in)
    val p1 = Point(scanner.nextInt(), scanner.nextInt())
    val p2 = Point(scanner.nextInt(), scanner.nextInt())
    val p3 = Point(scanner.nextInt(), scanner.nextInt())
    val p4 = Point(scanner.nextInt(), scanner.nextInt())

    val c = {
      val d1 = p1 - p3
      val d2 = p2 - p4
      (d2 * (p1 × p3) - d1 * (p2 × p4)) / (d1 × d2)
    }

    val areas = Traversable((p1, p2), (p2, p3), (p3, p4), (p4, p1)).map { case (a, b) =>
      // this is the elegent vector form of the provided area formula
      math.abs((a × b) + (b × c) + (c × a)) / 2
    }
    println(areas.max)
  }
}
```

This one use slope-intercept form (y = mx + b) to find the intersection:

```python
# Python 2
from __future__ import division
import sys

def slope_intercept((x0, y0), (x1, y1)):
    m = (y1 - y0) / (x1 - x0)
    b = y0 - m * x0
    return m, b

def intersect((u0, v0), (u1, v1)):
    if u0[0] == v0[0]:
        x = u0[0]
        m, b = slope_intercept(u1, v1)
    elif u1[0] == v1[0]:
        x = u1[0]
        m, b = slope_intercept(u0, v0)
    else:
        m, b = slope_intercept(u0, v0)
        m1, b1 = slope_intercept(u1, v1)
        x = (b1 - b) / (m - m1)
    return x, m * x + b

def area(p):
    return sum(
        p[i - 1][0] * p[i][1] - p[i][0] * p[i - 1][1]
        for i in xrange(len(p))
    )

points = [map(int, sys.stdin.readline().split()) for _ in xrange(4)]
intersection = intersect((points[0], points[2]), (points[1], points[3]))
print max(
    abs(area([points[i - 1], points[i], intersection])) / 2
    for i in xrange(len(points))
)
```
