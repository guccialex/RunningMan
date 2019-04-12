


var body = document.body,
html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight,
	html.clientHeight, html.scrollHeight, html.offsetHeight );

var width = Math.max(html.clientWidth, html.offsetHeight, html.scrollWidth, body.scrollWidth);

var canvas = document.getElementById("mycanvas");


console.log(height);
console.log(width);


canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


console.log(window.innerHeight);
console.log(window.innerWidth);




canvas.style.left = "0px";
canvas.style.top = "0px";
canvas.style.position = "absolute";



















//disable mouse inputs
/*
//add the event listener for mouse and keyboard
canvas.addEventListener("mousedown", _MouseWasPressed, false);
//mouse down event
//mouse leaves event
canvas.addEventListener("mouseleave", _MouseUpOrOut, false);
//mouse released event
canvas.addEventListener("mouseup", _MouseUpOrOut, false);
//mouse moving over the frame event
canvas.addEventListener("mousemove", _MouseMoves, false);
*/

//key pressed events
window.addEventListener("keydown", _KeyPressed, false);
//when a key is released
window.addEventListener("keyup", _KeyUnpressed, false);




//if the mouse is currently down or not
var mouseisdown = false;

//mouse's pos
var mouseX = 100;
var mouseY = 100;

// the offset of the mouse, to account for actual placement in the canvas
var mouseXoffset = 10;
var mouseYoffset = 10;

// the list of the keys that are currently held down
var currentlydown = [];


// 30 fps
var framespersecond = 1000 * (1 / 60)



//disabling all mouse input trackers

/*
function _MouseWasPressed(e) {
  _UpdateMousePos(e);
  mouseisdown = true;

  //run for the user to use
  WhenMousePressed();
}


//called when the function leaves the frame or is released
function _MouseUpOrOut(e) {
  _UpdateMousePos(e);

  //if the mouse was held down, release it and run the user's "when mouse released" function
  if (mouseisdown == true) {
    mouseisdown = false
    WhenMouseReleased();
  }
}


function _MouseMoves(e) {
  _UpdateMousePos(e);

  //update the mouse position here, so I can do non straight lines
  WhenMouseMoved();
}



function _UpdateMousePos(e) {

    var x = e.clientX;
    var y = e.clientY;

    var cbounds = canvas.getBoundingClientRect();

    var scalerx = canvas.width / cbounds.width
    var scalery = canvas.height / cbounds.height

    mouseX = (x - cbounds.left) * scalerx
    mouseY = (y - cbounds.top) * scalery

}

*/


function _KeyPressed(e) {

	var keypressed = e.key;

  //if the key is not currently in the list, push it in, else do nothing
  if (_GetPosInList(keypressed, currentlydown) == -1) {
  	currentlydown.push(keypressed);
  }

  // The user function for when a key is pressed
  WhenKeyPressed(keypressed);
}


function _KeyUnpressed(e) {
	var keypressed = e.key;

	var indexifexists = _GetPosInList(keypressed, currentlydown)

	if (indexifexists != -1) {
    //splice to remove it from the list
    currentlydown.splice(indexifexists, 1)

    //user function if a key is released
    WhenKeyUnpressed();
}
}


function _GetPosInList(object, list) {
  //a helper function for key pressed and anything that wants to know if an object is in a list
  //if its in the list, return the position of it in the list, otherwise return -1

  var posinlist = -1

  for (var listindex = 0; listindex < list.length; listindex++) {
  	listitem = list[listindex]
  	if (listitem == object) {
  		posinlist = listindex;
  		break;
  	}
  }
  return (posinlist)
}







function getboxes(direction, xposition, yposition, wideness, tallness){


	//given a direction that one is facing

	//given their xposition, yposition

	//the xsize and ysize of the the thats coming from the sight



	//first get main direction of the boxes

	var maindirection = null;



	//get if the x or the y is more important
	if (Math.max(direction) > Math.max(direction)){

		if (maindirection[0] > 0){

			maindirection = "right";
		}
		else{
			maindirection = "left";
		}


	}
	else
	{

		if (maindirection[1] > 0){

			maindirection = "up";
		}
		else{

			maindirection = "down";
		}

	}




	var topleftx = 0;

	var toplefty = 0;

	var botrightx = 0;

	var botrighty = 0;


	if (maindirection == "up"){

		topleftx = xposition - wideness/2;

		//well i've dug my grave in "up" being positive y, so ill stick with it
		toplefty = yposition + tallness;

		botrightx = xposition + wideness/2;

		botrighty = yposition;

	}




	if (maindirection == "down"){

		topleftx = xposition - wideness/2;

		toplefty = yposition;

		botrightx = xposition + wideness/2;

		botrighty = yposition - tallness;

	}


	if (maindirection == "left"){

		topleftx = xposition + tallness;

		toplefty = yposition + wideness/2;

		botrightx = xposition;

		botrighty = yposition - wideness/2;

	}


	if (maindirection == "right"){

		topleftx = xposition;

		toplefty = yposition + wideness/2;

		botrightx = xposition + tallness;

		botrighty = yposition - wideness/2;

	}



	return([topleftx,toplefty,botrightx,botrighty]);


}







/*
//runs when mouse is clicked
function WhenMousePressed() {}

//when mouse is moved
function WhenMouseMoved() {}

//when the mouse is released or leaves the screen
function WhenMouseReleased() {}
*/





/*

//create a setting using SettingCreator



//randomly generates a setting, and fills it with entities generated
//with the entitygenerator







//create new setting in mygame, and get it
var setting1 = mygame.createsetting();


//create a floor and pass it through setting1

var floor1 = new Floor();

setting1.passinfloor(floor1);


//create a plane and pass it in through the floor

var plane1 = new Plane();

floor1.passinplane();

//create another plane in the floor

var plane2 = new Plane();

floor1.passinplane();


//create another floor in the setting

var floor2 = new Floor();

setting1.passinfloor(floor2);






//create object, with the plane entity creator

var newguy = plane2.createentity();

*/









//create a setting
var mysettingcreator = new SettingCreator();
var mysetting = mysettingcreator.generatesetting();

//that setting has a kingdom



//create new game
var mygame = new GameState();

//what class and skills i want my mainguy to have
var charachterclass = "assault fighter";
var listofskillstohave = ["double strength", "dodge"];

//create a mainguy for the game
mygame.createmainguy(charachterclass, listofskillstohave);


//pass in mysetting as the main setting for the game
//but gamestate should also be able to create a setting
mygame.passinmainsetting(mysetting);
//which make it the main setting
//which puts the main guy in it, and allows the game to start


//now it can take the controller input and give teh appropriate movements and action
//to mainguy with
//mygame.playerinput(keypressed);

//and gameloop can start running


//todo
//complete object class
//complete object creator class





//runs when key is pressed
function WhenKeyPressed(keypressed) {

	console.log(keypressed);

	//whenever the key is pressed
	//transfer it to the gamestate
	//as the player

	mygame.playerinput(keypressed);
}

//when a key is released
function WhenKeyUnpressed(keyunpressed) {}














function gameloop(){

	//console.log(mygame);

	tick();

	render();

}



setInterval(gameloop,framespersecond*2);


//tick and render functions needed

function tick(){

	mygame.update();

}



function render(){

	mygame.render();

}
