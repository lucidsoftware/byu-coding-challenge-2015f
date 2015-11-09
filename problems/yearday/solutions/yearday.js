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
