class Animations{

  constructor(typeofobject) {


    //what does an animation need to know to give the right animatiton



    //the x size of the object
    this.xsizescalar = 1;

    //the y size of the object
    this.ysizescalar = 1;


    //the x position of the object
    this.xpos = 0;

    //the y position of the object
    this.ypos = 0;




    //the type of object
    this.objecttype = 'default';


    //the type of animation
    this.animationtype = 'idle';


    //the frame of animation the animation is on
    this.animationframe = 0;


    //whether its a character or not
    this.ischaracter = false;








    //the object that has the functions for getting the animation frames
    //from the specifications of the objecttype, animationtype, and the animationframe
    this.animationlist = new AnimationList();



    //how full the mana and health are percentage wise of the full health
    this.manapercent = 1;
    this.healthpercent  = 1;

    /*
    var geometry = new THREE.BoxGeometry( 0.2,0.2,0.2 );
    var material = new THREE.MeshNormalMaterial();
    this.hpmesh  = new THREE.Mesh( geometry, material );

    var geometry = new THREE.BoxGeometry( 0.2,0.2,0.2 );
    var material = new THREE.MeshNormalMaterial();
    this.manamesh = new THREE.Mesh( geometry, material );
    */

    this.importantmesh = null;

    this.healthmesh = null;
    this.manamesh = null;
    //once this object has a mesh, dont create another one
    this.alreadyhavemesh = false;
  }

  setischaracter(isittrue) {

    this.ischaracter = isittrue;

    var geometry = new THREE.BoxGeometry(this.healthpercent * 2, 0.15, 0.3);
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(0xff3333);
    var healthmesh  = new THREE.Mesh(geometry, material);

    var geometry = new THREE.BoxGeometry(this.manapercent * 2, 0.15, 0.3);
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(0x3333ff);
    var manamesh  = new THREE.Mesh(geometry, material);

    this.healthmesh = healthmesh;

    this.manamesh = manamesh;

  }

  updateobjecttype(objecttype) {

    this.objecttype = objecttype;

  }

  updateanimationtype(animationtype) {

    this.animationtype = animationtype;

  }


  //tick the frame of animation for this object
  tickanimationframe() {

    //increase the animation frame by 1
    this.animationframe += 1;

    //then check if the object type with the animation type
    //has an animation of this many ticks
    //and if it doesn't, reset the frame of the animation to 0

    if (this.animationframe >= this.animationlist.numberofframes(this.objecttype, this.animationtype)) {
      this.animationframe = 0;
    }

  }


  //update the position of the meshs
  updatemeshpos(xpos, ypos) {

    this.xpos = xpos;

    this.ypos = ypos;

  }


  //update the mesh to the new one when the size changes
  updatemeshsize(xsize, ysize) {

    this.xsizescalar = xsize;

    this.ysizescalar = ysize;

  }


  //update the mana stats of this object
  updatemanabar(currentmana, maxmana) {

    this.manapercent = currentmana / maxmana;

    if (currentmana == 0) {

      //cant be 0 for some reason??? or it renders as if it were 1
      this.manapercent = 0.01;

    }

  }

  //update the health stats of this object
  updatehealthbar(currenthealth, maxhealth) {

    this.healthpercent = currenthealth / maxhealth;

  }








  //this returns a mesh of the object
  getanimation() {

    /*


    //the group of meshs returned for this object
    var groupofmeshs = new THREE.Group();


    //return the frame for the object
    var frame = this.animationlist.getframe(this.objecttype, this.animationtype, this.animationframe);


    groupofmeshs.add(frame);


    //if this is a characer object, i should also add a check for non character things with health and mana
    //add the health and mana bars to the
    if (this.ischaracter == true){

      groupofmeshs.add(this.hpmesh);

      groupofmeshs.add(this.manamesh);

    }

    //return the group of meshs

    //set its size according to the scalar

    groupofmeshs.scale.set(this.xsizescalar,this.ysizescalar,1);


    //return(groupofmeshs);


    */

    var groupofmeshs = new THREE.Group();





    //if this character doesnt already have its mesh made
    if (this.importantmesh == null) {


      //if its a character, use a sprite as the mesh
      if (this.ischaracter) {


        // Create a texture loader so we can load our image file
        var loader = new THREE.TextureLoader();

        var material = new THREE.MeshLambertMaterial();

        // create a plane geometry for the image with a width of 10
        // and a height that preserves the image's aspect ratio
        var geometry = new THREE.PlaneGeometry(1, 1);

        // combine our image geometry and material into a mesh
        this.importantmesh = new THREE.Mesh(geometry, material);

        this.importantmesh.rotation.x = Math.PI / 2;

      } else {
        // Create a texture loader so we can load our image file
        var loader = new THREE.TextureLoader();

        // Load an image file into a custom material
        var material = new THREE.MeshBasicMaterial();
        material.color = new THREE.Color(0x33bb33);

        var geometry = new THREE.BoxGeometry(this.xsizescalar, this.ysizescalar, 1);
        //var material = new THREE.MeshNormalMaterial();
        this.importantmesh  = new THREE.Mesh(geometry, material);
      }
    }


    //meshoffset
    var xmeshoffset = this.xsizescalar / 2;
    var ymeshoffset = this.ysizescalar / 2;

    this.importantmesh.position.setX(this.xpos + xmeshoffset);
    this.importantmesh.position.setY(this.ypos + ymeshoffset);
    this.importantmesh.position.setZ(0.5);


    // add the image to the scene
    groupofmeshs.add(this.importantmesh);



    //if this character doesnt already have its mesh made
    //if (this.healthmesh == null || this.manamesh == null) {
    //if this is a character, get a mesh for health and mana bars to return
    if (this.ischaracter == true) {


      //console.log(hpmesh);

      this.healthmesh.position.setX(this.xpos);
      this.healthmesh.position.setY(this.ypos);
      this.healthmesh.position.setZ(3);

      this.manamesh.position.setX(this.xpos);
      this.manamesh.position.setY(this.ypos);
      this.manamesh.position.setZ(2.3);

      this.healthmesh.scale.x =this.healthpercent;
      this.manamesh.scale.x =this.manapercent;

      groupofmeshs.add(this.healthmesh);
      groupofmeshs.add(this.manamesh);

    }

    //}

    return (groupofmeshs);

  }




  //the object is either a sprite or a 3d shape
  //either way it's either a single or a combination of meshs
  //so how do i scale them and retain their relations to each other


  //where are the animation frames and animation meshs stored for each of the objects

  //I have a function in a different file that given:
  //the name of the object
  //the action of the object
  //the frame that the object actions in

  //return a group of meshs of that object


  //so i'll have a list of sprites


  //given the
  //type of object
  //the animation of the object
  //and the frame of animation
  //return the appropriate mesh






  //there are like 20 different shapes

  //like different skins for each shapes

  //different animations for each shapes

  //different attacks for each shapes




  //charachters
  /*

  shark
  wolf
  bear
  farmer
  fox
  witch
  Slime
  pirate


  TOO MANY

  HOW CAN I STREAMLINE THE CREATION AND GET THE ANIMATIONS AND ACTIONS
  ASTHETIC IS STUPIDLY IMPORTANT HERE

  MAYBE FOCUS ON THE BASICS AND THEN I CAN WORK FROM THERE


  Farmer
  Peasant
  Hunter
  Wolves and feral animals
  Knight
  Prince



  */

}
