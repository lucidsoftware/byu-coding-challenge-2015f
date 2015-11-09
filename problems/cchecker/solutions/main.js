function Board() {
  this.width = 9;
  this.board = [];
  for(var i=0; i<this.width; i++) {
    this.board.push([]);
    for(var j=0; j<this.width; j++) {
      this.board[i].push(false);
    }
  }
}

Board.prototype.getPos = function(n) {
  n = n-1;
  var row = Math.floor(n/this.width);
  var col = n % this.width;
  return {row:row,col:col};
}

Board.prototype.getNum = function(pos) {
  return pos.row*this.width+pos.col+1;
}

Board.prototype.addPiece = function(n) {
  var row = Math.floor((n-1)/this.width);
  var col = (n-1) % this.width;
  this.board[row][col] = true;
}

Board.prototype.distanceFromGoal = function(pos) {
  return Math.abs(this.width-(pos.row+1)) + Math.abs(this.width-(pos.col+1));
}

Board.prototype.getPossibleMoves = function(pos){
  var neighbors = this.getNeighbors(pos);
  return neighbors.concat(this.getJumpingPossibilities(pos));
}

Board.prototype.getJumpingPossibilities = function(pos, result, visited) {
  result = result || [];
  visited = visited || {};
  visited[pos.row+','+pos.col] = true;

  var jumpingNeighbors = this.getJumpingNeighbors(pos);
  jumpingNeighbors.forEach(function(n) {
    if(!visited[n.row+','+n.col]) {
      result.push(n);
      this.getJumpingPossibilities(n, result, visited);
    }
  }, this);
  return result;
}

Board.neighborDirections = [
  {row:0,col:-1},
  {row:0,col:1},
  {row:-1,col:0},
  {row:1,col:0},
  {row:1,col:-1},
  {row:-1,col:1},
];

Board.prototype.findClosestToGoal = function(n) {
  var pos = this.getPos(n);
  var possibleMoves = this.getPossibleMoves(pos);
  var closest = possibleMoves[0];
  var closestDistance = this.distanceFromGoal(closest);
  for(var i=0; i<possibleMoves.length; i++){
    var distance = this.distanceFromGoal(possibleMoves[i]);
    if(distance < closestDistance) {
      closest = possibleMoves[i];
      closestDistance = this.distanceFromGoal(closest);
    } else if(distance == closestDistance) {
      if(this.getNum(possibleMoves[i]) > this.getNum(closest)) {
        closest = possibleMoves[i];
      }
    }
  }
  return this.getNum(closest);
}

Board.prototype.getNeighbors = function(pos) {
  var neighbors = Board.neighborDirections.map(function(d){
    return {row:pos.row + d.row, col:pos.col + d.col};
  }, this);

  return neighbors.filter(function(n){
    return n.row >= 0 && n.col >= 0 && n.row < this.width && n.col < this.width && !this.isOccupied(n.row,n.col);
  }, this);
}

Board.prototype.isOccupied = function(row, col) {
  if(row < 0 || col < 0 || row >= this.width || col >= this.width)
    return false;
  return this.board[row][col];
}

Board.prototype.getJumpingNeighbors = function(pos) {
  var neighbors = Board.neighborDirections.map(function(d) {
    if(this.isOccupied(pos.row+d.row,pos.col+d.col) && !this.isOccupied(pos.row+2*d.row,pos.col+2*d.col)) {
      return {row:pos.row+2*d.row, col:pos.col + 2*d.col};
    }
    return false;
  }, this);

  return neighbors.filter(function(n) {
    return n && n.row >= 0 && n.col >= 0 && n.row < this.width && n.col < this.width && !this.isOccupied(n.row,n.col);
  }, this);
}

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
function toNumbers(string){
  return string.split(' ').map(function(n) {
    return parseInt(n, 10);
  });
}
readStdin(function(lines){
  var board = new Board();
  toNumbers(lines[0]).forEach(function(n){board.addPiece(n)});
  var solution = toNumbers(lines[1]).map(function(n){return board.findClosestToGoal(n)});
  console.log(solution.join('\n'));
})