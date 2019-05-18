//the class for an object that is on a plane
//this is just a abstract class anyways, so the values of the variables dont matter
class NewObjectOnPlane {

  constructor(objecttype) {


    //SETTING FOR ALL OBJECTS

    //supposed to be a string of what object type it is
    //but this is covered by the "isethral" things until
    //i choose to use this
    this.objecttype = null;

    //unique identifier for this object
    this.uniqueID = (Math.random() * 100000000000000000).toString();


    this.direction = [1, 0];

    this.shapetype = "allignedbox";
    this.vertexlist = [];

    //the size of the object
    this.xsize = 1;
    this.ysize = 1;

    //if true, delete and remove this object
    this.isexpired = false;

    //the side this object is on
    this.side = 'none';

    //how much that this resource effects the player/kingdom
    //at the end of the turn
    this.resourceeffect = 0;

    //the plane this object is on
    this.plane = null;

    //the setting this object is on
    this.setting = null;

    //the age of this object in weeks
    this.age = 0;


    //create the animation object for this object with the type that it is
    this.animations = new Animations(this.objecttype);

    //set the objects animation state to idle
    this.animations.updateanimationtype('idle');



    //the object that holds the equipment and personal buffs and buffs to inflict
    this.allbuffs = new AllBuffs();




    //wont receive any attacks
    this.isethral = true;
    //can have effects applied to it
    this.iseffected = false;
    //can take actions
    this.isactionable = false;
    //can intersect on a place with other tangible objects
    this.istangible = false;
    //can be picked up
    this.ispickupable = false;
    //if this object itself does damage
    this.doesdamage = false;
    //if this object can move
    this.ismobile = false;
    //if this is a door
    this.isdoor = false;
    //if this object can be seen by the objects in the scene
    this.isvisible = true;

  }


  makenonethral() {

    //wont receive any attacks
    this.isethral = false;
    //makenonethral
    //give it
    this.maxhp = 100;
    this.currenthp = 100;
    this.maxmana = 100;
    this.currentmana = 100;
    this.defense = 10;


    this.setmaxhp = function(maxhp){
      this.maxhp = maxhp;
    }
    this.setcurrenthp = function(currenthp){
      this.currenthp = currenthp;
    }
    this.setmaxmana = function(maxmana){
      this.maxmana = maxmana;
    }
    this.setcurrentmana = function(currentmana){
      this.currentmana = currentmana;
    }
    this.setdefense = function(defense){
      this.defense = defense;
    }


    this.takedamage = function(damage) {
      var damagetotake = damage / (this.defense); // + this.allbuffs.getbuffs().getdefenseeffect());

      this.currenthp = this.currenthp - damagetotake;
    }

    this.updatemesh = function() {
      var currenthealth = this.currenthp;
      var maxhealth = this.maxhp;
      var currentmana = this.currentmana;
      var maxmana = this.maxmana;
      //give it the current health and the max health
      this.animations.updatehealthbar(currenthealth, maxhealth);
      //give it the current mana and the max mana
      this.animations.updatemanabar(currentmana, maxmana);
    }

    //dont overwrite if this is already effected
    //basically you should never have an ethral and effected object
    //has to be nonethral to be effected
    this.takeattack = function(damage, buffstoinflict) {
      this.takedamage(damage);
    }

    var cached_update = this.update;
    this.update = function() {
      cached_update.call(this);

      if (this.currenthp <= 0) {
        this.isexpired = true;
      }
    }

  }


