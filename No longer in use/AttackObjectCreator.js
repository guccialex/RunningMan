


class AttackObjectCreator{

  constructor(damagedone, timetoprime, timetoexpire) {
    //the damage of the attack

    //should be more specific like "stab" or whatever
    this.objecttype = "attack";

    this.damagetoinflict = damagedone;

    //the buffs inflicted on whatever this attack lands on
    this.buffstoinflict = new EntitiesBuffs();

    //the ticks it takes for the attack to try to deal damage
    this.timetoprime = timetoprime;

    //the ticks of how long the attack has to exist
    this.timetoexpire = timetoexpire;

    //whether this attack does damage through the invulnerability of the character
    this.damagethroughinvul = false;

    //if the attack is traveling
    this.ismobile = false;

    //how fast it moves
    this.travelingspeed = 0;

    //the direction this travels
    this.travelingdirection = [1, 0];

    //harms everyone
    //harms everyone except those of the side its on
    this.side = 'neutral';

    this.xsize = 1;

    this.ysize = 1;

  }

  //give the buffs that are to be inflicted on the thing hit by tu
  givebuffstoinflict(entitiesbuff) {

    //add another entitybuff to this attack
    //this function copies it so you dont need to pass in a clone already
    this.buffstoinflict.addbuffs(entitiesbuff);

  }

  //create and return the object defined
  createobject() {

    //var myattack = new AttackObject(this.damagetoinflict, this.timetoprime, this.timetoexpire);

    var myattack = new NewObjectOnPlane(this.objecttype);

    myattack.makedoesdamage(this.damagetoinflict, this.timetoprime, this.timetoexpire);

    myattack.givebuffstoinflict(this.buffstoinflict);

    myattack.setxsize(this.xsize);
    myattack.setysize(this.ysize);


    return (myattack);
  }

}
