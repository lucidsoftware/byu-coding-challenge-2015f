# [Chinese Checkers](http://www.spoj.com/BYU2015F/problems/CCHECKER)

Solved by: [2](http://www.spoj.com/BYU2015F/ranks/CCHECKER)

You can make post-contest submissions [here](http://www.spoj.com/problems/CCHECKER).

## Solutions

### Coordinates

You will have to work with both "flat" coordinates (the way the board is numbered) and "2D" coordinates (the visual layout of the board).

This solution principally uses the flat coordinates. The directions are ±1, ±8, ±9. Care must be taken to recognize when these directions are illegal. For example 10 does not connect to 18 in the +8 direction.

```python
# Python 3
size = 9
directions = [-size, -(size - 1), -1, 1, size - 1, size]

occupied = set(map(int, input().split()))

def next_position(position, direction):
    result = position + direction
    if 0 < result <= size * size and distance(position, result) == 1:
        return result

def distance(a, b):
    return abs((b - 1) % size - (a - 1) % size) \
        + abs((b - 1) // size - (a - 1) // size)

for start in map(int, input().split()):
    moves = []

    for direction in directions:
        adjacent = next_position(start, direction)
        if adjacent is not None and adjacent not in occupied:
            moves.append(adjacent)

    visited = set()
    def jump(position):
        if position not in visited:
            visited.add(position)
            if position != start:
                moves.append(position)
            for direction in directions:
                position1 = next_position(position, direction)
                if position1 is not None and position1 in occupied:
                    position2 = next_position(position1, direction)
                    if position2 is not None and position2 not in occupied:
                        jump(position2)
    jump(start)

    print(min(moves, key=lambda p: (distance(p, size * size), -p)))
```

The [Javascript solution](solutions/main.js) principally uses the 2D coordinates.

### Common mistakes

There is no prohibition against moving "backwards" in the problem description. (Although this is sometimes a house rule in actual chinese checkers games.)

Also, the problem description states 

> There will always be a possible move, and you cannot stay in the same place.

For example, if you start at 81, you will need to move *away* from it.