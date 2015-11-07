import java.util.*;

public class Main {

	private static class Point {
		float x, y;
		Point(float x, float y) {
			this.x = x;
			this.y = y;
		}
	}

	public static void main(String[] args){
		Scanner scan = new Scanner(System.in);
		Point p1 = new Point(scan.nextInt(), scan.nextInt());
		Point p2 = new Point(scan.nextInt(), scan.nextInt());
		Point p3 = new Point(scan.nextInt(), scan.nextInt());
		Point p4 = new Point(scan.nextInt(), scan.nextInt());
		Point center = intersection(p1,p3,p2,p4);

		float maxArea = 0;
		maxArea = Math.max(maxArea, area(p1,p2,center));
		maxArea = Math.max(maxArea, area(p2,p3,center));
		maxArea = Math.max(maxArea, area(p3,p4,center));
		maxArea = Math.max(maxArea, area(p4,p1,center));
		System.out.println(maxArea);
	}

	public static float area(Point p1, Point p2, Point p3) {
		return Math.abs(p1.x*p2.y + p2.x*p3.y + p3.x*p1.y - p2.x*p1.y - p3.x*p2.y - p1.x*p3.y)/2;
	}

	public static Point intersection(Point p1,Point p2,Point p3,Point p4) {
		float dx1 = p1.x - p2.x;
		float dx2 = p3.x - p4.x;
		float dy1 = p1.y - p2.y;
		float dy2 = p3.y - p4.y;

		float a = (p1.x*p2.y - p1.y*p2.x);
		float b = (p3.x*p4.y - p3.y*p4.x);
		float c = dx1*dy2 - dy1*dx2;

		float x = a*dx2 - b*dx1;
		float y = a*dy2 - b*dy1;

		return new Point(x/c,y/c);
	}
}