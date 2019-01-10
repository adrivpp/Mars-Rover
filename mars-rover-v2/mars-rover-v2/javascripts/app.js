// Rover Object Goes Here
var roverA = {
  id: "roverA",
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
  turn: true
};

var roverB = {
  id: "roverB",
  direction: "N",
  x: 6,
  y: 0,
  travelLog: [],
  turn: false
}

var rovers = [roverA, roverB];
// ====================== 

var board = [ 
  [null, null,null,null,null,null,null,null,null, "o"],
  [null, null,null,null,"o",null,null,null,null, null],
  [null, "o",null,null,null,null,null,"o",null, null],
  [null, null,null,null,null,null,null,null,null, null],
  [null, null,null,null,null,null,null,null,null, null],
  [null, null,"o",null,null,null,null,null,null, null],
  [null, null,null,null,null,"o",null,null,null, null],
  [null, null,null,null,null,null,null,null,null, "o"],
  [null, null,null,null,null,null,null,null,null, null],
  [null, null,"o",null,null,null,null,null,null, null] ];

// ======================
function turnLeft(rover){
  console.log("turnLeft was called!");
  switch (rover.direction) {
    case "N":
    rover.direction = "W";
    break;
    case "W":
    rover.direction = "S";
    break;
    case "S":
    rover.direction = "E";
    break;
    case "E":
    rover.direction = "N";
    break;
  }
  console.log(rover.direction);
  
};

function turnRight(rover){
  console.log("turnRight was called!");
  switch (rover.direction) {
    case "N":
    rover.direction = "E";
    break;
    case "E":
    rover.direction = "S";
    break;
    case "S":
    rover.direction = "W";
    break;
    case "W":
    rover.direction = "N";
    break;
  }
  console.log(rover.id + " direction: " + rover.direction);
};

var nextY = 0;
var nextX = 0;

function moveForward(rover) {
  console.log("move Forward was called!")
  if (rover.direction == "N") {
      nextX = rover.x;
      nextY = rover.y -1;               
  } else if (rover.direction =="S") {
      nextX = rover.x;
      nextY = rover.y + 1;                       
  } else if (rover.direction == "W") {
      nextX = rover.x - 1;      
      nextY= rover.y;      
  } else if (rover.direction == "E") {
      nextX = rover.x + 1;        
      nextY = rover.y;      
  } 
  
};

function moveBackward(rover) {
  console.log("move Backward was called!")
  
  if (rover.direction == "N") {
      nextX = rover.x;
      nextY = rover.y + 1;            
  } else if (rover.direction =="S") {
      nextX = rover.x;
      nextY = rover.y - 1;            
  } else if (rover.direction == "W") {
      nextX = rover.x + 1;     
      nextY = rover.y;    
  } else if (rover.direction == "E") {
      nextX = rover.x - 1;      
      nextY =  rover.y;   
  }
  
};

var move = true;
function checkMoves(rover) {  
  if (nextX == - 1 || nextY == -1) {
    console.log("rover can't go out of the board");
    move = false;
  } else if (board[nextY][nextX] == "o") {
    console.log("obstacle found at position [" + nextX + "," + nextY + "]" );
    move = false;
  } else {
    rover.x = nextX;
    rover.y = nextY;
    console.log("new position: [" + rover.x + "," + rover.y + "]");
    move = true;
  }
  return move;
};

function registerMoves(rover, move) {
  if (move) {     
    console.log(rover.id + " has moved!");
    rover.travelLog.push([nextX, nextY]);
    nextTurn(rover);
  } else {
    console.log(rover.id + " is not moving. Stays in: [" +
    rover.x + "," + rover.y + "]");
  }
};

function checkTurns(){
  var roverWithTurn;
  for (var rover in rovers){
    if (rovers[rover].turn) roverWithTurn = rovers[rover];
  }
  return roverWithTurn;
};

function nextTurn(currentRover){
  var indexOfCurrentRover = rovers.indexOf(currentRover);
  currentRover.turn = false;
  if(indexOfCurrentRover === rovers.length - 1)
    rovers[0].turn = true;
  else
    rovers[indexOfCurrentRover + 1].turn = true;
};

function printPositions() {
  console.log("roverA has moved to: ");
  for (var i = 0; i < roverA.travelLog.length; i++) {
    console.log(roverA.travelLog[i]);
  }
  
  console.log("roverB has moved to: ");
  for (var i = 0; i < roverB.travelLog.length; i++) {
    console.log(roverB.travelLog[i]);
  }
 
};



var com = "";
function command(com) {
  var rover;
  for (var i = 0; i < com.length; i++) {
    rover = checkTurns();
    if (com[i] == "f") {
      moveForward(rover);
      checkMoves(rover);
      registerMoves(rover, move);
    } else if (com[i] == "r") {
      turnRight(rover);
    } else if (com[i] == "l") {
      turnLeft(rover);
    } else if (com[i] == "b") {
      moveBackward(rover);
      checkMoves(rover);
      registerMoves(rover, move);
    } else {
      console.log(com[i] + " is not a command! please enter a valid command(r, f, l, b)")
    }
    
  }
 
  printPositions()
  
};