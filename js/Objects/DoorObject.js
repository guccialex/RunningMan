

//shouldnt really extend object, not a lot similar
//idk, maybe this will be something ill need to create on demand later and treat like one
class DoorObject{
	constructor(entranceplane, exitplane, exitx, exity){

		this.entranceplane = entranceplane;

		this.exitplane = exitplane;

		this.exitx = exitx;

		this.exity = exity;



		//setting old variables
		this.isethral = true;

		//this is true, but can see if it intersect with the plane door list
		this.istangible = false;

		this.ispickupable = false;

		this.doesdamage = true;

		this.ismobile = false;

	}

	//when something comes in contact with me, send them to the exit of this door
	incontact(person){

		//when a person contacts this door
		//pass it into the output plane and position

		this.exitplane.passinentity(person, this.exitx, this.exity);

	}


	//nothing should happens
	update(){



	}
}




