# [Christmas shopping](http://www.spoj.com/BYU2015F/problems/FASTSHOP)

Solved by: [1](http://www.spoj.com/BYU2015F/ranks/FASTSHOP)

You can make post-contest submissions [here](http://www.spoj.com/problems/FASTSHOP).

## Solutions

This problem had **137** submissions. It was certainly the most difficult of the ten problems, but many underestimated (1) the difficulty to solve and more significantly (2) the difficulty to solve quickly.

FYI, Midway through the competition, we had to resolve one ambiguity: whether the additional rules applied only the currently tied options, or to all options. This problem was intended to be the first way (and this did make more sense in context), though we would have accepted a solution for the second interpretation. That, however, would have been a *much, much* harder problem with the given constrainsts.

### Naive (not a solution)

Anyway, one approach is to scan from left to right, keeping a list of candidates and validating that list on each iteration. For example, suppose the sequence is 87875

Start with the first store.

```
8 7 8 7 5
^
```

It's the best so far, so it becomes a candidate. Move to the second store.

```
*
8 7 8 7 5
  ^
```

The second store is not better than the existing candidate. Move to the third store.

```
*
8 7 8 7 5
    ^
```

This third store is as good as the existing candidate. Add it as a candidate, and move to the forth store.

```
*   *
8 7 8 7 5
      ^
```

The fourth store is not as good as the existing canidates. Now, however, we also have to check the current list of candidates. (We could have done this in earlier steps, though the single candidate would have been best vacuously.) The pointer is one past our second candidate. We can compare that store with the store one past our first candidate. Both are `7`, so we keep both candidates.

```
*   *
8 7 8 7 5
        ^
```

The fifth store is not a candidate. Vetting our list of current candidates, we compare the stores that are two past the candidates, which are 8 and 5 respectively. This rules out the second candidate, and we continue with only the first.

```
*
8 7 8 7 5
          ^
```

The problem with this approach -- and many like it -- is that there are allowed to be up to 200,000 stores. Suppose the stores were `8787878787...`. The number of candidates to check would grow linearly, and the overall time would be O(n^2). At the maximum size, a quadratic solution is far too slow.

## O(n log n)

Supposed we had the sequence `878787...`

Now fast-forward to when we have two candidates and we are comparing the stores that are two after the candidates.

```
--2--
|   |
|   v
8 7 8 7 8 7
    |   ^
    |   |
    --2--
```

We would find that they are the same; i.e. 878 for the first candidate and 878 for the second candidate are equally viable. But -- and this is the crucial optimization -- we discard the second candidate anyway because the check for the first is now overlapping with the second candidate.

Take a minute and convince youself that no matter what `...` is in `8787...`, the second `8` will never be the best, smallest starting point.

This optimization ensures there is never more than log N candidates at any time.

```
*                   *       *   *
8 7 8 7 8 7 8 7 8 7 8 7 8 7 8 7 8 7
                                ^
```

Implemented, this looks like:

```python
# Python 2
string = raw_input()
# double the string to make wrap-around indexing easy
string2 = string + string

candidates = []
for i, value in enumerate(string2):
    if i < len(string):
        # we only need consider candidates really in the original string
        # this check is a nice but not critical performance improvement
        candidates.append(i)

    new_canditates = []
    for j in candidates:
        if not new_canditates:
            new_canditates.append(j)
        else:
            # compare the corresponding element (speicifically, the i-jth one)
            # of this candidate sequence and the previous one
            previous = new_canditates[-1] + i - j
            if previous < j:
                # only consider this candidate if the starting position has not
                # been eclipsed by the checked portion of the other sequence
                # this is critical for sequences like 1212121212
                # because of the optimization, there will only ever be log N canidates
                if value == string2[previous]:
                    # this candidate is as good as the previous one
                    new_canditates.append(j)
                elif value > string2[previous]:
                    # this candidate is better than the previous one, and all
                    # other previous ones
                    new_canditates = [j]
    candidates = new_canditates
    print candidates

print 1 + candidates[0]
```

I'm unsure of how the [accepted solution](http://www.spoj.com/BYU2015F/files/src/15570780/) avoided quadratic time complexity, but it certainly managed to, at least on the ten test cases.

### O(n)

This problem corresponds to the [Lexicographically minimal string rotation](https://en.wikipedia.org/wiki/Lexicographically_minimal_string_rotation).

Booth's algorithm is a solution that is a variation on the Knuth-Morris-Pratt algorithm for O(n) substring search.

It's short, but difficult to understand why it works, or that it runs in linear time.


```C++
#include <iostream>

int main() {
    string str;
    std::cin >> str;
    str += str; // for wrap-around indexing

    int *failure = new int[str.size()]; // failure function, from KMP
    std::fill_n(failure, str.size(), -1);

    int best = 0  // best index
    for (int i = 1; i < str.size(); i++) {
        int j;
        for (int j = failure[i - best - 1]; ; j = failure[j]) {
            int other = str[best + j + 1];
            if (str[i] == other) {
                failure[i - best] = j + 1;
                break;
            }
            if (i == -1) {
                if (str[i] < other) {
                    best = i;
                }
                failure[i - best] = -1
                break;
            }
            if (str[i] < other) {
                best = i - j - 1;
            }
        }
    }
    
    cout << best << "\n";
}
```

Solving this problem in linear time was *not* required, though I do recommend looking up the algorithm elsewhere and its explanation.
