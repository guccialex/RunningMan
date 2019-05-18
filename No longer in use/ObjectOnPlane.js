//the class for an object that is on a plane
//this is just a abstract class anyways, so the values of the variables dont matter
class ObjectOnPlane {

  constructor(objecttype) {


    //SETTING FOR ALL OBJECTS



    //supposed to be a string of what object type it is
    //but this is covered by the "isethral" things until
    //i choose to use this
    this.objecttype = null;

    //unique identifier for this object
    this.uniqueID = (Math.random() * 100000000000000000).toString();


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


    //each object has a set of animations for each of their Actions
    //each action has different frames

    //create the animation object for this object with the type that it is
    this.animations = new Animations(this.objecttype);

    //set the objects animation state to idle
    this.animations.updateanimationtype('idle');







    //SETTING FOR ATTACKABLE

    this.maxhp = 100;
    this.currenthp = 100;
    this.maxmana = 100;
    this.currentmana = 100;
    this.strength = 10;
    this.speed = 10;
    this.defense = 10;

    //the object that holds the equipment and personal buffs and buffs to inflict
    this.allbuffs = new AllBuffs();







    //SETTING FOR ATTACKING OBJECT

    //when this attack lands, it clones these buffs
    //and gives them to the thing it lands on
    this.buffstoinflict = new EntitiesBuffs();

    //the amount of damage it deals when it lands
    this.damage = 10;

    //the time for this object till it does damage
    this.timetoprime = 5;

    //the time this object has left to exist
    this.timeleft = 10;

    //if this is tracably created by someone, then the creator objandpos is stored
    //here, and is used for alerting the person attacked to the presence if wanted
    this.creator = null;





    //SETTING FOR DOOR OBJECT

    //is it a door
    this.isdoor = true;

    //is in the form of [exitplane, xandyexitpos]
    this.exitdestination = null;





    //SETTING FOR DROP OBJECT

    //already exists, just needs to be set here
    this.ispickupable = true;

    //is this on the ground or is this held by a charachter
    this.isheld = false;

    //has a certain amount of time until it expires
    this.timeleft = 10000;

    //the buffs that are given to the guy when its held
    this.grantedbuffs = new EntitiesBuffs();

    //the type of drop it is
    this.droptype = null; //droptype;

    //the skill that this weapon grants
    //the skill that can be performed from this slot
    this.grantedskill = null; //'spike';






    //SETTING FOR CHARACTER


    //give it an AI
    this.isAI = false;

    //create one when you set the AI
    this.AIcontroller = null;

    //if this object did just move
    this.didjustmove = false;

    //what actions this charachter wants to do
    this.actiontodo = null;

    //action cooldown for how many ticks until this can attack again
    this.actioncooldown = 5;

    //set as true if this object currently wants to pick up an object
    this.wanttopickup = false;

    //the characters class
    this.classname = 'notset';

    //the characters skills
    this.skillset = [];


    //set the objects animation object's character status to true
    this.animations.setischaracter(false);


    //the characters sight wide and tall
    this.widesight = 10;
    this.tallsight = 10;


  }



