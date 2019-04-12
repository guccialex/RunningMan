
class CharacterObject extends ObjectOnPlane{
	constructor(maxhp, maxmana, strength, speed, defense){
		super();
		this.maxhp = maxhp;
		this.currenthp = maxhp;
		this.maxmana = maxmana;
		this.currentmana = maxmana;
		this.strength = strength;
		this.speed = speed;
		this.defense = defense;

		//the object that holds the equipment and personal buffs and buffs to inflict
		this.allbuffs = new AllBuffs();

		//the direction this object is moving
		this.direction = [1,0];

		//if this object did just move
		this.didjustmove = false;

		//what actions this charachter wants to do
		this.actiontodo = null;

		//action cooldown
		this.actioncooldown = 30;


		//can be attacked
		this.isethral = false;

		//cant be passed through
		this.istangible = true;

		this.ispickupable = false;

		this.doesdamage = false;

		this.ismobile = true;


		//setting the values that the object already has

		//give it an AI
		this.isAI = false;

		//create one when you set the AI
		this.AIController = null;


		//the mesh of the characters healthcost

	}



	//give this character an AI, along with what side its on
	giveAI(){
		//set it having an AI to true
		this.isAI = true;

		//create an AI controller along with its side
		this.AIController = new AIController(this.side);
	}

	//remove the AI of it, so that i can control myguy
	removeAI(){
		this.isAI = false;

		this.AIcontroller = null;
	}




	getbuffstoinflict(){
		//get the buffs that will be inflicted
		//when this charachter attacks
		return(this.allbuffs.getbuffstoinflict());
	}

	getbuffs(){
		return(this.allbuffs.getbuffs());
	}


	setdirection(xdir, ydir){

		//the scalar is the value that i multiply x and y by to get it to abs sum to 1

		var scalar = 1/(xdir*xdir + ydir*ydir);

		xdir = xdir*scalar;

		ydir = ydir*scalar;

		//set the direction
		this.direction = [xdir,ydir];

	}


	//get the direction of the object
	getdirection(){
		return(this.direction);
	}


	//when equipment has been picked up
	giveequipment(equipment){
		var equipmenttodrop = null;

		equipmenttodrop = this.allbuffs.equip(equipment);

		//throw the old weapon on the floor if it has equipment to discard
		if (this.getplane != null){
			this.plane.dropequipment(equipmenttodrop);
		}
	}



	//give an action for this charachter to do
	giveaction(action){
		//find the action in the myactionlist list
		this.actiontodo = myactionlist.getactionobject(action);
	}


	//what to do when being hit by an attack
	takeattack(damage, buffstoinflict){
		//console.log(DMAANGE AND BUFFS);
		console.log([damage, buffstoinflict]);

		this.allbuffs.getbuffs().addbuffs(buffstoinflict);


		this.takedamage(damage);
	}

	//what to do when taking damage
	takedamage(damage){

		console.log(damage);

		var damagetotake = damage / (this.defense + this.allbuffs.getbuffs().getdefenseeffect());

		console.log(['curdef', this.defense + this.allbuffs.getbuffs()]);

		this.currenthp = this.currenthp - damagetotake;

		console.log(['curhp', this.currenthp]);

	}



	//drop a drop on the field
	dropequipment(equipment){

		//put it right behind me on the battlefield
		this.plane.addfromperspective(this,equipment,1,Math.PI);
	}



