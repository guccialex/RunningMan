class Plane {

  constructor(xsize, ysize) {

    //the object lists needed
    this.objandposlist = new ObjandPosList();


    //size of this map
    //really should create on construction of border objects around it
    this.xsize = xsize;
    this.ysize = ysize;

    //the setting this object is in
    this.setting = null;


    //the mesh of this plane
    this.geometry = new THREE.BoxGeometry(this.xsize, this.ysize, 0.05);
    this.material = new THREE.MeshBasicMaterial();

    var loader = new THREE.TextureLoader();
    this.material = new THREE.MeshBasicMaterial({
      map: loader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg'),
    });
    this.planemesh = new THREE.Mesh(this.geometry, this.material);

    //move it down and to the right half its size so its rendered right
    this.planemesh.position.x = this.xsize / 2;
    this.planemesh.position.y = this.ysize / 2;
  }


  //methods
  /*

  passinobject(object, xposition, yposition)
  removeobject(object)
  updateposition(object, direction, distance)
  getposition(object)
  getcenterposition(object)
  addfromperspective(perspectiveobject, object, distance, rotationamount)
  getvisiblemeshs()
  updatelists()
  update()
  updaterender()

  */

  //set the setting this plane is in
  setsetting(setting) {
    this.setting = setting;
  }

  //get the setting this plane is in
  getsetting() {
    return (this.setting);
  }


  //given a shape, get the objects in the plane in that shape
  //takes in either a vertex list, or an xandy size as determined by the shapetype variable
  getobjectinshape(xandypos, shapetype, vertexlistorxandysize, rotation, type) {

    var objectsinshape = this.objandposlist.getshapeintersect(xandypos, shapetype, vertexlistorxandysize, rotation, type);

    return (objectsinshape)
  }




  //add an object into this plane, checks if it does
  passinobject(object, xposition, yposition) {

    //a check if it was passed in right
    if (xposition == null) {
      throw ('here');
    }

    //if this isnt tangible
    if (object.getistangible() == false) {

      //put it in the objandposlist
      this.objandposlist.addobject(object, [xposition, yposition]);

      //give it this plane
      object.setplane(this);

      //and this setting
      object.setsetting(this.setting);


      //it was passed in
      return (true);

    } else {

      //add the object here
      this.objandposlist.addobject(object, [xposition, yposition]);



      //check if it intersects with the tangibles
      if (this.objandposlist.doesintersect(object, "tangible")) {
        //if it does remove it from here, and return false
        this.objandposlist.removeobject(object);
        return (false);
      }


      //give it this plane
      object.setplane(this);

      //and this setting
      object.setsetting(this.setting);

      return (true);

    }

  }



  //remove this object from the plane
  removeobject(object) {

    //remove the object from the main list
    this.objandposlist.removeobject(object);

  }


  //update the position of an object already in this plane
  updateposition(object, direction, distance) {

    //get the object, its direction and its distance
    //and return whether this proposed new position will be able to go there

    //if the object isnt tangible
    if (object.istangible == false) {

      //just update its position
      this.objandposlist.setpos(object, topleftxandy);

      //return that it updates successfully
      return (true);

    }
    //if it is tangible
    else {

      //get the position of the object (it has to be in the tangible list, or something went very wrong)
      var oldxandypos = this.objandposlist.getpos(object, "tangible");

      var newxandypos = [0, 0];

      //get the new position you're trying to move it to
      newxandypos[0] = oldxandypos[0] + direction[0] * distance;

      newxandypos[1] = oldxandypos[1] + direction[1] * distance;


      //update the objects position in the plane
      this.objandposlist.setpos(object, newxandypos);


      //if it doesnt intersect, then return true
      if (this.objandposlist.doesintersect(object, "tangible") == false) {
        return (true);
      }
      //if it doesnt intersect with any tangible, revert it to its old pos, and return false
      else {
        //update the objects position in the plane
        this.objandposlist.setpos(object, oldxandypos);

      }
    }

  }



  //return the position of the object in the plane
  getposition(object) {

    return (this.objandposlist.getpos(object, "all"));

  }

  getcenterposition(object) {

    var topleftxandy = this.objandposlist.getpos(object, "all");

    //add half of its size to each of its dims so that it
    topleftxandy[0] += object.getxsize() / 2;

    topleftxandy[1] += object.getysize() / 2;

    return (topleftxandy);
  }



  //add an object into the scene using the object creating it
  //the distance from the object creating it, and the rotation to the left/right/behind
  //of the object
  addfromperspective(perspectiveobject, object, distance, rotationamount) {

    //get the position of the center of the object
    var perspectiveposcenter = this.getcenterposition(perspectiveobject);


    //get the direction of the object
    var perspectivedirection = perspectiveobject.getdirection();


    //rotate the perspective direction by the rotation array to get the total rotation

    var newperspx = Math.cos(rotationamount) * perspectivedirection[0] - Math.sin(rotationamount) * perspectivedirection[1];

    var newperspy = Math.sin(rotationamount) * perspectivedirection[0] + Math.cos(rotationamount) * perspectivedirection[1];


    //the xdistance from the perspective of the object
    var perspxvector = newperspx * distance;

    var perspyvector = newperspy * distance;


    //the center of the object passed is the distance from the object creating its center

    //the real xposition is the center plus the persp distance vector, minus half the xsize of the input object
    var xposition = perspxvector + perspectiveposcenter[0] - object.getxsize() / 2;

    var yposition = perspyvector + perspectiveposcenter[1] - object.getysize() / 2;



    //i have an x position, an object, and want to see if it can be put in


    //try to pass in the object and return what it returns

    return(this.passinobject(object, xposition, yposition));


  }


  //return the list of meshs
  getvisiblemeshs() {
    var listofmeshs = [];

    //get a list of objects in the plane
    var listofobjs = this.objandposlist.getposlist("all");


    for (var curobject in listofobjs) {

      //get the current object
      var curmesh = listofobjs[curobject].getobject();

      //for that object, update it's mesh
      curmesh.updatemesh();

      //update the position of the mesh
      curmesh.updatemeshpos(listofobjs[curobject].getpos()[0], listofobjs[curobject].getpos()[1]);

      //get the mesh group of the object
      curmesh = curmesh.getmesh();

      //push it into the list of meshs
      listofmeshs.push(curmesh);
    }


    //add this plane's mesh to the listofmeshs
    listofmeshs.push(this.planemesh);

    return (listofmeshs);
  }

  updatelists() {

    //update the lists
    this.objandposlist.updatelists();

  }

  update() {


    //update all the lists so that my lists are valid
    this.updatelists();







    //call update on all the objects
    var allobjects = this.objandposlist.getlist("all");

    for (var curobjitr in allobjects) {

      allobjects[curobjitr].update();

    }


    //remove all expired objects
    for (var curobjitr in allobjects) {
      if (allobjects[curobjitr].isexpired == true) {

        this.removeobject(allobjects[curobjitr]);
      }
    }



    //gives the list of attack objects
    var allattackobjects = this.objandposlist.getlist("attack");


    //console.log(allattackobjects);

    //check for intersections between attack objects and attackables
    for (var curattackitr in allattackobjects) {


      var curattack = allattackobjects[curattackitr];

      //if an attack lands on something
      if (this.objandposlist.doesintersect(curattack, "attackable")) {

        //get that attackable thing
        var listofattacked = this.objandposlist.getintersect(curattack, "attackable");

        //for each of the things attacked, call the landed attack function thing

        for (var attacked = 0; attacked < listofattacked.length; attacked += 1) {

          curattack.landedattack(listofattacked[attacked]);

        }
      }
    }
  }




  //i dont know when or where i use this
  /*
  updaterender(){
   var allobjects = this.objandpos.getlist();

   //call update on all the charachter objects
   for (var curobjitr in allobjects){
    allobjects[curobjitr].updaterender();
   }
  }
  */

}
