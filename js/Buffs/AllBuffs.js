class AllBuffs{

	constructor(){
		//the buffs on the character not tied to equipment
		this.buffs = new EntitiesBuffs();

		//the buffs on the character not tied to equipment 
		this.buffstoinflict = new EntitiesBuffs();

		//where the equipment is held
		//are identified by their "types"
		//so you dont equip multiple ones of the same type
		this.equipment = [];
	}


	equip(newweapon){
		var displacedequipment = null;
		for (var equipiter in this.equipment){
			var curequip = this.equipment[equipiter];
			if (curequip.gettype() == curequip.gettype()){
				displacedequipment = curequip;
				this.equipment[equipiter] = newweapon;
			}
		}
		//if a weapon is displaced from this
		//return it to be thrown on the ground
		//otherwise, return Null
		return(displacedequipment);
	}

	//get the buffs that the character inflicts in total
	getbuffstoinflict(){
		return(this.buffstoinflict);
	}

	//get the buffs of the character
	getbuffs(){
		return(this.buffs);
	}

	update(){
		this.buffs.update();

		this.buffstoinflict.update();
	}

}