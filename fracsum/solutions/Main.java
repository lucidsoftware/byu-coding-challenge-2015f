import java.util.*;

public class Main {

	private static class Rational {
		int n;
		int d;

		int gcd(int a, int b){
		    return b != 0 ? gcd(b, a % b) : a;
		}

		Rational(int n, int d){
			int gcd = this.gcd(n,d);
			this.n = n/gcd;
			this.d = d/gcd;
		}

		public Rational plus(Rational o) {
			int num = n*o.d + d*o.n;
			int den = d*o.d;
			return new Rational(num, den);
		}

		public String toString(){
			return n + "/" + d;
		}
	}

    public static void main(String[] args){
        Scanner scan = new Scanner(System.in);
        int n = scan.nextInt();

        Rational sum = new Rational(0,1);

        for(int i=0; i<n; i++){
        	String fraction = scan.next();
        	String[] split = fraction.split("/");
        	Rational num = new Rational(Integer.parseInt(split[0]), Integer.parseInt(split[1]));
        	sum = sum.plus(num);
        }
        System.out.println(sum);
    }
}