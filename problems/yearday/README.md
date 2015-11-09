# [Day of the year](http://www.spoj.com/BYU2015F/problems/YEARDAY)

Solved by: [55](http://www.spoj.com/BYU2015F/ranks/YEARDAY)

You can make post-contest submissions [here](http://www.spoj.com/problems/YEARDAY).

## Solutions

```
// Javascript
var readStdin = function(callback){
    var data = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function(chunk) {
        data += chunk;
    });
    process.stdin.on('end', function() {
        process.stdout.write(callback(data));
    });
};

readStdin(function(date) {
    var parts = date.split('/');
    var month = +parts[0];
    var year = +parts[2];

    var yearDay = parseInt(parts[1], 10);
    for (var m = 1; m < month; m++) {
        switch (m) {
            case 9: // Thirty days hath September,
            case 4: // April,
            case 6: // June,
            case 11: // and November
                yearDay += 30;
                break;
            case 2: // Except February
                if (year % 4 == 0 && !(year % 100 == 0 && !(year % 400 == 0))) {
                    yearDay += 29;
                } else {
                    yearDay += 28;
                }
            default: // All the rest have thirty-one
                yearDay += 31;
        }
    }
    return yearDay.toString();
});
```

You could also use any date libraries in your langugae's standard libraries, though you risk using a different set of rules from the description. For example, Java's poorly named 'java.util.GregorianCalendar' uses the Julian calendar before October 15, 1582, unless you instruct it otherwise. (Altthough none of the fifteen test cases happen to actually be affected by that.)

```java
// Java
import java.util.Calendar
import java.util.Date
import java.util.GregorianCalendar

class Main {
	public static void main(String[] args) {		
		GregorianCalendar calendar = new GregorianCalendar(year, month, day);
		calendar.setGregorianChange(new Date(Long.MIN_VALUE)); // always use Gregorian over Julian
		System.out.println(calendar.get(Calendar.DAY_OF_YEAR));
	}
}
```