  makeeffected() {

    //can have effects applied to it
    this.iseffected = true;

    this.takeattack = function(damage, buffstoinflict) {
      this.allbuffs.getbuffs().addbuffs(buffstoinflict);
      this.takedamage(damage);
    }

    this.givepersonalbuffs = function(thebuffs){
      this.allbuffs.getbuffs().addbuffs(thebuffs);
    }

    this.getbuffs = function() {
      return (this.allbuffs.getbuffs());
    }

    var cached_update = this.update;
    this.update = function() {
      cached_update.call(this);

      //if theres a betrayl effect, change sides to the betrayls one
      if (this.allbuffs.getbuffs().getbetrayl() == true) {
        this.currentside = this.allbuffs.getbuffs().getbetraylside();
      } else {
        this.currentside = this.side;
      }
      //increase health because of regen
      this.currenthp = this.currenthp + this.allbuffs.getbuffs().getregen();
      //if the currentmana is over the maxmana, then decrease the currentmana
      if (this.currentmana > (this.allbuffs.getbuffs().getmaxmanaeffect() + this.maxmana)) {
        this.currentmana += -1;
      }
      //same for health
      if (this.currenthp > (this.allbuffs.getbuffs().getmaxhpeffect() + this.maxhp)) {
        this.currenthp += -1;
      }
      //tickdown the buffs
      this.allbuffs.update();
    }

  }

  makeactionable() {

    this.isactionable = true;
    //what actions this charachter wants to do
    this.actiontodo = null;
    //action cooldown
    this.actioncooldown = 5;
    //damage augmented to attacks
    this.strength = 10;

    //set as true if this object wants to pick up objects
    this.wanttopickup = false;
    //the characters class
    this.classname = 'notset';
    //the characters skills
    this.skillset = [];
    //set the objects animation object's character status to true
    this.animations.setischaracter(true);


    this.setstrength = function(strength){
      this.strength = strength;
    }
    this.setclass = function(classname) {
      this.classname = classname;
    }
    this.giveskill = function(skillname) {
      this.skillset.push(skillname);
    }


    this.candoaction = function(actionstring) {
      if (this.skillset.indexOf(actionstring) >= 0) {
        return (true);
      }
      return (false);
    }

    this.getbuffstoinflict = function() {
      return (this.allbuffs.getbuffstoinflict());
    }

    this.giveequipment = function(equipment) {
      //returns old equipment when given new one
      var equipmenttodrop = this.allbuffs.equip(equipment);
      //throw the old weapon on the floor if it has equipment to discard
      if (this.getplane != null) {
        this.plane.dropequipment(equipmenttodrop);
      }
    }

    this.dropequipment = function(equipment) {
      //put it right behind me on the battlefield
      this.plane.addfromperspective(this, equipment, 1, Math.PI);
    }

    this.giveaction = function(action) {
      if (this.candoaction(action)) {
        //find the action in the myactionlist list
        this.actiontodo = myactionlist.getactionobject(action);
      }
    }

    this.performaction = function(actiontodo) {
      if (this.currenthp >= actiontodo.healthcost + 1 && this.currentmana >= actiontodo.manacost) {
        this.currenthp += -actiontodo.healthcost;
        this.currentmana += -actiontodo.manacost;
        //apply the self inflicted buffs of the action
        this.allbuffs.getbuffs().addbuffs(actiontodo.getselfbuffs());
        this.actioncooldown += actiontodo.cooldown;
        //if this is an attack that creating an attack object
        if (actiontodo.doescreateattack == true) {
          //get it to create an attack and get it with the getattackobject() method
          var attackobject = actiontodo.getattackobject();
          var addedstrength = Math.pow(1.0717734625, this.allbuffs.getbuffs().getstrengtheffect());
          attackobject.setdamage(attackobject.getdamage() * addedstrength);
          attackobject.getbuffstoinflict().addbuffs(this.allbuffs.getbuffstoinflict());
          var attackdistance = actiontodo.distancetoattack;
          var attackrotation = actiontodo.rotationtoattack;
          //add the object to the scene using the perspective and attacker
          this.plane.addfromperspective(this, attackobject, attackdistance, attackrotation);
        }
        //if this action creates an object
        if (actiontodo.doescreateobject == true) {
          //get the object and pass it into the scene
          var objecttopassin = actiontodo.getcreatedobject();
          var objectdistance = actiontodo.distancetoobject;
          var objectrotation = actiontodo.rotationtoobject;
          //pass it into the scene
          this.plane.addfromperspective(this, objecttopassin, objectdistance, objectrotation);
        }
        return (true);
      } else {
        return (false);
      }
    }



    var cached_update = this.update;
    this.update = function() {
      cached_update.call(this);

      //see if my cooldown is zero and if I have ability to try to cast action
      if (this.actioncooldown <= 0) {
        if (this.actiontodo != null) {
          this.performaction(this.actiontodo);
        }
        //remove that action from wanting to be done
        this.actiontodo = null;
      }

      //decrease the actioncooldown by 1 but not past 0
      this.actioncooldown += -1;
      if (this.actioncooldown < 0) {
        this.actioncooldown = 0;
      }
    }


  }

