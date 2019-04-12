//All the actions that can be performed in the game











//an object that hold a list of all the action objects

class ActionList{

	constructor(){

		//the list of actionobjects
		this.actionobjectlist = [];

	}


	addactionobject(actionobject){

		this.actionobjectlist.push(actionobject);

	}

	getactionobject(actionname){



		//search through list of action objects and return the one with the matching name

		for (var iterator in this.actionobjectlist){

			var	actionobject = this.actionobjectlist[iterator];


			if (actionobject.actionname == actionname){

				return(actionobject);
			}

		}

		//if no action object with the name was found
		throw("no action with that name found");
		return(false);
	}


}


//the main action list
var myactionlist = new ActionList();



//stab quick and close forwards midriff
var stab = new ActionObject(0,30,10,"stab");

//create an attackobjectcreator to pass into the stab function
var stabattackcreator = new AttackObjectCreator(3,20,25);


//create a new buff thing

var mybuffs = new EntitiesBuffs();

var statuseffect = new StatusEffect(220);

statuseffect.setspeedeffect(20);

mybuffs.addstatuseffect(statuseffect);


stabattackcreator.givebuffstoinflict(mybuffs);


stab.setcreatedattack(stabattackcreator, 0, Math.PI/9);


//add it to the list of actions
myactionlist.addactionobject(stab);




//create healing aura spell
var healing = new ActionObject(10,0,60,"self heal aura");

var thebuff = new EntitiesBuffs();

var healingstatus = new StatusEffect(60*10);

healingstatus.setregen(0.1);

thebuff.addstatuseffect(healingstatus);

healing.setselfbuffs(thebuff);


myactionlist.addactionobject(healing);




//create wall spell

//var castwall = new ActionObject(0,0,2,"castwall");

//var wallcreator = new EntityCreator.createwall()



/*


//create the action objects

//the different actions and their effects


//so if the thing has "myside" it heps me "theirside" it helps them and "neither" and it applies all its effects to everyone



//creates a wide wall like right behind the character
var CreateWall();

//drop a poison cloud object at your feet that inflicts poison on enemies
var  PoisonCloud

//drop a "myside" aura that only heals friends
var FriendlyHealthAura



//revive from the dead all friends within radius below level at your feet
var ReviveFriends


//ressurect from the dead, all enemies as zombies who are now on your side
var RaiseZombie


//heal all friendly charachters within range of you
var HealFriendlies


//heal all characters friendly or not within range of you
var HealAll


//Heal all objects around you, friends or not
var HealAllObjects



//for a while, you freeze temporarily any enemies you touch
var GiveSelfFreezeTouch


//you jump far and long and deal strong damage to whatever you hit
var Vault


//convert the players gold to mp
var GoldMPRestore




//attacks


//damage enemies, and give player gold equal to some portion of damage done
var ShakeGold

//damage and gain health equal to some portion of damage done
var DrainHealth


//stab longer and slower forwards midriff
var SpearStab

//swing overhead up from behind to forwards at them with lots of strength and ending lag
var SwingAction

//every time you land this hit, it increases its damage by 10%, when you miss the stack resets
var StackingStrike




//magic




//self buffs




//AOE



*/
