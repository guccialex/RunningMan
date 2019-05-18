
//the class for decision making that a side has the capabilities of doing

class Kingdom{

  constructor(sidename) {

    //the "sides" that this kingdom has domain over
    this.sidename = sidename;

    //the characters/objects that this kingdom has domain over
    //this list however, does not have the positions for these objects in this list
    this.allobjects = new ObjandPosList();

    //a class of the resources that the kingdom has
    this.resources = new Resources();

  }

  //get the name of this kingdoms side
  getsidename(){

    return(this.sidename);
  }

  //add an object to this kingdom
  giveobject(object){

    //add to this kingdoms list of objectonplane objects
    this.allobjects.addobject(object, [null, null]);

    //set the object's side to be the side of this kingdoms
    object.setside(this.sidename);

    console.log("GET OBJECT:");
    console.log(object);
  }

  twomonthresourceupdate() {
    //get the two monts

  }


  //if any of the characters in the kingdom see an enemy, attack it
  aggressivemode() {

  }

  //only attack the "sides" that attack their friends
  defensivemode() {

  }

}
