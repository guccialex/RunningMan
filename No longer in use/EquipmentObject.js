
class EquipmentObject extends DropObject{

  constructor(droptype) {

    //calls the constructor of "drop"
    super(droptype);

    this.isequipment = true;


    //the skill it grants to the charachter
    this.grantedskill = null;

    //the buff it gives to the charachter
    this.grantedbuffs = new Entitiesbuffs();

    //the buffs that will be inflicted
    this.buffstoinflict = new Entitiesbuffs();


    //setting old variables
    this.isethral = true;

    this.istangible = false;

    this.ispickupable = true;

    this.doesdamage = false;

    this.ismobile = false;
  }

  setgrantedskill(grantedbuffs) {
    this.grantedbuffs = grantedbuffs;
  }

  setgrantedbuffs(grantedskill) {
    this.grantedskill = grantedskill;
  }

  setbuffstoinflict(grantedbuffstoinflict) {
    this.buffstoinflict = grantedbuffstoinflict;
  }


  //return the Entitiesbuffs object inside this
  getgrantedbuffs() {
    return (this.grantedbuffs);
  }

  getgrantedskill() {
    return (this.grantedskill);
  }

  getbuffstoinflict(grantedbuffstoinflict) {
    return (this.buffstoinflict);
  }

}
