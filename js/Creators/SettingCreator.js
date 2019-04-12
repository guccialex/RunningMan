
class SettingCreator{


	//initialize a gamestate
	//then return it
	//once its been created, its the only
	//reference that's needed to run the game
	//is that what I want??????

	//then return the setting


	constructor(){


		//what parameters define a setting, on a scale of 1-10

		this.richness = 4;

		this.urbanness = 5;


		//i think I need to just create a random connection of planes
		//and then use the different parameters, set up the planes to be different things

		// i sort of need like a default tree though

		//like I should define the default tree and default

		//like get a map of planes
		//then create the planes using the richness, their proximity to other things
		//the like



		//the parameters that cause the construction of the planes
		this.numberoffarmingplanes = 4;

		//the level of this setting creator
		this.level = 1;

		//the scalar for the size of the planes created
		this.sizescalar = 1;

		this.planecreator = new PlaneCreator();
	}



	//this way of generating the setting does not rely on the randomness and
	//customizability of parameters
	generatedefaultsetting(){

		//there are too many ways to generate settings

		//like

		//create a bunch of planes of the wanted "type" and then attachign them together

		//creating a bunch of empty planes attached together with "parameters"

		//and then putting the required objects in them to fufill and match its type


		//the "default setting" obviously changes
		//but im setting it up right now as



		planecreator = new PlaneCreator();

		planecreator.



		//5 is average
		planecreator.setdifficulty(5);


		//create and store 10 planes
		var planearray = [];

		planearray.push(planecreator.createblankplane());
		planearray.push(planecreator.createblankplane());
		planearray.push(planecreator.createblankplane());
		planearray.push(planecreator.createblankplane());
		planearray.push(planecreator.createblankplane());
		planearray.push(planecreator.createblankplane());
		planearray.push(planecreator.createblankplane());
		planearray.push(planecreator.createblankplane());
		planearray.push(planecreator.createblankplane());
		planearray.push(planecreator.createblankplane());


		//attach the planes to each other
		this.attachplane()

	}


	attachplane(plane1, plane2, plane1pos, plane2pos){

		//add a one way door from plane1 to plane2 in the positions that I specify

		


	}




	//you create the planes first

	//then you order them and put them in the setting

	generatesetting(){

		//using the parameters of the setting, create and return a setting

		//create 2 planes
		var firstplane = this.createfarmingplane();

		var secondplane = this.createfarmingplane();

		//var thirdplane  = this.createfarmingplane();

		//var fourthplane = this.createfarmingplane();


		//create doors between plane1-2, 2-1, 2-3, 3-2, 3-4, 4-3


		//create a setting for the planes
		var settingtoreturn = new Setting();


		//pass the plane into the setting
		settingtoreturn.passinplane(firstplane);
		settingtoreturn.passinplane(secondplane);


		return(settingtoreturn);
	}










}
