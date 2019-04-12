class AIController{

	//each object has its own AI controlling it

	constructor(thisguy, plane){

		this.thisguy = thisguy;

		this.attacktarget = null;

		this.plane = plane;


		//a list of all objects they see
		this.sight = [];
	}


	getsight(){

		//set this objects sight as a list of all objects it sees
		//in its sight range


		//get sight boxes from the object
		//use that direction to determine sight boxes

		var sightboxes = getboxes(this.thisguy.direction, this.thisguy.xposition, this.thisguy.yposition, this.thisguy.widesight, this.thisguy.tallsight);


		//set all the objects I see
		this.sight = this.plane.theintersections(sightboxes[0],sightboxes[1],sightboxes[2],sightboxes[3]);

	}



	getdistance(){
		//get distance between thisguy and attacktarget

		xdistance = this.attacktarget.xposition - this.thisguy.xposition;

		ydistance = this.attacktarget.yposition - this.thisguy.yposition;


		realdistance =  Math.sqrt(xdistance*xdistance + ydistance*ydistance);


		return (realdistance);
	}


	updatedirection(){


		xdistance = this.attacktarget.xposition - this.thisguy.xposition;

		ydistance = this.attacktarget.yposition - this.thisguy.yposition;


		//now figure out what values to give the xdirection and ydirection
		//so that they absolute sum up to 1


		//now set direction of the charachter, which will automatically be 
		//madae so it sums to 1

		this.thisguy.setdirection(xdistance,ydistance);

	}


	giveaction(){

		//decide on what actions to perform

		//right now, its just that if he's close to
		//the target, give him the stab action


	}


	updatetarget(){


		//go through objects seen, and run towards and attempt to attack
		//the closest enemy

		for (var curobject in this.sight){

			if (curobject.getside() != this.thisguy.getside()){

				this.attacktarget = curobject;


			}

		}

	}


	update(){

		//get list of objects around you
		this.getsight();


		//update target to attack
		this.updatetarget();


		//update direction to the target
		this.updatedirection();


		//if the target is some amount close

		if (this.getdistance < 4){


			//prepare attack
			this.thisguy.giveaction("stab");
		}



	}


}












