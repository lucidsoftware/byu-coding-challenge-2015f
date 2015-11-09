# [Pizza slices](http://www.spoj.com/BYU2015F/problems/PZSLICE)

Solved by: [3](http://www.spoj.com/BYU2015F/ranks/PZSLICE)

You can make post-contest submissions [here](http://www.spoj.com/problems/PZSLICE).

## Solution

This is a wonderfully suitable for binary search.

Typically, binary search is thought of as happening on a data structure, such as an array. This, however, performs a binary search on a more abstract space: the size of slice.

```python
# Python 3
from operator import mul
people_count, pizza_count = map(int, input().split())
pizza_sizes = [
    reduce(mul, map(int, input().split()))
    for _ in range(pizza_count)
]

def best_size(min_size, max_size):
    if max_size - min_size < .001:
        # within error tolerance
        return min_size

    # choose the slice size and find how many we can make of that size
    slice_size = (min_size + max_size) / 2 
    slice_count = sum(pizza_size // slice_size for pizza_size in pizza_sizes)

    if slice_count >= people_count:
        # there are enough slices of the choosen size for everyone; cut larger
        return best_size(slice_size, max_size)
    else:
        # there are not enough slices of the chosen size for everyone; cut
        # smaller
        return best_size(min_size, slice_size)

print(best_size(0, max(pizza_sizes)))
# A closer upper bound would be sum(pizza_sizes) / people_count.
# Since binary search is log n, however, it really doesn't matter what you use
# for initial bounds, just so long as they are accurate.
```
