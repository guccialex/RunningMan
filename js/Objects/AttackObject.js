

class AttackObject extends ObjectOnPlane{

	constructor(damagetoinflict, timetoprime, timetoexist){
		super();
		//when this attack lands, it clones these buffs
		//and gives them to the thing it lands on
		this.buffstoinflict = new EntitiesBuffs();

		//the amount of damage it deals when it lands
		this.damage = damagetoinflict;


		this.timetoprime = timetoprime;

		this.timeleft = timetoexist;


		//setting old variables
		this.isethral = true;

		this.istangible = false;

		this.ispickupable = false;

		this.doesdamage = true;

		//might be true, might not be
		//but i dont want this going up stairs or
		//through planes
		this.ismobile = false;
	}


	setdamage(damagetoinflict){
		this.damage = damagetoinflict;
	}
	getdamage(){
		return(this.damage);
	}



	getbuffstoinflict(){
		return(this.buffstoinflict);
	}

	//give this object the list of buffs to inflict on characters
	givebuffstoinflict(buffstoinflict){

		this.buffstoinflict.addbuffs(buffstoinflict);
	}



	landedattack(objectattacked){
		//deal damage to this object based on damage done


		if (this.timetoprime <= 0){

			objectattacked.takeattack(this.damage, this.buffstoinflict);
		}

	}

	update(){

		if (this.timeleft <= 0){
			this.isexpired = true;
		}

		this.timetoprime += -1;

		this.timeleft += -1;
	}

}
