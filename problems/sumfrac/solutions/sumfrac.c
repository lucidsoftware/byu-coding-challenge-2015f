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
