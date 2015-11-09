function Board() {
    this.width = 9;
    this.board = Array.apply(null, Array(this.width)).map(function() {
        return Array.apply(null, Array(this.width)).map(function() {
            return false;
        }, this);
    }, this);
}

Board.prototype.numberToPos = function(n) {
    return {
        row: Math.floor((n - 1) / this.width),
        col: (n - 1) % this.width,
    };
}

Board.prototype.posToNumber = function(pos) {
    return pos.row * this.width + pos.col + 1;
}

Board.prototype.addPiece = function(pos) {
    this.board[pos.row][pos.col] = true;
}

Board.prototype.distanceFromGoal = function(pos) {
    return Math.abs(this.width - (pos.row + 1))
        + Math.abs(this.width - (pos.col + 1));
}

Board.prototype.possibleMoves = function(pos) {
    var moves = [];

    // jumps
    var visited = {};
    (function traverse(pos) { 
        var key = pos.row + ',' + pos.col;
        if(!visited[key]) {
            visited[key] = true;
            moves.push(pos);

            Board.directions.forEach(function(d) {
                if(this.isOccupied(Board.next(pos, d, 1))) {
                    var newPos = Board.next(pos, d, 2);
                    if (!this.isOccupied(newPos)) {
                        traverse.call(this, newPos);
                    }
                }
            }, this);
        }
    }).call(this, pos); 
    moves.splice(0, 1); // cannot stay in same place

    // adjacent
    Board.directions.forEach(function(d) {
        var newPos = Board.next(pos, d, 1);
        if (!this.isOccupied(newPos)) {
            moves.push(newPos);
        }
    }, this);

    return moves;
};

Board.prototype.findClosestToGoal = function(pos) {
    var closest = this.possibleMoves(pos)
        .map(function(move) {
              return {
                distance: this.distanceFromGoal(move),
                move: move,
                num: this.posToNumber(move),
            };
        }, this)
        .reduce(function(closest, move) {
            var compare = closest.distance - move.distance || move.num - closest.num;
            return compare <= 0 ? closest : move;
        });
    return closest.move;
};

Board.prototype.isOccupied = function(pos) {
    return pos.row < 0 || pos.col < 0
        || pos.row >= this.width || pos.col >= this.width
        || this.board[pos.row][pos.col];
};

Board.directions = [
    {row:  0, col: -1},
    {row:  0, col:  1},
    {row: -1, col:  0},
    {row:  1, col:  0},
    {row:  1, col: -1},
    {row: -1, col:  1},
];

Board.next = function(pos, direction, n) {
    return {
        row: pos.row + n * direction.row,
        col: pos.col + n * direction.col
    };
};

var readStdin = function(callback){
    var data = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function(chunk) {
        data += chunk.toString();
    });
    return process.stdin.on('end', function() {
        process.stdout.write(callback(data));
    });
};

readStdin(function(data){
    var numbers = data.split('\n').map(function(line) {
        return line.split(' ').map(function(number) {
            return parseInt(number, 10);
        });
    });

    var board = new Board();
    numbers[0].map(board.numberToPos, board).forEach(board.addPiece, board);

    var solution = numbers[1].map(board.numberToPos, board)
        .map(board.findClosestToGoal, board)
        .map(board.posToNumber, board);
    return solution.join('\n') + '\n';
});