  makeAI() {

    this.giveAI = function() {
      this.isAI = true;
      this.AIcontroller = new AIController(this);
    }

    var cached_update = this.update;
    this.update = function() {
      cached_update.call(this);
      //if its an AI, call its AIcontroller
      if (this.isAI) {
        this.AIcontroller.update();
      }
    }

  }

  maketangible() {

    //making it attackable also makes it tangible
    this.istangible = true;

    var cached_update = this.update;
    this.update = function() {
      cached_update.call(this);
    }

  }

  makepickupable(droptype) {

    //can be picked up
    this.ispickupable = false;
    //is this on the ground or is this held by a charachter
    this.isheld = false;
    //has a certain amount of time until it expires
    this.droptimeleft = 10000;
    //the buffs that are given to the guy when its held
    this.grantedbuffs = new EntitiesBuffs();
    //the type of drop it is
    this.droptype = droptype;
    //the skill that this weapon grants
    //the skill that can be performed from this slot
    this.grantedskill = null;


    this.setdroptimeleft = function(droptimeleft){
      this.droptimeleft = droptimeleft;
    }

    this.givegrantedbuffs = function(grantedbuffs){
      this.grantedbuffs.addbuffs(grantedbuffs);
    }

    this.givegrantedskill = function(grantedskill){
      this.grantedskill = grantedskill;
    }

  }

  makedoesdamage(damage, timetoprime, timeleft) {

    //when this attack lands, it clones these buffs
    //and gives them to the thing it lands on
    this.buffstoinflict = new EntitiesBuffs();
    //the amount of damage it deals when it lands
    this.damage = damage;
    //the time for this object till it does damage
    this.timetoprime = timetoprime;
    //the time this object has left to exist
    this.timeleft = timeleft;
    //if this is tracably created by someone, then the creator objandpos is stored
    //here, and is used for alerting the person attacked to the presence if wanted
    this.creator = null;
    //if this object itself does damage
    this.doesdamage = true;


    this.setcreator = function(creator){
      this.creator = creator;
    }

    this.setdamage = function(damagetoinflict) {
      this.damage = damagetoinflict;
    }

    this.getdamage = function() {
      return (this.damage);
    }

    this.getbuffstoinflict = function() {
      return (this.buffstoinflict);
    }

    //give this object the list of buffs to inflict on characters
    this.givebuffstoinflict = function(buffstoinflict) {
      this.buffstoinflict.addbuffs(buffstoinflict);
    }

    this.landedattack = function(objectattacked) {
      //deal damage to this object based on damage done
      if (this.timetoprime <= 0) {
        objectattacked.takeattack(this.damage, this.buffstoinflict);
      }
    }

    var cached_update = this.update;
    this.update = function() {
      cached_update.call(this);

      if (this.timeleft <= 0) {
        this.isexpired = true;
      }

      this.timetoprime += -1;
      this.timeleft += -1;
    }

  }

  makemobile(speed) {

    this.ismobile = true;
    this.speed = speed;
    this.didjustmove = false;


    var cached_update = this.update;
    this.update = function() {
      cached_update.call(this);

      //update position if mobile, and get whether it moved or not
      if (this.ismobile) {
        this.didjustmove = this.plane.updateposition(this, this.direction, (this.speed + this.allbuffs.getbuffs().getspeedeffect()) * 0.01);
      }
    }


  }