  //make this object attackable
  makeattackable(maxhp, maxmana, strength, speed, defense) {

    this.maxhp = maxhp;
    this.currenthp = maxhp;
    this.maxmana = maxmana;
    this.currentmana = maxmana;
    this.strength = strength;
    this.speed = speed;
    this.defense = defense;

    //make it ethral
    this.isethral = true;

    //the object that holds the equipment and personal buffs and buffs to inflict
    this.allbuffs = new AllBuffs();






    //making it attackable makes it ethral
    this.isethral = false;

    //making it attackable also makes it tangible
    this.istangible = true;






    //give it the methods to make it attackable



    this.getbuffs = function() {
      return (this.allbuffs.getbuffs());
    }

    this.takeattack = function(damage, buffstoinflict) {

      this.allbuffs.getbuffs().addbuffs(buffstoinflict);

      this.takedamage(damage);
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

    //return the mesh, with a message
    this.getmesh = function() {

      var themeshs = this.animations.getanimation()

      return (themeshs);


    }



    this.updaterender = function() {


    }






  }


  //make this object a character
  makecharacter() { //isAi, AIcontroller, widesight, tallsight, classname, skillset) {



    //making it a character makes it mobile
    this.ismobile = true;



    //if this object did just move
    this.didjustmove = false;

    //what actions this charachter wants to do
    this.actiontodo = null;

    //action cooldown
    this.actioncooldown = 5;

    //set as true if this object wants to pick up objects
    this.wanttopickup = false;





    //the characters class
    this.classname = 'notset';

    //the characters skills
    this.skillset = [];



    //the characters sight wide and tall
    this.widesight = 10;
    this.tallsight = 10;





    //give it an AI
    this.isAI = false;

    //create one when you set the AI
    this.AIcontroller = null;

    //if this object did just move
    this.didjustmove = false;

    //what actions this charachter wants to do
    this.actiontodo = null;

    //action cooldown for how many ticks until this can attack again
    this.actioncooldown = 5;

    //set as true if this object currently wants to pick up an object
    this.wanttopickup = false;

    //the characters class
    this.classname = 'notset';

    //the characters skills
    this.skillset = [];


    //set the objects animation object's character status to true
    this.animations.setischaracter(true);


    //the characters sight wide and tall
    this.widesight = 10;
    this.tallsight = 10;









    this.giveAI = function() {
      this.isAI = true;

      this.AIcontroller = new AIController(this);
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

      //if not
      return (false);
    }

    this.getbuffstoinflict = function() {
      //get the buffs that will be inflicted
      //when this charachter attacks
      return (this.allbuffs.getbuffstoinflict());
    }

    this.giveequipment = function(equipment) {
      var equipmenttodrop = null;

      equipmenttodrop = this.allbuffs.equip(equipment);

      //throw the old weapon on the floor if it has equipment to discard
      if (this.getplane != null) {
        this.plane.dropequipment(equipmenttodrop);
      }
    }

    this.giveaction = function(action) {

      if (this.candoaction(action)) {
        //find the action in the myactionlist list
        this.actiontodo = myactionlist.getactionobject(action);
      }


    }

    this.dropequipment = function(equipment) {

      //put it right behind me on the battlefield
      this.plane.addfromperspective(this, equipment, 1, Math.PI);
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



    //what happens every tick of this object
    this.update = function() {
      if (this.currenthp <= 0) {
        this.isexpired = true;
      }
      //if its an AI, call its AIcontroller
      if (this.isAI) {
        this.AIcontroller.update();
      }
      //update position if mobile, and get whether it moved or not
      if (this.ismobile) {
        this.didjustmove = this.plane.updateposition(this, this.direction, (this.speed + this.allbuffs.getbuffs().getspeedeffect()) * 0.01);
      }
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


  //make this object a door
  makedoor() {




  }


  //make this object a drop
  makedrop() {



  }

  //make this object an attack
  makeattack(damage, timetoprime, timeleft) {

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





    this.setdamage = function(damagetoinflict) {
      this.damage = damagetoinflict;
    }

    this.getdamage = function() {
      return (this.damage);
    }

    this.getbuffstoinflict =  function() {
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

    this.update = function() {

     if (this.timeleft <= 0) {
      this.isexpired = true;
     }

     this.timetoprime += -1;

     this.timeleft += -1;
    }


  }








  //this obviously differs for each object, but this is what is common between them
  twomonthspass() {
    this.age += 2;
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



  setdirection(xdir, ydir) {

    //the scalar is the value that i multiply x and y by to get it to abs sum to 1

    var realdistance = Math.sqrt(xdir * xdir + ydir * ydir);

    var scalar = 1 / realdistance;

    xdir = xdir * scalar;

    ydir = ydir * scalar;

    //set the direction
    this.direction = [xdir, ydir];

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

    //if its an AI, call its AIcontroller
    if (this.isAI) {
      this.AIcontroller.update();
    }


    //if this object can take damage
    if (this.isethral == false) {


    }


    //if mobile, update position and get whether it moved or not
    if (this.ismobile) {
      this.didjustmove = this.plane.updateposition(this, this.direction, (this.speed + this.allbuffs.getbuffs().getspeedeffect()) * 0.01);
    }

    //





  }
}
