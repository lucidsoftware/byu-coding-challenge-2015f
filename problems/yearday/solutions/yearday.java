import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

class Main {
	public static void main(String[] args) {		
		GregorianCalendar calendar = new GregorianCalendar(year, month, day);
		calendar.setGregorianChange(new Date(Long.MIN_VALUE)); // always use Gregorian over Julian
		System.out.println(calendar.get(Calendar.DAY_OF_YEAR));
	}
}
