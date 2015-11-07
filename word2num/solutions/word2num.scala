import scala.io.Source

object Main {
	private case class Split[A](value: A) extends {
		def unapply[A](list: List[A]) = list.span(_ != value) match {
			case (first, value +: second) => Some(first, second)
			case _ => None
		}
	}

	def main(args: Array[String]): Unit = {
		val Million = Split("million")
		val Thousand = Split("thousand")
		val Hundred = Split("hundred")
		val Hyphen = Split("-")

		def value(tokens: List[String]): Int = tokens match {
			case Nil | "zero" :: Nil => 0
			case "one" :: Nil => 1
			case "two" :: Nil => 2
			case "three" :: Nil => 3
			case "four" :: Nil => 4
			case "five" :: Nil => 5
			case "six" :: Nil => 6
			case "seven" :: Nil => 7
			case "eight" :: Nil => 8
			case "nine" :: Nil => 9
			case "ten" :: Nil => 10
			case "eleven" :: Nil => 11
			case "twelve" :: Nil => 12
			case "thirteen" :: Nil => 13
			case "fourteen" :: Nil => 14
			case "fifteen" :: Nil => 15
			case "sixteen" :: Nil => 16
			case "seventeen" :: Nil => 17
			case "eighteen" :: Nil => 18
			case "nineteen" :: Nil => 19
			case "twenty" :: Nil => 20
			case "thiry" :: Nil => 30
			case "forty" :: Nil => 40
			case "fifty" :: Nil => 50
			case "sixty" :: Nil => 60
			case "seventy" :: Nil => 70
			case "eighty" :: Nil => 80
			case "ninety" :: Nil => 90
			case Million(hundreds, thousands) => value(hundreds) * 1000000 + value(thousands)
			case Thousand(hundreds1, hundreds2) =>  value(hundreds1) * 1000 + value(hundreds2)
			case Hundred(ones, tens) => value(ones) * 100 + value(tens)
			case Hyphen(tensPlace, ones) => value(tensPlace) + value(ones)
		}

		val tokens = Source.fromInputStream(System.in).mkString
			.split(" |(?=-)|(?<=-)")
		println(value(tokens.toList))
	}
}