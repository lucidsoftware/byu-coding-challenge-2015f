# [Sum of fractions](http://www.spoj.com/BYU2015F/problems/SUMFRAC)

Solved by: [27](http://www.spoj.com/BYU2015F/ranks/SUMFRAC)

You can make post-contest submissions [here](http://www.spoj.com/problems/SUMFRAC).

## Solutions

The canonical GCD alogrithm is the [Euclidean algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm).

```C
// C
#include <stdio.h>

int gcd(int a, int b) {
	while(a) {
		int temp = a;
		a = b % a;
		b = temp;
	}
	return b;
}

int main() {
	int n;
	scanf('%d', &n);

	int numerator = 0, denominator = 0;
	while(n--) {
		int numerator2, denominator2;
		scanf('%d/%d', &a, &b);

		numerator = numerator * denominator2 + numerator2 * denominator;
		denominator *= denominator2;
		
		int divisor = gcd(numerator, denominator);
		numerator /= divisor;
		denominator /= divisor;
	}
	printf('%d/%d\n', numerator, denominator);

	return 0;
}
```

Since the numbers were small and few, however, any naive GCD algorithm would likely also be sufficent.

Some Pythonists realized there is a `fractions` module in the standard library.
```python
# Python 2
from fractions import Fraction

result = sum(Fraction(raw_input()) for _ in xrange(input()))
print '{}/{}'.format(result.numerator, result.denominator)
```

However, they (and others) sometimes forgot write a denominator if the result was an integer.

(Careful reading of the problem description shows that the reduced fraction form of a number -- at least in the context of this problem -- must have a numerator and denominator. This was verbally reiterated during the competition.)
