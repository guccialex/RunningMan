class EntityCreator{
  constructor() {

    this.direction = [1, 0];

    this.xsize = 1;
    this.ysize = 1;

    this.mymap = null;
    this.actioncooldown = 0;

    this.actiontodo = null;

    this.widesight =5;
    this.tallsight = 5;

    this.strength = 10;
    this.speed = 3;
    this.defense = 10;
    this.maxhp = 100;
    this.maxmana = 50;

    this.characterclass = 'notset';

    this.skillset = [];


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

    this.equipment = [];  //get distance between thisguy and attacktarget


    //this.side = 'neither';

    //name of object type
    this.identitifier = 'unset';

    this.difficulty = 1;



    //whether this object is controlled by AI or not
    this.isAI = false;



    //types of entities to create

    //complete list:
    //grass
    //fence
    //permanent wall
    //destructible wall
    //main guy
    //enemy farmer
    //enemy wolf
    //

    //

  }

  //set whether this is an AI or not
  setisAI(booleanvalue){

    if (booleanvalue){
      this.isAI = true;
    }
    else if(booleanvalue == false){
      this.isAI = false;
    }

  }

  setattack(attack) {
    this.attack = attack;
  }

  setdefense(defense) {
     this.defense = defense;
   }

  setspeed(speed) {
     this.speed = speed;
   }

  setmaxhp(maxhp) {
     this.maxhp = maxhp;
   }

  setmaxmana(maxmana) {
     this.maxmana = maxmana;
   }

  setweapon(weapon) {
     this.weapon = weapon;
   }

	setaccessory(accessory) {
    this.accessory = accessory;
  }

	setbodyarmor(bodyarmor) {
    this.bodyarmor = bodyarmor;
  }

	setisethral(isethral) {
    this.isethral = isethral;
  }

	setischarachter(ischarachter) {
    this.ischarachter = ischarachter;
  }

	setequipment(equipment) {
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
	//setside(theside){
		//this.side = theside;
	//}









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
		this.setspeed(5);
		this.setmaxhp(100);
		this.setmaxmana(0);
		//this.setequipment(null);
		this.setisethral(false);
		this.setischarachter(true);

		this.setidentifier("wolf");
		//this.givebuff(buff);
		this.setdifficulty(1);

    //add the stab attack to them
    this.skillset.push("stab");

		//this.setside = "enemyside";

    this.setisAI(true);

	}

	setwolf(){

	}


	setwall(){


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
			this.speed = 9;
			this.defense = 15;
			this.maxhp = 500;
			this.maxmana = 20;
		}



		//save the class and skills of whats been specified to create to specs
		this.classname = classname;

		this.skillset = listofskills;
	}



	createwall(xsize,ysize){

    var mywallobject = new NewObjectOnPlane("Wall");

    mywallobject.setxsize(xsize);
    mywallobject.setysize(ysize);

    mywallobject.maketangible();

		//var mywallobject = new WallObject(xsize,ysize);

		return(mywallobject);
	}



	createguy(){
    //stuff that needs to be set for it to be attackable
		if (this.ischarachter){

			var theguy = new NewObjectOnPlane("whadever"); //new CharacterObject(this.maxhp,this.maxmana,this.strength,this.speed,this.defense);

      theguy.makenonethral();
      theguy.maketangible();
      theguy.makeeffected();
      theguy.makeactionable();
      theguy.makemobile(this.speed*2);
      theguy.makeAI();

			theguy.setisethral(this.isethral);

			//set its class and give skills
			theguy.setclass(this.classname);

			for (var skillnum in this.skillset){
				theguy.giveskill( this.skillset[skillnum]);
			}

      //give it an AI if its an AI
      if (this.isAI){
        theguy.giveAI();
        theguy.widesight = this.widesight;
        theguy.tallsight = this.tallsight;
      }

      //return the guy as wanted
			return(theguy);
		}
	}




}
