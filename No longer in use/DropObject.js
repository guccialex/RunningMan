

//a drop on the field
class DropObject extends ObjectOnPlane{
  constructor(droptype) {

    super();

    //is this on the ground or is this held by a charachter
    this.isheld = false;

    //has a certain amount of time until it expires
    this.timeleft = 10000;

    //the buffs that are given to the guy when its held
    this.grantedbuffs = new EntitiesBuffs();

    //the type of drop it is
    this.droptype = droptype;

    //the skill that this weapon grants
    //the skill that can be performed from this slot
    this.grantedskill = 'spike';

    this.isequipment = false;



    //setting old variables
    this.isethral = true;

    this.istangible = false;

    this.ispickupable = true;

    this.doesdamage = false;

    this.ismobile = false;
  }

  tickdown() {

    this.timeleft += -1;

    if (this.timeleft <= 0) {

      this.isexpired = true;
    }
  }

  update() {
    //tick this down
    this.tickdown();
  }
}
