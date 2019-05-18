//All the actions that can be performed in the game





//an object that hold a list of all the action objects

class ActionList{

  constructor() {

    //the list of actionobjects
    this.actionobjectlist = [];

  }

  addactionobject(actionobject) {

    this.actionobjectlist.push(actionobject);

  }

  getactionobject(actionname) {



    //search through list of action objects and return the one with the matching name

    for (var iterator in this.actionobjectlist) {

      var	actionobject = this.actionobjectlist[iterator];

      if (actionobject.actionname == actionname) {

        return (actionobject);
      }

    }

    //if no action object with the name was found
    throw('no action with that name found');
    return (false);
  }

}









//the main action list
var myactionlist = new ActionList();






//create an action object
//uses the action list

function addobject(manacost, healthcost, cooldown, actionname, buffsselfapplied, isattack, distance, rotationtoattack, damagedone, timetoprime, timetoexpire, buffsofattack) {



  //create the action object
  var actionobject = new ActionObject(manacost, healthcost, cooldown, actionname);

  //set the self buff as the one given
  actionobject.setselfbuffs(buffsselfapplied);






  //the status effects that the attack gives to its target
  //buffsofattack

  //the status effect applied to the user of the attack
  //buffsselfapplied



  //if there's an attack component to the action
  if (isattack != null) {
    /*

    //create the attackobjectcreator
    var attackobjectcreator = new AttackObjectCreator(damagedone, timetoprime, timetoexpire);

    //set the buffs for its attack to inflict
    attackobjectcreator.givebuffstoinflict(buffsofattack);

    //set the attack creator for the action
    actionobject.setcreatedattack(attackobjectcreator, distance, rotationtoattack);
    */

    var attackobjectcreator = new ObjectCreator();

    attackobjectcreator.setcreatedattack(damagedone, timetoprime, timetoexpire);

    attackobjectcreator.givebuffstoinflict(buffsofattack);

    actionobject.setcreatedattack(attackobjectcreator, distance, rotationtoattack);

  }


  //add the actionobject to the actionobject list
  myactionlist.addactionobject(actionobject);

}


//the speed buff object for the stab attack

speedeffect = new StatusEffect(15);
speedeffect.setspeedeffect(-6);

longspeedeffect = new StatusEffect(100);
longspeedeffect.setspeedeffect(0);

speedbuff = new EntitiesBuffs();
speedbuff.addstatuseffect(speedeffect);
speedbuff.addstatuseffect(longspeedeffect);

//adding a stab
addobject(0, 0, 40, 'stab', speedbuff, true, 3, 0, 30, 0, 1, null);



//the regen buff for the regen effect
regeneffect = new StatusEffect(100);
regeneffect.setregen(0.5);

regenbuff = new EntitiesBuffs();
regenbuff.addstatuseffect(regeneffect);

//adding the self regen
addobject(10, 0, 10, 'self regen', regenbuff, true, 2, 0, 50, 0, 200, null);





//create destructible wall spell

//create wall entity creator







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
