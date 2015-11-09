#!/usr/bin/env python3
def read_cube():
    return (input() + input() + input() + input()).replace(' ', '')

transformations = set()
def search(cube):
    if cube not in transformations:
        #   0    (original)
        # 1 2 3
        #   4
        #   5
        transformations.add(cube)
        #   1    (rotate)
        # 4 2 0
        #   3
        #   5
        search(cube[1] + cube[4] + cube[2] + cube[0] + cube[3] + cube[5])
        #   2    (rotate)
        # 1 4 3
        #   5
        #   0
        search(cube[2] + cube[1] + cube[4] + cube[3] + cube[5] + cube[0])
        #   0    (reflect)
        # 3 2 1
        #   4
        #   5
        search(cube[0] + cube[3] + cube[2] + cube[1] + cube[4] + cube[5])
search(read_cube())

input()

print('same' if read_cube() in transformations else 'different')
