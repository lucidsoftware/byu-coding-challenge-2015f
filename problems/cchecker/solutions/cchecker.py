#!/usr/bin/env python3
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
