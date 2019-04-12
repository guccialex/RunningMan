class Controller{


	//set up a controller for an object
	//a very base-level one that can be directly controlled
	constructor(object){

		this.object = object;

	}


	setdirection(xdir, ydir){

		//get a direction matrix

		//set it as the direction you're moving

		this.object.setdirection(xdir, ydir);

	}



	turnleft(degree){

		var xdir = this.object.getdirection()[0];

		var ydir = this.object.getdirection()[1];



		var newxdir = Math.cos(degree)* xdir - Math.sin(degree) * ydir;

		var newydir = Math.sin(degree)* xdir +Math.cos(degree) *ydir;



		this.object.setdirection(newxdir, newydir);

	}


	turnright(degree){


		degree = -degree;



		var xdir = this.object.getdirection()[0];

		var ydir = this.object.getdirection()[1];



		var newxdir = Math.cos(degree)* xdir - Math.sin(degree) * ydir;

		var newydir = Math.sin(degree)* xdir +Math.cos(degree) *ydir;



		this.object.setdirection(newxdir, newydir);



	}


	giveaction(action){

		//gives the action to the Entities list

		this.object.giveaction(action);

	}
}
