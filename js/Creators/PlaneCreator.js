class  PlaneCreator{

	constructor(){


		this.difficulty = 1;


		//negative for how rural it is
		//positive for how urban it is
		this.urbanness = 0;



		//what does a kingdom need a plane for

		//the ways that I can create the plane

		//need for crops

		//need for fighters

		//need for market


	}


	//this function returns a blank plane
	createblankplane(xsize, ysize){



	}




	createfarmingplane(){
		//what parameters of creation does a farming plane have?

		//create a new plane of size x and y
		var newplane = new Plane(25*this.sizescalar, 25*this.sizescalar);


		//create a new entity creator
		var entitycreator = new EntityCreator();

		//set the creator for farmers
		entitycreator.setfarmer();

		//newplane.passinentity(entitycreator.createguy(), 15, 20);
		//newplane.passinentity(entitycreator.createguy(), 10, 15);
		//newplane.passinentity(entitycreator.createguy(), 3, 3);

		//create borders along for the walls
		newplane.passinentity(entitycreator.createwall(25*this.sizescalar,1*this.sizescalar),0, 0);
		newplane.passinentity(entitycreator.createwall(1*this.sizescalar,25*this.sizescalar),0, 0);
		newplane.passinentity(entitycreator.createwall(1*this.sizescalar,25*this.sizescalar),25*this.sizescalar, 0);
		newplane.passinentity(entitycreator.createwall(25*this.sizescalar,1*this.sizescalar),0, 25*this.sizescalar);


		//returns the plane
		return(newplane);
	}





		createmarketplane(){
			var newplane = new Plane(20*this.sizescalar, 20*this.sizescalar);


			//create a new entity creator
			var entitycreator = new EntityCreator();

			//set the creator for farmers
			entitycreator.setfarmer();


			//put 7 farmers in the plane
			newplane.passinentity(entitycreator.createguy());
			newplane.passinentity(entitycreator.createguy());
			newplane.passinentity(entitycreator.createguy());
			newplane.passinentity(entitycreator.createguy());
			newplane.passinentity(entitycreator.createguy());
			newplane.passinentity(entitycreator.createguy());
			newplane.passinentity(entitycreator.createguy());
		}




			createcastleplane(){
				var newplane = new Plane(20*this.sizescalar, 20*this.sizescalar);

				//create a new entity creator
				var entitycreator = new EntityCreator();

				//set the creator for farmers
				entitycreator.setfarmer();


				//put 7 farmers in the plane
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
			}



			createforestplane(){
				var newplane = new Plane(20*this.sizescalar, 20*this.sizescalar);

				//create a new entity creator
				var entitycreator = new EntityCreator();

				//set the creator for farmers
				entitycreator.setfarmer();


				//put 7 farmers in the plane
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
				newplane.passinentity(entitycreator.createguy());
			}


}