	performaction(actiontodo){



		//apply the costs, and if either cant be paid, end the method
		if (this.currenthp >= actiontodo.healthcost  &&  this.currentmana >= actiontodo.manacost ){

			this.currenthp += -actiontodo.healthcost;
			this.currentmana += -actiontodo.manacost;




			console.log(actiontodo);
			console.log(["health",this.currenthp,"mana", this.currentmana]);


			//apply the self inflicted buffs of the action
			this.allbuffs.getbuffs().addbuffs(actiontodo.getselfbuffs());




			//apply the cooldown

			this.actioncooldown += actiontodo.cooldown;



			//if this is an attack that creating an attack object
			if (actiontodo.doescreateattack == true){

				//get it to create an attack and get it with the getattackobject() method
				var attackobject = actiontodo.getattackobject();




				//apply my strength to its damage

				//strength is applied exponentially
				//which is the only way I can balance strength added by accessories
				//so that +10 on a dagger is as important as +10 on a heavy axe

				//this means, that I will need to use a (value)^strengthmodifier function
				//to determine how much the attack should change based on strength
				//im using the 10th root of 2 (= 1.0717734625), so that every 10 strength added, attack/damage doubles


				//use the strength getter of my character to get real adjusted strength
				var addedstrength = Math.pow(1.0717734625 , this.allbuffs.getbuffs().getstrengtheffect());


				//use the added strength as a multiplier to the attackobjects attack
				attackobject.setdamage(attackobject.getdamage() * addedstrength);


				//add the buffs to inflict of the character to the attack object, along with whatever
				//the actionobject already set
				attackobject.getbuffstoinflict().addbuffs(this.allbuffs.getbuffstoinflict());


				//get the distance that it wants to create the attack away from the actioner

				var attackdistance = actiontodo.distancetoattack;

				var attackrotation = actiontodo.rotationtoattack;



				//add the object to the scene using the perspective and attacker
				this.plane.addfromperspective(this, attackobject, attackdistance, attackrotation);


			}

			//if this action creates an object

			if (actiontodo.doescreateobject == true){

				//get the object and pass it into the scene
				var objecttopassin = actiontodo.getcreatedobject();

				var objectdistance = actiontodo.distancetoobject;

				var objectrotation = actiontodo.rotationtoobject;

				//pass it into the scene
				this.plane.addfromperspective(this, objecttopassin, objectdistance, objectrotation);
			}




			//let the thing calling this know that the things went off, and that it can
			//remove this action from the list of things it wants to do

			return(true);

		}

		else{

			return(false);

		}


	}



	//what happens every tick of this object
	update(){


		if (this.currenthp <= 0){
			this.isexpired = true;
		}


		//if its an AI, call its AIcontroller
		if(this.isAI){
			//this.AIcontroller.update()
		}


		//update position, and get whether it moved or not
		this.didjustmove = this.plane.updateposition(this, this.direction, (this.speed + this.allbuffs.getbuffs().getspeedeffect())*0.01);


		//see if my cooldown is zero and if I can do my action
		if (this.actioncooldown <= 0){




			if (this.actiontodo != null){
				this.performaction(this.actiontodo);
			}

			//remove that action from wanting to be done
			this.actiontodo = null;
		}


		//decrease the actioncooldown by 1 but not past 0
		this.actioncooldown += -1;

		if (this.actioncooldown < 0){
			this.actioncooldown = 0;
		}



		//apply the buffs

		//take damage with the burn damage
		//this.takedamage(this.allbuffs.getbuffs().getburn());

		//take damage from the poison damage
		//this.takedamage(this.allbuffs.getbuffs().getpoison());


		//if theres a betrayl effect, change sides to the betrayls one
		if (this.allbuffs.getbuffs().getbetrayl() == true){
			this.currentside = this.allbuffs.getbuffs().getbetraylside();
		}
		else{
			this.currentside = this.side;
		}


		//increase health because of regen
		this.currenthp = this.currenthp + this.allbuffs.getbuffs().getregen();

		//if the currentmana is over the maxmana, then decrease the currentmana
		if (this.currentmana > (this.allbuffs.getbuffs().getmaxmanaeffect()+ this.maxmana)){
			this.currentmana += -1;
		}

		//same for health
		if ( this.currenthp > (this.allbuffs.getbuffs().getmaxhpeffect() + this.maxhp)){

			console.log("mymaxhp");
			console.log(this.buffs.getbuffs().getmaxhpeffect() + this.maxhp);
			console.log("Mycurent hp");
			console.log(this.currenthp);


			this.currenthp += -1;
		}



		//tickdown the buffs
		this.allbuffs.update();
	}





	updaterender(){

		//when it renders

		//it needs to have each object update its animation frame

		//update its health and mana bar above its head

		//theres the animation they are to do
		//am




	}
}







/*

//needs to be able to take an attack
//needs to have a list of buffs
//has health
//has defense stats and shit
this.isethral = false;

//requires it to
this.istangible = true;

//requires a tickdown for its existance on the plane
//forces it to be intangible, and ethral
//has buffs to grant when held
this.ispickupable = false;

//true for attack objects
//needs the
this.doesdamage = false;

//true for character objects
//requires speed stat, which might imply buffability
//requires direction
this.ismobile = true;

*/
