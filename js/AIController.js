//the controller for the ai of an object

class AIController {

  //each object has its own AI controlling it

  constructor(thisguy) {

    this.thisguy = thisguy;

    this.attacktarget = null;

    //a list of all objects they see
    this.sight = [];

    this.vertexlist = null;

    this.rotation = 0;
  }

  //update the this.sight to be a list of all the objects in this objects sight
  getsight() {

    //get the position of this object
    var pos = this.thisguy.getposonplane();
    var xpos = pos[0];
    var ypos = pos[1];

    //get the sight ranges of this object
    var widesight = this.thisguy.widesight;
    var tallsight = this.thisguy.tallsight;

    //now get a vertex shape for the triangle of its vision
    this.vertexlist = [
      [0, 0],
      [tallsight, -widesight/2],
      [tallsight, widesight]
    ];

    //get the direction of the object for the rotation of the vertex
    var dir = this.thisguy.getdirection();

    //taken from https://stackoverflow.com/questions/2676719/calculating-the-angle-between-the-line-defined-by-two-points
    var theta_radians = Math.atan2(dir[1], dir[0]);

    this.rotation = theta_radians;


    //get the plane of the object
    var theplane = this.thisguy.getplane();

    //set all the objects I see
    this.sight = theplane.getobjectinshape(pos, "nonallignedbox", this.vertexlist, this.rotation, "all");

  }

  //get distance between thisguy and attacktarget
  getdistance() {

    var targetpos = this.attacktarget.getposonplane()
    var myguypos = this.thisguy.getposonplane();

    var xdistance = targetpos[0] - myguypos[0];

    var ydistance = targetpos[1] - myguypos[1];

    var realdistance = Math.sqrt(xdistance * xdistance + ydistance * ydistance);

    return (realdistance);
  }

  updatedirection() {

    var targetpos = this.attacktarget.getposonplane()
    var myguypos = this.thisguy.getposonplane();

    var xdistance = targetpos[0] - myguypos[0];

    var ydistance = targetpos[1] - myguypos[1];

    this.thisguy.setdirection([xdistance, ydistance]);

  }

  giveaction() {

    //decide on what actions to perform

    //right now, its just that if he's close to
    //the target, give him the stab action

  }

  updatetarget() {


    //go through objects seen, and run towards and attempt to attack
    //the closest enemy

    //this commented out thing counts how many times this occurs per second


    var seesatarget = false;

    //it shouldnt just not change the attack target if none is found
    //it should remove the old one from being the target if like, with even better vision, it's still not visible

    for (var curint in this.sight) {

      var curobject = this.sight[curint];


      //should be if the side is not its, rather than just my guy specifically
      //and really should be a stored list of the kingdoms which they get aggroed at
      //which can be changed from their kingdom of course

      if (curobject.getside() == "mykingdom") {
        this.attacktarget = curobject;

        seesatarget = true;
      }

    }

    if (seesatarget == false) {
      this.attacktarget = null;
    }

  }

  update() {

    //get list of objects around you
    this.getsight();


    //update target to attack
    this.updatetarget();

    //if this AI has a target
    if (this.attacktarget != null) {
      //update direction to the target
      this.updatedirection();


      //if the target is some amount close

      if (this.getdistance() < 3) {


        //prepare attack
        this.thisguy.giveaction("stab");
      }
    }



  }


}
