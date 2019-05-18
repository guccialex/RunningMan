class WallObject extends CharacterObject{

  constructor(xsize, ysize) {
    super();
    //let the animator know this is not a character
    //i really dont like what im doing here, but I have to
    //because in this chain of constructors
    //objectonplane sets it not as a character
    //then characterobject runs and sets it as character
    //now wallobject runs and sets it as not a character again
    //but whatever ill just do it
    this.animations.setischaracter(false);

    this.animations.updatemeshsize(xsize, ysize);


    //cant be attacked
    this.isethral = true;

    //cannot be moved through
    this.istangible = true;

    //cant be picked up
    this.ispickupable = false;

    //this object doesnt deal damage on contact
    this.doesdamage = false;

    //this object does not move
    this.ismobile = false;



    //tell it there's no AI
    this.isAI = false;

    //remove the AI
    this.AIcontroller = null;


    //set xsize and ysize
    this.xsize = xsize;
    this.ysize = ysize;

    this.animations.updatemeshsize(this.xsize, this.ysize);

  }

}
