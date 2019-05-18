
class SettingCreator{


  //initialize a gamestate
  //then return it
  //once its been created, its the only
  //reference that's needed to run the game
  //is that what I want??????

  //then return the setting

  constructor() {


    //what parameters define a setting, on a scale of 1-10
    this.richness = 4;

    this.urbanness = 5;



    //the parameters that cause the construction of the planes
    this.numberoffarmingplanes = 4;

    //the level of this setting creator
    this.level = 1;

    //the scalar for the size of the planes created
    this.sizescalar = 1;

    //create one kingdom for this setting
    this.thekingdoms = [];
    var firstkingdom = new Kingdom("enemyside")
    this.thekingdoms.push(firstkingdom);



    this.planecreator = new PlaneCreator();

    //add the kingdom to the plane creator
    this.planecreator.setkingdom(firstkingdom);
  }



  //this way of generating the setting does not rely on the randomness and
  //customizability of parameters
  generatedefaultsetting() {


    //create the creator of the plane
    planecreator = new PlaneCreator();

    //5 is average
    planecreator.setdifficulty(5);


    //create and store 10 planes
    var planearray = [];

    planearray.push(planecreator.createblankplane());


    //attach the planes to each other
    //this.attachplane()

  }

  attachplane(plane1, plane2, plane1pos, plane2pos) {

    //add a one way door from plane1 to plane2 in the positions that I specify

  }

  generatetestsetting() {

    var firstplane = this.planecreator.createfarmingplane();

    //create a setting for the planes
    var settingtoreturn = new Setting();

    settingtoreturn.passinplane(firstplane);

    //add in all the kingdoms to the setting
    for (var kingdom in this.thekingdoms){

      settingtoreturn.addkingdom(this.thekingdoms[kingdom]);
    }

    return (settingtoreturn);

  }

}
