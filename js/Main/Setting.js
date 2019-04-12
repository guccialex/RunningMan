
class Setting {

	constructor(){
		//myguy who I need to add to this setting
		this.myguy = null;

		//it has floors and the floors have planes
		this.planes = [];

		this.firstplane = null;

		this.planestartpos = [2,2];

		//the setting has a list of kingdoms in it
		//list of kingdoms in the setting
		this.kingdoms = [];

		//this.attackobjects = [];

		//this.objects = [];
	}

	addkingdom(kingdom){

		this.kingdoms.push(kingdom);

	}


	//put him in the starting position of the starting plane
	passinmyguy(myguy){

		//console.log(this.planes);
		this.myguy = myguy;

		//get the main plane of the main floor
		//and pass in myguy as an entity
		this.firstplane.passinentity(myguy, this.planestartpos[0], this.planestartpos[1]);

	}


	//push a floor on top
	passinplane(plane){
		this.planes.push(plane);

		this.firstplane = this.planes[0];
	}





	//move the setting forwards as if 2 months passed
	update2months(){

		//apply all the "resource effects" for each of the kingdoms and their objects
		for (var eachkingdom in this.kingdoms){
			this.kingdoms[eachkingdom].twomonthresourceupdate();
		}

		//determine if the kingdom wants to heal each character and expend the necessary resources for it

		//determine if the kingdom wants to produce more people, and expend the necessary resources for it

		//determine how the kingdom wants to withdraw or deposit people on each of the planes

		//call the "two months pass" function on each of the characters to age them more
		//do this by calling it for each plane
		for (var eachplane in this.planes){
			this.planes[eachplane].twomonthspass();
		}

		//the kingdom can use its resources to create more objects in these plains if it wants

	}




	//whats done every tick
	update(){
		//the AI and player input is done already before this function

		//update everything on the plane
		//that myguy is in

		//get the plane that myguy is in
		var currentplane = this.myguy.getplane();

		//update the objects and attacks on that plane
		currentplane.update();
	}



	//dont need to do this
	//all this is done in the gamestate

	//tell all the meshs in the current plane to update for rendering
	//updaterender(){

	//	var currentplane = this.myguy.getplane();

	//	currentplane.updaterender();
	//}




}
