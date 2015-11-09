# [Fold the cube](http://www.spoj.com/BYU2015F/problems/FOLDCUBE)

Solved by: [23](http://www.spoj.com/BYU2015F/ranks/FOLDCUBE)

You can make post-contest submissions [here](http://www.spoj.com/problems/FOLDCUBE).

## Solutions

There are several possible approaches.

[One team](http://www.spoj.com/BYU2015F/files/src/15570260/) created a canonical string representation of a cube, that could be compared to test equivalence.

[Another team](http://www.spoj.com/BYU2015F/files/src/15570798/) hardcoded the 48 possible comparison between cubes.

The entire transformation space can be reach with two axes of rotation, and one axis of reflection. The solution below exhausitvely enumerates the cube formed by permutations of those three transformations.

```python
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
```


The [Javascript solution](solutions/main.js) has more individual transformations, but limits the attempts to a fixed number of those transformations.
