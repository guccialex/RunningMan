class ActionObject{

  constructor(manacost, healthcost, cooldown, actionname) {

    //the mana and health cost of the actions
    this.manacost = manacost;
    this.healthcost = healthcost;

    //cooldown for this move
    this.cooldown = cooldown;




    //the distance to cast this from yourself
    this.distancetoattack = 10;

    //the angle at which to cast this from yourself
    //0 is in front pi/2 is to the left, pi is behind you, -pi/2 is to the right
    this.rotationtoattack = 0;




    //does this action object create an attack
    this.doescreateattack = false;

    this.attackobjectcreator = null;

    //the size of the attack
    this.xsize = 0.5;
    this.ysize = 0.5;


    //the attack object creator
    this.timetoprime = 10;

    this.timetoexist = 10;



    //the buffs that this action inflicts on the user
    this.selfbuffsinflicted = new EntitiesBuffs();





    //whether this action needs to use the object creator to create an object
    this.doescreateobject = false;

    //the distance that you create this object in front of you
    this.distancetoobject = 1;

    this.rotationtoobject = Math.PI;

    //object creator to create an object
    this.objectcreator = null;

    this.actionname = actionname; //the name of this action

  }

  getname() {

   return (this.actionname);
   }




  //the set thing that can create attacks
  setcreatedattack(attackobjectcreator, distance, rotationtoattack) {

    this.distancetoattack = distance;
    this.rotationtoattack = rotationtoattack;

    this.doescreateattack = true;
    this.attackobjectcreator = attackobjectcreator;

  }

  setselfbuffs(buff) {
   this.selfbuffsinflicted.addbuffs(buff);
  }

  getselfbuffs() {
   return (this.selfbuffsinflicted);
  }

	setcreatedobject(objectcreator) {

    this.doescreateobject = true;
    this.objectcreator = objectcreator;

  }





  //wow, im really glad i had the foresight to make object creators a thing
  //since it really helps here

  //create the object this object creates and return it
  getcreatedobject(){

   //i need to standardize the creation of my objects with my object creators
   //to be called "createobject"
   return(this.objectcreator.createobject());

  }


	//create an attack object and return it
	getattackobject(){

		//create the object using the creator and return it
		return(this.attackobjectcreator.createobject());

	}




	//has a x and y size

	//has buffs that it can inflict on opponent and self

	//has a mana cost, "magic"
	//and a health cost, "skills" (like in demikids)

	//has an object it can create, stored in the form of an object creator
	//has the distance from the character that the object is created at

	//has a "level"? which only really signifies about the power of the stats of the action objects other qualities

	//has an identifier of it, so I know the poison cloud action is a "poisoncloud" action



}
