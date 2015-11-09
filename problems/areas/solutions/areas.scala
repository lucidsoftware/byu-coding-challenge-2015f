import java.util.Scanner

object Main {
	case class Point(x: Float, y: Float) {
		def *(scalar: Float) = Point(x * scalar, y * scalar)
		def /(scalar: Float) = Point(x / scalar, y / scalar)
		def -(point: Point) = Point(x - point.x, y - point.y)
		def ×(point: Point) = x * point.y - point.x * y 
	}

	def main(args: Array[String]) = {
		val scanner = new Scanner(System.in)
		val p1 = new Point(scanner.nextInt(), scanner.nextInt())
		val p2 = new Point(scanner.nextInt(), scanner.nextInt())
		val p3 = new Point(scanner.nextInt(), scanner.nextInt())
		val p4 = new Point(scanner.nextInt(), scanner.nextInt())

		val c = {
			val d1 = p1 - p3
			val d2 = p2 - p4
			(d2 * (p1 × p3) - d1 * (p2 × p4)) / (d1 × d2)
		}

		val areas = Traversable((p1, p2), (p2, p3), (p3, p4), (p4, p1)).map { case (a, b) =>
			math.abs((a × b) + (b × c) + (c × a)) / 2
		}
		println(areas.max)
	}
}