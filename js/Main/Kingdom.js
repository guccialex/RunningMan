//the class for decision making that a side has the capabilities of doing



class Kingdom{

  constructor(sidename){

    //the "sides" that this kingdom has domain over
    this.sidename = sidename;

    //the characters/objects that this kingdom has domain over
    this.allobjects = new ObjandPosList();

    this.allai = new AllAI();

    //a class of the resources that the kingdom has
    this.resources = new Resources();

  }

  twomonthresourceupdate(){
    //get the two monts

  }


  //if any of the characters in the kingdom see an enemy, attack it
  aggressivemode(){

  }

  //only attack the "sides" that attack their friends
  defensivemode(){

  }




}
