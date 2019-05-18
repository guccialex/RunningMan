class CharacterObject extends ObjectOnPlane {
  constructor(maxhp, maxmana, strength, speed, defense) {
    super();
    //set the objects animation object's character status to true
    this.animations.setischaracter(true);

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
    this.direction = [1, 0];
    this.setdirection([1, 0]);

    //if this object did just move
    this.didjustmove = false;

    //what actions this charachter wants to do
    this.actiontodo = null;

    //action cooldown
    this.actioncooldown = 5;

    //set as true if this object wants to pick up objects
    this.wanttopickup = false;









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
    this.AIcontroller = null;


    //the characters class

    this.classname = 'notset';

    //the characters skills
    this.skillset = [];



    //the characters sight wide and tall
    this.widesight = 10;
    this.tallsight = 10;


    //give this character object a new method

    /*
    this.MYTESTMETHOD = function(testcall) {
      console.log(testcall);
    }
    */

    //this.MYTESTMETHOD("string to test");



  }


  //give this entity an AI and set it as an AI object
  giveAI() {

    this.isAI = true;

    this.AIcontroller = new AIController(this);


  }

  //set the characters class
  //i dont think this should change really
  setclass(classname) {
    this.classname = classname;
  }

  //set the skill thats
  giveskill(skillname) {
    this.skillset.push(skillname);
  }




  //takes an action as a string, and determines if this character is allowed to do it
  candoaction(actionstring) {

    //check if the action string is in the skillset list
    if (this.skillset.indexOf(actionstring) >= 0) {
      return (true);
    }

    //check if the action string is in the equipments skills it allows


    //if not
    return (false);
  }




  getbuffstoinflict() {
    //get the buffs that will be inflicted
    //when this charachter attacks
    return (this.allbuffs.getbuffstoinflict());
  }

  getbuffs() {
    return (this.allbuffs.getbuffs());
  }







  //when equipment has been picked up
  giveequipment(equipment) {
    var equipmenttodrop = null;

    equipmenttodrop = this.allbuffs.equip(equipment);

    //throw the old weapon on the floor if it has equipment to discard
    if (this.getplane != null) {
      this.plane.dropequipment(equipmenttodrop);
    }
  }



  //give an action for this charachter to do
  giveaction(action) {

    //i here if the action can be done, rather than at execution
    //if this becomes an issue (haha to future me who doesn't know if it is or not)
    //i can change it if it does

    if (this.candoaction(action)) {
      //find the action in the myactionlist list
      this.actiontodo = myactionlist.getactionobject(action);
    }

    //else do nothing if i cant perform it

  }


  //what to do when being hit by an attack
  takeattack(damage, buffstoinflict) {
    //console.log(DMAANGE AND BUFFS);
    //console.log([damage, buffstoinflict]);

    this.allbuffs.getbuffs().addbuffs(buffstoinflict);


    this.takedamage(damage);
  }

  //what to do when taking damage
  takedamage(damage) {

    //THIS HAPPENS ONLY LIKE 80 TIMES A FRAME
    //SO IT SHOULDNT BE STUPID ASS SLOW
    //BUT FOR SOME REASON
    //CREATING THE DAMAGETOTAKE VAR AND DOING THE TINY AMOUNT OF MATH IN IT
    //IS LIKE 90% OF WHATS SLOWING DOWN MY PROGRAM
    //REMOVE IT TO SEE

    var damagetotake = damage / (this.defense); // + this.allbuffs.getbuffs().getdefenseeffect());


    this.currenthp = this.currenthp - damagetotake;


  }



  //drop a drop on the field
  dropequipment(equipment) {

    //put it right behind me on the battlefield
    this.plane.addfromperspective(this, equipment, 1, Math.PI);
  }



  performaction(actiontodo) {



    //apply the costs, and if either cant be paid, end the method
    //can only do action if it leaves the health higher than 1,
    if (this.currenthp >= actiontodo.healthcost + 1 && this.currentmana >= actiontodo.manacost) {


      this.currenthp += -actiontodo.healthcost;
      this.currentmana += -actiontodo.manacost;




      //console.log(actiontodo);
      //console.log(["health",this.currenthp,"mana", this.currentmana]);


      //apply the self inflicted buffs of the action
      this.allbuffs.getbuffs().addbuffs(actiontodo.getselfbuffs());




      //apply the cooldown

      this.actioncooldown += actiontodo.cooldown;



      //if this is an attack that creating an attack object
      if (actiontodo.doescreateattack == true) {

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
        //this is not how i do it
        var addedstrength = Math.pow(1.0717734625, this.allbuffs.getbuffs().getstrengtheffect());


        //use the added strength as a multiplier to the attackobjects attack
        attackobject.setdamage(attackobject.getdamage() * addedstrength);


        //add the buffs to inflict of the character to the attack object, along with whatever
        //the actionobject already set
        attackobject.getbuffstoinflict().addbuffs(this.allbuffs.getbuffstoinflict());


        //get the distance that it wants to create the attack away from the actioner

        var attackdistance = actiontodo.distancetoattack;

        var attackrotation = actiontodo.rotationtoattack;


        //console.log((this.direction[0]*this.direction[0])+(this.direction[1]*this.direction[1]));



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




      //let the thing calling this know that the things went off, and that it can
      //remove this action from the list of things it wants to do

      return (true);

    } else {

      return (false);

    }


  }



  //what happens every tick of this object
  update() {


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



    //apply the buffs

    //take damage with the burn damage
    //this.takedamage(this.allbuffs.getbuffs().getburn());

    //take damage from the poison damage
    //this.takedamage(this.allbuffs.getbuffs().getpoison());


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




  //the animation object inside the superclass of this object knows that its for a character object
  //update the properties specific to a character object for this object, when it needs to be updated
  updatemesh() {

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
  getmesh() {

    var themeshs = this.animations.getanimation()



    //this draws the cone of sight for this object if this is an AI
    /*
    var meshtoadd = null;
    if (this.isAI) {

      var x = this.animations.xpos,
        y = this.animations.ypos;

      var visionshape = new THREE.Shape();

      var visionlines = getrotatedverts(this.AIcontroller.vertexlist, this.AIcontroller.rotation);

      for (var curint in visionlines) {

        var curpoint = visionlines[curint];

        if (curint == 0) {
          visionshape.moveTo(curpoint[0] + x, curpoint[1] + y);
        } else {
          visionshape.lineTo(curpoint[0] + x, curpoint[1] + y);
        }

      }

      var geometry = new THREE.ShapeGeometry(visionshape);
      var material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.3,
        color: 0x00ff00
      });
      var mesh = new THREE.Mesh(geometry, material);

      mesh.position.setZ(0.5);

      if (maincounter > 2) {
        themeshs.add(mesh);
      }
    }
    */


    return (themeshs);


  }






  updaterender() {

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
