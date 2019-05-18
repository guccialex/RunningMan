
class EquipmentCreator{
  constructor() {

    this.strengthmodifier = 10;

    this.defensemodifier = 10;

    this.grantedskill = null;

    this.droptype = null;

  }

  setspear() {

  }

  setsword() {

  }

  setdagger() {

  }

  createequipment() {

    //create the equipment
    var theequipment = new Drops(this.droptype);


    //create buff for the equipment
    var bufftogrant = new EntitiesBuffs();


    //give the buff to the equipment
    theequipment.setgrantedbuff(bufftogrant);


    //set the skill for the equipment
    theequipment.setgrantedskill(this.grantedskill);


    //return the equipment
    return (theequipment);
  }
}
