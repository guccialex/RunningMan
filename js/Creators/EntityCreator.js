class EntityCreator{
	constructor(){

		this.direction = [1,0];

		this.xsize = 1;
		this.ysize = 1;

		this.mymap = null;
		this.actioncooldown = 0;

		this.actiontodo = null;
		
		this.widesight = 5;
		this.tallsight = 10;

		this.strength = 10;
		this.speed = 3;
		this.defense = 10;
		this.maxhp = 100;
		this.maxmana = 50;


		//can be passed through
		this.isethral = false;

		//if the object is not a charachter
		//if it cant be affected by charachter buffs
		this.ischarachter = true;


		//the levels that the object exists in
		//what levels it can be hit at
		//this.islow = true;
		//this.ismid = true;
		//this.ishigh = false;
		//not going to do this, because i probably want to make a full 3d
		//implementation eventually, probably, maybe

		this.buffs = new EntitiesBuffs();

		this.equipment = [];

		this.side = "myside";

		//name of object type
		this.identitifier = "unset";

		this.difficulty = 1;
	}

	setattack(attack){
		this.attack = attack;
	}
	setdefense(defense){
		this.defense = defense;
	}
	setspeed(speed){
		this.speed = speed;
	}
	setmaxhp(maxhp){
		this.maxhp = maxhp;
	}
	setmaxmana(maxmana){
		this.maxmana = maxmana;
	}
	setweapon(weapon){
		this.weapon = weapon;
	}
	setaccessory(accessory){
		this.accessory = accessory;
	}
	setbodyarmor(bodyarmor){
		this.bodyarmor = bodyarmor;
	}
	setisethral(isethral){
		this.isethral = isethral;
	}
	setischarachter(ischarachter){
		this.ischarachter = ischarachter;
	}
	setequipment(equipment){
		this.equipment.push(equipment);
	}
	setidentifier(identitifier){
		this.setidentifier = identitifier;
	}
	givebuff(buff){
		this.buffs.passbuff(buff);
	}
	setdifficulty(difficulty){
		this.difficulty = difficulty;
	}
	setside(theside){

		this.side = theside;
	}




	//set the entity creator for creating grass
	setgrass(){
		this.setischarachter(false);

		this.setisethral(false);

		this.sethp(200);

		this.setdefense(10);

		this.setspeed(0);

		this.setidentifier("grass");

		this.setdificulty(0);
	}

	//set the entity creator for creating a crop
	setcrop(){



	}







	//set the entity creator for creating a farmer
	setfarmer(){


		this.setattack(5);
		this.setdefense(5);
		this.setspeed(2);
		this.setmaxhp(10);
		this.setmaxmana(0);
		//this.setequipment(null);
		this.setisethral(false);
		this.setischarachter(true);

		this.setidentifier("wolf");
		//this.givebuff(buff);
		this.setdifficulty(1);

		this.setside = "enemyside";

	}

	setwolf(){

		this.setattack(5);
		this.setdefense(5);
		this.setspeed(4);
		this.setmaxhp(10);
		this.setmaxmana(0);
		//this.setequipment(null);
		this.setisethral(false);
		this.setischarachter(true);

		this.setidentifier("wolf");
		//this.givebuff(buff);
		this.setdifficulty(1);

		this.setside = "enemyside";
	}


	//set the entity creator for creating a knight
	setknight(){

		this.maxhp = 100 * (1+this.difficulty*0.1);

		this.maxmana = 20 * (1+this.difficulty*0.1);

		this.strength = 15 * (1+this.difficulty*0.1);

		this.speed = 7 * (1+this.difficulty*0.1);

		this.defense = 15 * (1+this.difficulty*0.1);

	}



	//set the entity creator for creating a 



	createclass(classname, listofskills){

		if (classname == "assault fighter"){

			this.strength = 15;
			this.speed = 10;
			this.defense = 15;
			this.maxhp = 100;
			this.maxmana = 20;
		}




	}



	createwall(xsize,ysize){
		var mywallobject = new WallObject(xsize,ysize);

		return(mywallobject);
	}



	createguy(){


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