  makedoor(exitdestination) {

    //is it a door
    this.isdoor = true;
    //is in the form of [exitplane, xandyexitpos]
    this.exitdestination = null;

  }

  makeinvisible() {

    this.isvisible = false;

  }









  //this obviously differs for each object, but this is what is common between them
  twomonthspass() {
    this.age += 2;
  }




  //vertex list can be null if shapetype is allignedbox
  setshapetype(shapetype, vertexlist){

    this.shapetype = shapetype;

    this.vertexlist = vertexlist;

  }

  setage(age){
    this.age = age;
  }



  setisethral(isethral) {
    this.isethral = isethral;
  }
  setiseffected(iseffected) {
    this.iseffected = iseffected;
  }
  setisactionable(isactionable) {
    this.isactionable = isactionable;
  }
  setistangible(istangible) {
    this.istangible = istangible;
  }
  setispickupable(ispickupable) {
    this.ispickupable = ispickupable;
  }
  setdoesdamage(doesdamage) {
    this.doesdamage = doesdamage;
  }
  setismobile(ismobile) {
    this.ismobile = ismobile;
  }
  setisvisible(isvisible) {
    this.isvisible = isvisible;
  }


  getisethral() {
    return (this.isethral);
  }
  getiseffected() {
    return (this.iseffected);
  }
  getisactionable() {
    return (this.isactionable);
  }
  getistangible() {
    return (this.istangible);
  }
  getispickupable() {
    return (this.ispickupable);
  }
  getdoesdamage() {
    return (this.doesdamage);
  }
  getismobile() {
    return (this.ismobile);
  }
  getisvisible() {
    return (this.isvisible);
  }
  getisexpired() {
    return (this.isexpired);
  }


  setside(newside) {
    this.side = newside;
  }
  getside() {
    return (this.side);
  }


  setresourceeffect(effectonresources) {
    this.resourceeffect = effectonresources;
  }
  getresourceeffect() {
    return (this.resourceeffect);
  }


  setplane(plane) {
    this.plane = plane;
  }
  setsetting(setting) {
    this.setting = setting;
  }
  getplane() {
    return (this.plane);
  }
  getsetting() {
    return (this.setting);
  }


  getxsize() {
    return (this.xsize);
  }
  getysize() {
    return (this.ysize);
  }


  setdirection(dir) {
    //the scalar is the value that i multiply x and y by to get it to abs sum to 1
    var realdistance = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);
    var scalar = 1 / realdistance;

    dir[0] = dir[0] * scalar;
    dir[1] = dir[1] * scalar;
    //set the direction
    this.direction = [dir[0], dir[1]];
  }
  //get the direction of the object
  getdirection() {
    return (this.direction);
  }


  //RENDERING SHIT BELOW HERE


  //when the object starts to do an action, call this action to change
  //the animations current animation type


  //every render it goes:

  //when the character or object either finishes its action
  //or  executes a new action, it calls this and changes its animation type
  updateanimationtype(animationtype) {
    this.animations.updateanimationtype(animationtype);
  }
  //tick the animation frame forwards one
  updatemesh() {
    this.animations.tickanimationframe();
  }
  //update the position of the mesh with these coordinates
  updatemeshpos(xpos, ypos) {
    this.animations.updatemeshpos(xpos, ypos);
  }
  //return the mesh of the current animation
  getmesh() {
    return (this.animations.getanimation());
  }
  setxsize(xsize) {
    this.xsize = xsize;
    //update the mesh size i think i should do
    this.animations.updatemeshsize(this.xsize, this.ysize);
  }
  setysize(ysize) {
    this.ysize = ysize;
    //update the mesh size i think i should do
    this.animations.updatemeshsize(this.xsize, this.ysize);
  }
  //get the position of this object on the plane
  getposonplane() {
    return (this.plane.getposition(this));
  }
  update() {

  }
}
