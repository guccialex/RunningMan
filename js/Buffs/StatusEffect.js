class StatusEffect{

  //a class that defines what a single status effect is

  constructor(ticksleft) {

    this.speedbuff = 0;
    this.strengthbuff = 0;
    this.defensebuff = 0;
    this.maxhpbuff = 0;
    this.maxmanabuff = 0;

    this.poisoneffect = 0;
    this.regeneffect = 0;
    this.inviseffect = false;
    this.invuleffect = false;
    this.stopeffect = false;
    this.sloweffect = 0;
    this.fasteffect = 0;
    this.burneffect = 0;

    //is null unless its a string of the side it switches to
    this.betrayleffect = null;

    this.knockbackeffect = 0;
    this.knockbackrotation = 0;

    this.ticksleft = ticksleft;
  }

  setthemall(speed, strength, defense, maxhp, maxmana, poison, regen, invis, invul, stop, slow, fast, burn, betrayl, knockback, knockbackdir, ticksleft) {
    this.speedbuff = speed;
    this.strengthbuff = strength;
    this.defensebuff = defense;
    this.maxhpbuff = maxhp;
    this.maxmanabuff = maxmana;
    this.poisoneffect = poison;
    this.regeneffect = regen;
    this.inviseffect = invis;
    this.invuleffect = invul;
    this.stopeffect = stop;
    this.sloweffect = slow;
    this.fasteffect = fast;
    this.burneffect = burn;
    this.betrayleffect = betrayl;
    this.knockbackeffect = knockback;
    this.knockbackrotation = knockbackdir;

    this.ticksleft = ticksleft;
  }

  //create a clone of this status effect and get it
  clonegetthis() {

    //create a new status effect object

    var newstatuseffect = new StatusEffect();

    //set all of its values as this ones
    //using the "setthemalll" function

    newstatuseffect.setthemall(this.speedbuff, this.strengthbuff, this.defensebuff, this.maxhpbuff, this.maxmanabuff, this.poisoneffect, this.regeneffect, this.inviseffecy, this.invuleffect, this.stopeffect, this.sloweffect, this.fasteffect, this.burneffect, this.betrayleffect, this.knockbackeffect, this.knockbackrotation, this.ticksleft);
    return (newstatuseffect);

  }

  tick() {

    this.ticksleft += -1;

  }

  isfinished() {

    if (this.ticksleft <= 0) {
      return (true);
    } else
    {
      return (false);
    }
  }

  //set all the buffs
  setstrengtheffect(strengthbuff) {
    this.strengthbuff = strengthbuff;
  }

  setspeedeffect(speedbuff) {
    this.speedbuff = speedbuff;
  }

  setdefenseeffect(defensebuff) {
    this.defensebuff = defensebuff;
  }

  setmaxhpeffect(maxhpbuff) {
    this.maxhpbuff = maxhpbuff;
  }

  setmaxmanaeffect(maxmanabuff) {
    this.maxmanabuff = maxmanabuff;
  }

  setbetrayl(betrayleffect) {
    this.betrayleffect = betrayleffect;
  }

  setburn(burneffect) {
    this.burneffect = burneffect;
  }

  setfast(fasteffect) {
    this.fasteffect = fasteffect;
  }

  setslow(sloweffect) {
    this.sloweffect = sloweffect;
  }

  setstop(stopeffect) {
    this.stopeffect = stopeffect;
  }

  setinvul(invuleffect) {
    this.invuleffect = invuleffect;
  }

  setinvis(inviseffect) {
    this.inviseffect  = inviseffect;
  }

  setregen(regeneffect) {
    this.regeneffect = regeneffect;
  }

  setpoison(poisoneffect) {
    this.poisoneffect = poisoneffect;
  }

  setknockback(knockbackeffect, knockbackrotation) {
    this.knockbackeffect = knockbackeffect;
    this.knockbackrotation = knockbackrotation;
  }







  //the getters of the status effects
  getstrengtheffect() {
    return (this.strengthbuff);
  }

  getspeedeffect() {
    return (this.speedbuff);
  }

  getdefenseeffect() {
    return (this.defensebuff);
  }

  getmaxhpeffect() {
    return (this.maxhpbuff);
  }

  getmaxmanaeffect() {
    return (this.maxmanabuff);
  }

  getbetrayl() {
    return (this.betrayleffect);
  }

  getburn() {
    return (this.burneffect);
  }

  getfast() {
    return (this.fasteffect);
  }

  getslow() {
    return (this.sloweffect);
  }

  getstop() {
    return (this.stopeffect);
  }

  getinvul() {
    return (this.invuleffect);
  }

  getinvis() {
    return (this.inviseffect);
  }

  getregen() {
    return (this.regeneffect);
  }

  getpoison() {
    return (this.poisoneffect);
  }

  getknockback() {
    //returns knockback and rotation
    return ([this.knockbackeffect, this.knockbackrotation]);
  }

}
