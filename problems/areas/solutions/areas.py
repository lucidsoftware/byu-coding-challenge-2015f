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
