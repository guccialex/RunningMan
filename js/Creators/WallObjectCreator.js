class EntityCreator{
	constructor(){

	}

	createobject(){


		if (this.ischarachter){
			var theguy = new CharacterObject(this.maxhp,this.maxmana,this.strength,this.speed,this.defense);
	
			theguy.setisethral(this.isethral);


			for (var equipment in this.equipment){

				theguy.giveequipment(this.equipment[equipment]);
			}

			return(theguy);
		}



	}




}