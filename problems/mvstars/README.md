# [Movie stars](http://www.spoj.com/BYU2015F/problems/MVSTARS)

Solved by: [43](http://www.spoj.com/BYU2015F/ranks/MVSTARS)

A common question was "What if there is more than one celebrity?" We wouldn't answer this during the competition, as it was discoverable from the description itself: multiple celebrities are impossible.

You can make post-contest submissions [here](http://spoj.com/problems/MVSTARS).

## Solutions

One solution is to count the number of incoming and outgoing relationships for each person. A movie star would have 0 outgoing (excluding himself) and N-1 (excluding himself) incoming relationships.

```python
# Python 3
n, e = map(int, input().split())
counts = {i:(set(i), set(i)) for i in range(n)}
for _ in range(e):
    a, b = input().split()
    counts[a][0].add(b)
    counts[b][1].add(a)
print next((i for i, (a, b) in counts.items() if len(a) == 1 and len(b) == n), -1)
```

This uses sets in case there are duplicate relationships. As it turns out, none of the test data actually had duplicate relationships, so integer counts would have sufficed.