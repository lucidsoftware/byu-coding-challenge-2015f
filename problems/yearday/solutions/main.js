var readStdin = function(callback){
  var data = "";
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(chunk) {
    return data += chunk.toString();
  });
  return process.stdin.on('end', function() {
    var lines = data.split(/\n/);
    if(lines[lines.length-1] == '') {
      lines.pop();
    }
    return callback(lines);
  });
};

function isLeapYear(year){
  return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
}

function getDaysToMonth(month) {
  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
  var days = 0;
  for(var i=0; i<month-1; i++){
    days += daysInMonth[i];
  }
  return days;
}

function getDayNumber(date) {
  date = date.split('/');
  var month = parseInt(date[0],10);
  var day = parseInt(date[1],10);
  var year = parseInt(date[2]);

  var days = day + getDaysToMonth(month);
  if(month > 2 && isLeapYear(year)) days++;
  console.log(days);
  return days
};

readStdin(function(lines){
  getDayNumber(lines[0]);
});

// var dates = ['01/30/2004',
// '12/31/2008',
// '02/28/2000',
// '06/04/1200',
// '01/04/2100',
// '04/30/1900',
// '02/26/2017',
// '11/07/2015',
// '03/12/1316',
// '05/12/1311',
// '07/12/1316',
// '08/12/1311',
// '09/12/1316',
// '10/12/1311',
// '02/29/3200'];

// var days = dates.map(getDayNumber);

// var fs = require('fs');

// for(var i=0; i<dates.length; i++){
//   fs.writeFileSync('../tests/'+i+'.in',dates[i]);
//   fs.writeFileSync('../tests/'+i+'.out',days[i]);
// }