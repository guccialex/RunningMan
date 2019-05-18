class GameState {


  //methods
  //createmainguy(characterclass, listofskillstohave)
  //passinmainsetting(mainsetting)
  //playerinput(pressedkey)
  //camerafollowmain()
  //render()
  //update()
  //tick()

  constructor() {

    //RENDERING STUFF

    //the scene and the camera are stored here
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 100);

    this.scene = new THREE.Scene();


    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    /*
    GLOBSCENE = this.scene;
    GLOBCAM = this.camera;
    GLOBRENDER = this.renderer;
    */

    //the camera is always centered on myguy

    //set the values for the camera's distance from him
    //and it's angle
    this.cameradistance = 10;

    this.cameraxangle = 0;

    this.camerayangle = -1;

    this.camerazangle = 1;


    //the main guy
    this.myguy = null;

    //the list of settings
    this.settinglist = [];

    //the setting thats updated and rendered every tick
    this.mainsetting = null;

    //the controller for main guy, the only thing that
    //player can interact with through "playerinput()"
    this.myguycontroller = null;
    //created when the myguy object is passed in

    //the storage of all the actions in the game
    //each character has a list of actions they can and cant do
    this.allactions = new ActionList();

    //classes available
    //and the skills that they have unlocked
    this.unlocked = new UnlockedStorage();

    //unlock assault fighter, double strength and dodge
    this.unlocked.addclassunlocked('assault fighter');
    this.unlocked.addskillunlocked('dodge');
    this.unlocked.addskillunlocked('double strength');
    this.unlocked.addskillunlocked('stab');
    this.unlocked.addskillunlocked('self regen');

    //for testing, remove this please
    this.firstloop = true;
  }



  //create a mainguy with what the gamestate defines
  //when the main guy is dead, create a new one to play as
  createmainguy(charachterclass, listofskillstohave) {


    //if the charachter class and list of skills to have are valid for that
    //then do this
    //otherwise throw error
    if (this.unlocked.isclassunlocked(charachterclass) == false) {
      throw ('the class cant be made cuz you havent unlocked it');
    }

    for (var skill in listofskillstohave) {
      if (this.unlocked.isskillunlocked(listofskillstohave[skill]) == false) {
        throw ('the skill for this class hasnt been unlocked, cant make this your main guy');
      }
    }

    //create an entity creator for myguy
    var myguycreator = new ObjectCreator();

    //create the guy of that class, and all the stat modifiers it brings
    //and with the skills that i give it
    myguycreator.setclass(charachterclass, listofskillstohave);

    //create him and assign him to "myguy"
    this.myguy = myguycreator.createobject();

    //i have to figure out how to store my kingdom in the setting, so for now
    //im just manually setting myguys side as "mykingdom"

    this.myguy.setside("mykingdom");


    //create a controller that will control him in this
    this.myguycontroller = new Controller(this.myguy);

  }



  //create a setting and return it
  createsetting() {

    var settingcreator = new SettingCreator();

    return (settingcreator.generatetestsetting());

  }

  passinmainsetting(setting) {

    //add it to my setting list
    this.settinglist.push(setting);


    //make it my mainsetting
    this.mainsetting = setting;

    //pass myguy into the setting
    //which will put him in the starting plane
    this.mainsetting.passinmyguy(this.myguy);

  }

  playerinput(pressedkey) {
    //really should be the key input being used as a key
    //for the map of what they do
    //for determining the command

    if (pressedkey == 'ArrowRight') {

      this.myguycontroller.setdirection([1, 0]);
    }

    if (pressedkey == 'ArrowDown') {

      this.myguycontroller.setdirection([0, -1]);
    }

    if (pressedkey == 'ArrowLeft') {

      this.myguycontroller.setdirection([-1, 0]);
    }

    if (pressedkey == 'ArrowUp') {

      this.myguycontroller.setdirection([0, 1]);
    }

    if (pressedkey == 'q') {

      this.myguycontroller.turnleft(Math.PI / 2);
    }

    if (pressedkey == 'e') {

      this.myguycontroller.turnright(Math.PI / 2 + 0.0001);
    }

    if (pressedkey == 's') {
      this.myguycontroller.giveaction('stab');
    }

    if (pressedkey == 'h') {
      this.myguycontroller.giveaction('self heal aura');
    }

    if (pressedkey == 'j') {
      this.myguycontroller.giveaction('self regen');
    }

  }

  camerafollowmain() {

    //determine position of camera

    //to get the "scalar" for how to get the camera to lie on the
    //3d unit circle, i need a similar equation for the 2d one

    var xdistance =   this.cameraxangle;
    var ydistance =   this.camerayangle;
    var zdistance =   this.camerazangle;

    var scalar = 1 / Math.sqrt(xdistance * xdistance + ydistance * ydistance + zdistance * zdistance);

    //now multiply this scalar by the distance from the guy before applying
    scalar = scalar * this.cameradistance;


    //get the positions of myguy in the different dimensions

    var allpos = this.myguy.getposonplane();

    var myguyxpos = allpos[0];
    var myguyypos = allpos[1];
    var myguyzpos = 0;

    xdistance = (xdistance * scalar) + myguyxpos;

    ydistance = (ydistance * scalar) + myguyypos;

    zdistance = (zdistance * scalar) + myguyzpos;

    this.camera.position.set(xdistance, ydistance, zdistance);


    //now get the angle using the pos on the plane
    //i should use the pos of the mesh, but i cant because im getting the mesh group returned
    //rather than just the body and its fuckign with the calculations

    this.camera.lookAt(allpos[0], allpos[1], 0);

  }

  render() {


    //clear the scene
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }

    //get all visible meshs of the current plane
    //this also updates all their pos's


    var visiblemeshs = this.myguy.getplane().getvisiblemeshs();

    for (var currentmesh in visiblemeshs) {
      this.scene.add(visiblemeshs[currentmesh]);
    }

    //make the camera follow and point to this.myguy

    //if (this.firstloop == true){

    this.camerafollowmain();

    //}

    //this.firstloop = false;

    /*

    // Add a point light with #fff color, .7 intensity, and 0 distance
    var light = new THREE.PointLight( 0xffffff, 1, 0 );

    // Specify the light's position
    light.position.set(1, 1, 100 );

    // Add the light to the scene
    this.scene.add(light);

    */

    var light = new THREE.AmbientLight(0x404040); // soft white light
    this.scene.add(light);

    //console.log(this.scene);


    console.log(this.scene);



    //render the scene
    this.renderer.render(this.scene, this.camera);
  }




  update() {

    //console.log(this.myguy.getplane().objandpos.getobjs());

    //the charachters controls and AI are already done outside the loop

    //The AI runs and assigns actions here
    //this.AI.update();


    //call the update function on the current setting
    this.mainsetting.update();
  }

}
