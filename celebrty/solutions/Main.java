import java.util.*;

public class Main {
    public static void main(String[] args){
        Scanner scan = new Scanner(System.in);
        int n = scan.nextInt();

        boolean[][] relationships = new boolean[n][n];

        int e = scan.nextInt();

        for(int i=0; i<e; i++){
        	int a = scan.nextInt();
        	int b = scan.nextInt();
        	relationships[a][b] = true;
        }

        int candidate = 0;

        for(int i=1; i<n; i++) {
        	if(relationships[candidate][i]){
        		candidate = i;
        	}
        }
        boolean isCelebrity = true;
        for(int i=0; i<n; i++) {
        	if(i != candidate && (!relationships[i][candidate] || relationships[candidate][i])) {
        		isCelebrity = false;
        		break;
        	}
        }
        System.out.println(isCelebrity ? candidate : -1);
    }
}