function Cube(up,down,left,right,front,back) {
  this.up = up;
  this.down = down;
  this.left = left;
  this.right = right;
  this.front = front;
  this.back = back;
}

Cube.prototype.turnLeft = function(){
  var f = this.front;
  this.front = this.right;
  this.right = this.back;
  this.back = this.left;
  this.left = f;
}

Cube.prototype.turnRight = function(){
  var f = this.front;
  this.front = this.left;
  this.left = this.back;
  this.back = this.right;
  this.right = f;
}

Cube.prototype.turnUp = function(){
  var f = this.front;
  this.front = this.down;
  this.down = this.back;
  this.back = this.up;
  this.up = f;
}

Cube.prototype.flip = function(){
  var left = this.left;
  this.left = this.right;
  this.right = left;
}

Cube.prototype.equals = function(other){
  var check = function(){
    return this.up == other.up && this.down == other.down && 
           this.left == other.left && this.right == other.right &&
           this.front == other.front && this.back == other.back;
  }.bind(this)

  for(var j=0; j<2; j++){
    for(var i=0; i<3; i++) {
      if(check()) return true;
      this.turnLeft();
      if(check()) return true;
      this.turnLeft();
      if(check()) return true;
      this.turnLeft();
      if(check()) return true;
      this.turnUp();
      if(check()) return true;
      this.turnRight();
      if(check()) return true;
      this.turnRight();
      if(check()) return true;
      this.turnRight();
      if(check()) return true;
      this.turnUp();
    }
    if(check()) return true;
    this.flip();
  }

  return false;
}

function compareCubes(lines){
  var cube1 = new Cube(lines[0][1],lines[2][1],
                       lines[1][0],lines[1][2],
                       lines[1][1],lines[3][1]);

  var cube2 = new Cube(lines[5+0][1],lines[5+2][1],
                       lines[5+1][0],lines[5+1][2],
                       lines[5+1][1],lines[5+3][1]);

  if(cube1.equals(cube2)) {
    console.log('same');
  } else {
    console.log('different');
  }
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

readStdin(compareCubes);
