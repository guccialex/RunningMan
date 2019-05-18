class KingdomCreator {

  constructor(sidename) {

    //the "sides" that this kingdom has domain over
    this.sidename = sidename;

  }

  createkingdom(){

    var thekingdom = new Kingdom(this.side);

    return(thekingdom);


  }

}
