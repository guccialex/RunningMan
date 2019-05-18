//a creator of objects

//basically you put in the specifications for the type of object you want to create

//and it creates it

//its very tied to "objectonplane"

//in that its essentially the same thing
//but this has the ability to make multiple of those



//why do I want an object creator
//to make multiple objects without resetting all the specifications every time
//to give to an object , so it can create preset object types that I want

//this should be able to define an object just as well as an object can define itself right?



class ObjectCreator {

  constructor() {


    //SETTING FOR ALL OBJECTS
    this.objecttype = null;

    //wont receive any attacks
    this.isethral = true;
    //can have effects applied to it
    this.iseffected = false;
    //can take actions
    this.isactionable = false;
    //an AI
    this.isAI = false;
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

    //the side this object is on
    this.side = 'none';

    //how much that this resource effects the player/kingdom
    //at the end of the turn
    this.resourceeffect = 0;

    //the age of this object in weeks
    this.age = 0;



    //NONETHRAL OBJECT
    this.maxhp = 100;
    this.currenthp = 100;
    this.maxmana = 100;
    this.currentmana = 100;
    this.defense = 10;


    //EFFECTABLE OBJECT
    this.personalbuffs = null; //new AllBuffs();


    //SETTING FOR ACTIONABLE OBJECT
    this.strength = 10;
    this.classname = 'notset';
    this.skillset = [];
    //should also have a list of buffs that are inflicted by their persons


    //SETTING FOR IS AI
    //nothing


    //SETTING FOR TANGIBLE OBJECT
    //nothing


    //SETTING FOR PICKUPABLE OBJECT
    this.droptype = null;
    this.droptimeleft = 100;
    this.grantedbuffs = null; //new EntitiesBuffs();
    this.grantedskill = null;


    //SETTING FOR DAMAGING OBJECT
    this.buffstoinflict = null; //new EntitiesBuffs();
    this.damage = 0; //damage;
    this.timetoprime = 0 //timetoprime;
    this.timeleft = 100 //timeleft;
    this.creator = null;


    //SETTING FOR MOBILE OBJECT
    this.speed = 10;


    //SETTING FOR DOOR OBJECT
    this.isdoor = false;
    this.exitdestination = null;


    //SETTING FOR AI OBJECT
    this.widesight = 10;
    this.tallsight = 10;



  }



  setwall(xsize, ysize) {

    //can intersect on a place with other tangible objects
    this.istangible = true;

    this.xsize = xsize;
    this.ysize = ysize;


  }



  setcreatedattack(damagetoinflict, timetoprime, timetoexist){

    this.doesdamage = true;

    this.damage = damagetoinflict;
    this.timetoprime = timetoprime;
    this.timeleft = timetoexist;

  }


  givebuffstoinflict(buffstoinflict){

    this.buffstoinflict = buffstoinflict;

  }







  setfarmer() {

    //re call the constructor to remove any values already set for this creator
    //when i figure out how to make javascript let me
    //this.constructor();

    this.objecttype = "farmer";


    //wont receive any attacks
    this.isethral = false;
    this.attack = 5;
    this.defense = 5;
    this.maxhp = 100;
    this.maxmana = 0;

    //can have effects applied to it
    this.iseffected = true;

    //can take actions
    this.isactionable = true;
    this.strength = 10;
    this.skillset.push("stab");
    this.classname = "farmer";

    //can be given an AI
    this.isAI = true;
    this.widesight = 2;
    this.tallsight = 4;

    //can intersect on a place with other tangible objects
    this.istangible = true;

    //if this object can move
    this.ismobile = true;
    this.speed = 4;


  }

  setclass(characterclass, skillset) {

    this.objecttype = "myguy";

    //wont receive any attacks
    this.isethral = false;
    this.attack = 5;
    this.defense = 5;
    this.maxhp = 10000;
    this.maxmana = 200;

    //can have effects applied to it
    this.iseffected = true;

    //can take actions
    this.isactionable = true;
    this.strength = 10;
    this.skillset = skillset;
    this.classname = characterclass;

    //can intersect on a place with other tangible objects
    this.istangible = true;

    //if this object can move
    this.ismobile = true;
    this.speed = 13;
  }




  createobject() {


    //create a new object
    var theobject = new NewObjectOnPlane(this.objecttype);

    theobject.setdirection(this.direction);

    //vertex list can be null if shapetype is allignedbox
    theobject.setshapetype(this.shapetype, this.vertexlist);

    //x size and y size are still used even in a nonalligned box
    //theyre used as scalars for the vectors
    theobject.setxsize(this.xsize);
    theobject.setysize(this.ysize);

    theobject.setside(this.side);
    theobject.setresourceeffect(this.resourceeffect);
    theobject.setage(this.age);




    if (this.isethral == false) {
      theobject.makenonethral();

      theobject.setmaxhp(this.maxhp);
      theobject.setcurrenthp(this.maxhp);
      theobject.setmaxmana(this.maxmana);
      theobject.setcurrentmana(this.maxmana);
      theobject.setdefense(this.defense);

    }

    if (this.iseffected) {
      theobject.makeeffected();
      theobject.givepersonalbuffs(this.personalbuffs);
    }

    if (this.isactionable) {
      theobject.makeactionable();

      theobject.setstrength(this.strength);

      theobject.setclass(this.classname);

      for (var curint in this.skillset) {
        theobject.giveskill(this.skillset[curint]);
      }

    }

    if (this.isAI) {
      theobject.makeAI();

      //give it an AI if its an AI
      theobject.giveAI();
      theobject.widesight = this.widesight;
      theobject.tallsight = this.tallsight;

    }

    if (this.istangible) {
      theobject.maketangible();
    }

    if (this.ispickupable) {
      theobject.makepickupable(this.droptype);

      theobject.setdroptimeleft(this.droptimeleft);

      theobject.givegrantedbuffs(this.grantedbuffs);

      theobject.givegrantedskill(this.grantedskill);
    }

    if (this.doesdamage) {
      theobject.makedoesdamage(this.damage, this.timetoprime, this.timeleft);

      theobject.givebuffstoinflict(this.buffstoinflict);

      theobject.setcreator(this.creator);
    }

    if (this.ismobile) {
      theobject.makemobile(this.speed);
    }

    if (this.isdoor) {
      theobject.makedoor(this.exitdestination);
    }

    if (this.isvisible == false) {
      theobject.makeinvisible();
    }

    //return the object
    return (theobject);

  }









}
