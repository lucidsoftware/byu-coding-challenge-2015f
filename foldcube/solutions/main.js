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






// Cube.prototype.copy = function(){
//   return new Cube(this.up,this.down,
//                   this.left,this.right,
//                   this.front,this.back);
// }

// Cube.prototype.shuffle = function(){
//   for(var i=0; i<50; i++){
//     var r = Math.floor(Math.random()*3);
//     if(r == 0){
//       this.turnLeft();
//     } else if(r == 1) {
//       this.turnRight();
//     } else if(r == 2){
//       this.turnUp();
//     }
//   }
//   if(Math.random() < 0.5){
//     this.flip();
//   }
// }

// Cube.prototype.toString = function(){
//   return ' ' + this.up + ' \n' +
//          this.left + this.front + this.right + '\n' +
//          ' ' + this.down + ' \n' +
//          ' ' + this.back + ' ';
// }



// var fs = require('fs');

// var tests = [];

// function save(cube1, cube2) {
//   tests.push({
//     input:cube1.toString()+'\n\n'+cube2.toString(),
//     output:cube1.equals(cube2) ? 'same' : 'different',
//   });
// }

// var cube = new Cube('a','b','c','d','e','f');
// var rotate = new Cube('a','b','c','d','e','f');

// for(var c=0; c<2; c++){
//   for(var a=0; a<2; a++){
//     for(var b=0; b<3; b++){
//       save(cube,rotate);
//       rotate.turnLeft();
//       save(cube,rotate);
//       rotate.turnLeft();
//       save(cube,rotate);
//       rotate.turnLeft();
//       save(cube,rotate);
//       rotate.turnUp();
//       save(cube,rotate);
//       rotate.turnRight();
//       save(cube,rotate);
//       rotate.turnRight();
//       save(cube,rotate);
//       rotate.turnRight();
//       save(cube,rotate);
//       rotate.turnUp();
//     }
//     rotate.flip();
//   }
//   rotate = new Cube('a','c','b','d','f','e');
// }

// function randomCube(){
//   var letters = 'abcdefghijklmnopqrstuvwxyz';
//   return new Cube(
//     letters[Math.floor(Math.random()*letters.length)],
//     letters[Math.floor(Math.random()*letters.length)],
//     letters[Math.floor(Math.random()*letters.length)],
//     letters[Math.floor(Math.random()*letters.length)],
//     letters[Math.floor(Math.random()*letters.length)],
//     letters[Math.floor(Math.random()*letters.length)]
//   );
// }

// for(var i=0; i<30; i++){
//   var c1 = randomCube();
//   var c2 = c1.copy();
//   c2.shuffle();
//   save(c1,c2);
// }

// for(var i=0; i<30; i++){
//   var c1 = randomCube();
//   var c2 = randomCube();
//   save(c1,c2);
// }

// var shuffle = function(arr, opt_randFn) {
//   var randFn = opt_randFn || Math.random;

//   for (var i = arr.length - 1; i > 0; i--) {
//     // Choose a random array index in [0, i] (inclusive with i).
//     var j = Math.floor(randFn() * (i + 1));

//     var tmp = arr[i];
//     arr[i] = arr[j];
//     arr[j] = tmp;
//   }
// };

// shuffle(tests);
// for(var i=3; i<50; i++){
//   fs.writeFileSync('../tests/'+i+'.in',tests[i].input);
//   fs.writeFileSync('../tests/'+i+'.out',tests[i].output);
// }

