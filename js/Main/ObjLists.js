class ObjandPosList {

  constructor() {

    this.nameoftangible = "tangible";

    this.nameofattackable = "attackable";

    this.nameofdrop = "drop";

    this.nameofattackobject = "attack";

    this.nameofmobileobject = "mobile";

    this.nameofvisibleobject = "visible";



    //the list of all objects, each element is [objandpos, [tangiblebool, attackablebool....]]
    this.mainlist = [];

    //a simple array of all the object in this class
    this.mirroredobjects = [];


  }


  getlist(typeoflist) {

    //valid types to get

    //"all"
    //"tangible"
    //"attackable"
    //"drops"
    //"attackobject"
    //"mobileobject"
    //"visibleobject"


    var newlist = [];

    //go through the main list, and for each object that is of the quality
    //then append it to this list, and return this list


    for (var thelist in this.mainlist) {

      var current = this.mainlist[thelist];

      if (typeoflist == "all") {

        newlist.push(this.mirroredobjects[thelist]);
      }

      //if i want to get the list of tangibles
      if (typeoflist == this.nameoftangible) {
        //if the second element of the main list says that this is tangible
        if (current[1][0] == true) {
          //add the objandpos object to this list im making
          newlist.push(this.mirroredobjects[thelist]);
        }
      }

      if (typeoflist == this.nameofattackable) {

        if (current[1][1] == true) {
          newlist.push(this.mirroredobjects[thelist]);
        }
      }


      if (typeoflist == this.nameofdrop) {
        if (current[1][2] == true) {
          newlist.push(this.mirroredobjects[thelist]);
        }
      }


      if (typeoflist == this.nameofattackobject) {

        if (current[1][3] == true) {
          newlist.push(this.mirroredobjects[thelist]);
        }
      }


      if (typeoflist == this.nameofmobileobject) {
        if (current[1][4] == true) {
          newlist.push(this.mirroredobjects[thelist]);
        }
      }

      if (typeoflist == this.nameofvisibleobject) {
        if (current[1][5] == true) {
          newlist.push(this.mirroredobjects[thelist]);
        }
      }

    }



    return (newlist);

  }


  //get the a list of the objandpos objects for the list desired
  getposlist(typeoflist) {

    var newlist = [];

    for (var thelist in this.mainlist) {

      var current = this.mainlist[thelist];

      if (typeoflist == "all") {
        newlist.push(current[0]);
      }

      //if i want to get the list of tangibles
      if (typeoflist == this.nameoftangible) {
        //if the second element of the main list says that this is tangible
        if (current[1][0] == true) {
          //add the objandpos object to this list im making
          newlist.push(current[0]);
        }
      }
      if (typeoflist == this.nameofattackable) {
        if (current[1][1] == true) {
          newlist.push(current[0]);
        }
      }
      if (typeoflist == this.nameofdrop) {
        if (current[1][2] == true) {
          newlist.push(current[0]);
        }
      }
      if (typeoflist == this.nameofattackobject) {
        if (current[1][3] == true) {
          newlist.push(current[0]);
        }
      }
      if (typeoflist == this.nameofmobileobject) {
        if (current[1][4] == true) {
          newlist.push(current[0]);
        }
      }
      if (typeoflist == this.nameofvisibleobject) {
        if (current[1][5] == true) {
          newlist.push(current[0]);
        }
      }
    }

    return (newlist);
  }


  //return the objandpos object if its in this list
  getobjandpos(object, typeofobject) {

    //see if the object is in the plane at all
    var objectpos = this.mirroredobjects.indexOf(object)

    //if its the plane at all
    if (objectpos != -1) {

      //get the objandpos object of the appropriate object because in the mirrored list
      //its in the same spot

      var theobject = this.mirroredobjects[objectpos];

      //the objandpos object of the one entered
      var objandposobject = this.mainlist[objectpos][0];

      //if the object is in the appropriate list

      if (typeofobject == "all") {
        return (objandposobject);
      }

      if (typeofobject == this.nameoftangible && theobject.getistangible()) {
        return (objandposobject);
      }

      if (typeofobject == this.nameofattackable && theobject.getisethral() == false) {
        return (objandposobject);
      }

      if (typeofobject == this.nameofdrop && theobject.getispickupable()) {
        return (objandposobject);
      }

      if (typeofobject == this.nameofattackobject && theobject.getdoesdamage()) {
        return (objandposobject);
      }

      if (typeofobject == this.nameofmobileobject && theobject.getismobile()) {
        return (objandposobject);
      }

      if (typeofobject == this.nameofvisibleobject && theobject.getisvisible()) {
        return (objandposobject)
      }

      //DONT CURRENT HAVE A FUNCTION FOR VISIBLE
      //GUESS I SHOULD ADD ONE HUH

      //if none of those pass
      return ("not found in appropriate list");

    } else {

      return ("no object in plane");
    }

  }



  //if this list has the object, with the type of object specified
  hasobject(object, typeofobject) {

    //see if the object is in the plane at all
    var objectpos = this.mirroredobjects.indexOf(object)

    //if its the plane at all
    if (objectpos != -1) {

      var theobject = this.mirroredobjects[objectpos];

      //if the object is in the appropriate list

      if (typeofobject == "all") {
        return (true);
      }

      if (typeofobject == this.nameoftangible && theobject.getistangible()) {
        return (true);
      }

      if (typeofobject == this.nameofattackable && theobject.getisethral() == false) {
        return (true);
      }

      if (typeofobject == this.nameofdrop && theobject.getispickupable()) {
        return (true);
      }

      if (typeofobject == this.nameofattackobject && theobject.getdoesdamage()) {
        return (true);
      }

      if (typeofobject == this.nameofmobileobject && theobject.getismobile()) {
        return (true);
      }

      if (typeofobject == this.nameofvisibleobject && theobject.getisvisible()) {
        return (true);
      }


      //if none of those pass
      return ("not found in appropriate list");

    } else {

      return ("no object in plane");
    }

  }

  //a helper function for internal use
  _gettypeofobjectarray(object) {

    //given an object, create the array that stores what type of lists its in

    var thearray = [false, false, false, false, false, true];

    if (object.getistangible()) {
      thearray[0] = true;
    }

    if (object.getisethral() == false) {
      thearray[1] = true;
    }

    if (object.getispickupable()) {
      thearray[2] = true;
    }

    if (object.getdoesdamage()) {
      thearray[3] = true;
    }

    if (object.getismobile()) {
      thearray[4] = true;
    }

    if (object.getisvisible()) {
      thearray[5] = true;
    }

    return (thearray);

  }

  _isobjectoftype(theobject, type) {

    //given an object in this list, and a quality of the object, determine if
    //its in the proper list in this object list


    if (type == "all") {
      return (true);
    } else if (type == this.nameoftangible) {
      if (theobject.getistangible()) {
        return (true);
      }
    } else if (type == this.nameofattackable) {
      if (theobject.getisethral() == false) {
        return (true);
      }
    } else if (type == this.nameofdrop) {
      if (theobject.getispickupable()) {
        return (true);
      }
    } else if (type == this.nameofattackobject) {
      if (theobject.getdoesdamage()) {
        return (true);
      }
    } else if (type == this.nameofmobileobject) {
      if (theobject.getismobile()) {
        return (true);
      }
    } else if (type == this.nameofvisibleobject) {
      if (theobject.getisvisible()) {
        return (true);
      }
    } else {

      return (false)
    }


  }


  //add an objandpos object to this list
  passinobject(objandposobject) {

    //create the array with the appro

    var thetypeofobjectarray = this._gettypeofobjectarray(objandposobject.getobject());

    this.mainlist.push([objandposobject, thetypeofobjectarray]);

    this.mirroredobjects.push(objandposobject.getobject());

    //how do I prevent adding the same object twice?
    // I think the solution is, that I just dont do that

  }


  //add an object to the list
  addobject(object, xposandypos) {

    var objandposobject = new ObjandPos(object, xposandypos[0], xposandypos[1], object.shapetype, object.vertexlist);

    var dir = object.getdirection();

    var radians = Math.atan2(dir[1], dir[0]);

    //set its rotation
    objandposobject.setrotation(radians);

    var thetypeofobjectarray = this._gettypeofobjectarray(object);

    this.mainlist.push([objandposobject, thetypeofobjectarray]);

    this.mirroredobjects.push(objandposobject.getobject());

  }


  //given an object and a list, return the position of the object if its in it
  getpos(object, typeoflist) {

    //find the object in the mirrored list
    var objectindex = this.mirroredobjects.indexOf(object);

    if (objectindex != -1) {

      //determine if the object list is the proper type for this one
      //if it is
      if (this._isobjectoftype(object, typeoflist)) {

        //get the position object and return its position
        return (this.mainlist[objectindex][0].getpos());

      } else {

        throw ('object not found in this specific list');
      }

    }

    //if the object isnt found
    throw ('object not found in any list');

  }


  setpos(object, xposandypos) {

    //find the object and five it a new pos
    var objectindex = this.mirroredobjects.indexOf(object);

    //set the position of the objandpos object
    this.mainlist[objectindex][0].setpos(xposandypos[0], xposandypos[1]);

  }


  //remove the object from the list
  removeobject(object) {

    //find the object
    var objectindex = this.mirroredobjects.indexOf(object);


    if (objectindex != -1) {
      //remove it from the mirrored object list
      this.mirroredobjects.splice(objectindex, 1);

      //remove it from the main object list
      this.mainlist.splice(objectindex, 1);
    }

  }


  //does this object intersect with anything in the list of the same type
  //if they're not the same object
  doesintersect(object, type) {


    //get the objandpos object that this object in this list has
    var objectindex = this.mirroredobjects.indexOf(object);

    if (this.objectindex != -1) {

      var objandpos = this.mainlist[objectindex][0];

      //check this objandpos agaist all other objsandpos of the other objects
      //of that type of list
      //and if they intersect, return "true", if none intersect, return "false"


      for (var checkingindex = 0; checkingindex < this.mainlist.length; checkingindex += 1) {


        //the obj and pos im currently checking against
        var curobjandpos = this.mainlist[checkingindex][0];


        //if they're not the same object
        if (objandpos != curobjandpos) {

          //if the curobjandpos is of the right type
          if (this._isobjectoftype(curobjandpos.getobject(), type)) {

            //check if the objects intersect
            if (objandpos.doesobjandposintersect(curobjandpos)) {
              //if they do, return true
              return (true);
            }

          }
        }
      }

      //if none of the objects intersect and the loop finishes, return false
      return (false);

    } else {

      throw ("object not found in the list");
    }

  }


  //return the objects that this one intersects with
  getintersect(object, type) {

    var intersections = [];
    //get the objandpos object that this object in this list has
    var objectindex = this.mirroredobjects.indexOf(object);
    if (this.objectindex != -1) {
      var objandpos = this.mainlist[objectindex][0];
      //check this objandpos agaist all other objsandpos of the other objects
      //of that type of list
      //and if they intersect, return "true", if none intersect, return "false"
      for (var checkingindex = 0; checkingindex < this.mainlist.length; checkingindex += 1) {
        //the obj and pos im currently checking against
        var curobjandpos = this.mainlist[checkingindex][0];
        //if they're not the same object
        if (objandpos != curobjandpos) {
          //if the curobjandpos is of the right type
          if (this._isobjectoftype(curobjandpos.getobject(), type)) {
            //check if the objects intersect
            if (objandpos.doesobjandposintersect(curobjandpos)) {
              //if they do, add it to the list to return
              intersections.push(curobjandpos.getobject());
            }
          }
        }
      }
    } else {
      throw ("object not found in the list");
    }
    if (intersections == []) {
      //if none of the objects intersect and the loop finishes, return false
      throw ("The object isnt here like you think");
    }
    return (intersections);
  }


  //get the list of objects of the type that intersect with this shape
  getshapeintersect(xandypos, shapetype, vertexlistorxandysize, rotation, type) {

    if (shapetype == "allignedbox") {
      //create a objandpos object
      var theobj = new ObjandPos(null, xandypos[0], xandypos[1], "allignedbox", null);

      //set the size of the object
      theobj.updatesize(vertexlistorxandysize);
    } else if (shapetype == "nonallignedbox") {
      //create a objandpos object
      var theobj = new ObjandPos(null, xandypos[0], xandypos[1], "nonallignedbox", vertexlistorxandysize);

      theobj.setrotation(rotation);
    } else {
      console.log("what is it other than  an alligned box or nonallignedbox");
    }


    //the list of objects interected
    var intersections = [];


    //go through all the objects in the list
    for (var checkingindex in this.mainlist) {


      //the obj and pos im currently checking against
      var curobjandpos = this.mainlist[checkingindex][0];

      //if the curobjandpos is of the right type
      if (this._isobjectoftype(curobjandpos.getobject(), type)) {

        //check if the objects intersect
        if (theobj.doesobjandposintersect(curobjandpos)) {
          //if they do, add the object to the list of objects

          intersections.push(curobjandpos.getobject());


        }

      }

    }

    //return the list of objects that intersected
    return (intersections);

  }







  //update all objects to be in the right lists
  updatelists() {

    for (var currentindex in this.mainlist) {

      var currentobject = this.mainlist[currentindex][0].getobject();

      var arrayoftypes = this._gettypeofobjectarray(currentobject);

      this.mainlist[currentindex][1] = arrayoftypes;

    }


  }


}


//a function that determines if two lines intersect
//stolen directly from https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
function dolinesintersect(line1point1, line1point2, line2point1, line2point2) {

  var a = line1point1[0];
  var b = line1point1[1];
  var c = line1point2[0];
  var d = line1point2[1];
  var p = line2point1[0];
  var q = line2point1[1];
  var r = line2point2[0];
  var s = line2point2[1];


  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};




//given a line, and two points, determine if those points are on the same side of the line
function isonsameside(linepoint1, linepoint2, point1, point2) {

  var value1 = (point1[0] - linepoint1[0]) * (linepoint2[1] - linepoint1[1]) - (point1[1] - linepoint1[1]) * (linepoint2[0] - linepoint1[0]);

  var value2 = (point2[0] - linepoint1[0]) * (linepoint2[1] - linepoint1[1]) - (point2[1] - linepoint1[1]) * (linepoint2[0] - linepoint1[0]);



  if (value1 == 0 || value2 == 0) {
    //this tells whether it lies on the line, then just assume that they're not on the same side
    //return (false);
  }

  //now determine if they have the same sign or different sign

  if (value1 > 0 && value2 < 0) {
    //if they have a different sign, they are on opposite sides of the line
    return (false);
  }
  if (value1 < 0 && value2 > 0) {
    //if they have a different sign, they are on opposite sides of the line
    return (false);
  }

  //else, they are on the same side and return true
  return (true);



}





class ObjandPos {

  constructor(object, xpos, ypos, shapetype, vertexlist) {

    this.storedobject = object;

    //the position of the object on the plane
    //is the topleft position of a allignedbox shape
    //if the position of the "origin" for a non allignedbox shape
    this.xpos = xpos;
    this.ypos = ypos;


    //how far left from the origin of the points is the leftmost point
    this.negativexbound = 0;
    //how far above the origin of the points is the topmost point
    this.negativeybound = 0;
    //how far right from the origin of the points is the rightmost point
    this.positivexbound = 0;
    //how far below the origin of the points is the bottommost point
    this.positiveybound = 0;


    //can either be "allignedbox" or "nonallignedbox"
    //if it's "allignedbox",the only check that needs to be done to check if they intersect
    //is the preliminary "do the bounding boxes intersect" check
    this.shapetype = shapetype;


    //this is the heights of the object
    //from ground to torso to above head heights
    //objects dont intersect if a true in their heights dont intersect
    this.heights = [true, true, false];


    //the list of the verticies for the "nonallignedbox" types of objects
    //the origin is assumed to be the point of rotation of the shape
    //vertex (i) connects to vertex (i+1) and vertex (n) connects to vertex (0)
    this.vertexlist = vertexlist;



    //if the shape is a box, create the vertices of it
    if (this.shapetype == "allignedbox") {

      //if a real object was put into this object
      if (object != null) {

        var point1 = [0, 0];
        var point2 = [object.xsize, 0];
        var point3 = [object.xsize, object.ysize];
        var point4 = [0, object.ysize];
        this.vertexlist = [point1, point2, point3, point4];

      }
      //if a fake object was enetered, just set the vertex for a box of size [1,1]
      else {

        this.vertexlist = [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1]
        ];

      }

    }


    //the rotation of the shape, in radians, I don't know if I should use matrixs
    this.shaperotation = 0;


    //update the bounding boxes of this object
    this.updateboundingbox();



  }

  //set the rotation of the shape
  setrotation(rotation) {
    //set the rotation
    this.shaperotation = rotation;

    //if this was an alligned box, then it becomes a non-allignedbox
    this.shapetype = "nonallignedbox";

    //update its bounding boxes
    this.updateboundingbox();
  }


  //update the size of the object
  updatesize(xsize, ysize) {

    //first, get the xsize and ysize of the object, by it's bound size
    var curxsize = this.positivexbound - this.negativexbound;
    var curysize = this.positiveybound - this.negativeybound;


    //now get how much I'll need to scale it on the x and y axis, to apply to the vertexes

    var xsizescalar = xsize / curxsize;

    var ysizescalar = ysize / curysize;


    //now scale the x and y values of each vertex in the list by the appropriate scalar
    for (var curint in this.vertexlist) {

      var currentvertex = this.vertexlist[curint];

      currentvertex[0] = currentvertex[0] * xsizescalar;

      currentvertex[1] = currentvertex[1] * ysizescalar;
    }


    //and update the bounding box
    this.updateboundingbox();

  }


  //when the object rotates or changes size, i'll need to update it's bounding box
  updateboundingbox() {


    var smallestx = 100000;
    var smallesty = 100000;
    var biggestx = -100000;
    var biggesty = -100000;

    //get the vertexs rotated
    var rotatedverts = this._getrotatedverts(this);

    //get the largest and smallest xpos of the points in the vertexlist
    for (var curint in rotatedverts) {

      var curpoint = rotatedverts[curint];

      if (curpoint[0] > biggestx) {
        biggestx = curpoint[0]
      }

      if (curpoint[0] < smallestx) {
        smallestx = curpoint[0]
      }

      if (curpoint[1] > biggesty) {
        biggesty = curpoint[1];
      }

      if (curpoint[1] < smallesty) {
        smallesty = curpoint[1];
      }

    }

    //save the updated bounding boxes for this object

    this.negativexbound = smallestx;
    this.negativeybound = smallesty;
    this.positivexbound = biggestx;
    this.positiveybound = biggesty;

  }

  getobject() {

    return (this.storedobject);
  }


  //given another objandpos object, see if it intersects with this one
  doesobjandposintersect(objandpos) {



    var itself = objandpos.getobject();

    var isme = (itself.getside() == "mykingdom");


    //get the topleft and bottom right points
    var tempxpos1 = this.xpos + this.negativexbound;
    var tempxpos2 = this.xpos + this.positivexbound;

    var tempypos1 = this.ypos + this.negativeybound;
    var tempypos2 = this.ypos + this.positiveybound;

    var thistopleft = [];
    var thisbottomright = [];
    var thattopleft = [];
    var thatbottomright = [];


    if (tempxpos1 < tempxpos2) {
      thistopleft.push(tempxpos1);
      thisbottomright.push(tempxpos2);
    } else {
      thistopleft.push(tempxpos2);
      thisbottomright.push(tempxpos1);
    }

    if (tempypos1 < tempypos2) {
      thistopleft.push(tempypos1);
      thisbottomright.push(tempypos2);
    } else {
      thistopleft.push(tempypos2);
      thisbottomright.push(tempypos1);
    }


    //get the topleft and bottom right points
    var tempxpos1 = objandpos.xpos + objandpos.negativexbound;
    var tempxpos2 = objandpos.xpos + objandpos.positivexbound;

    var tempypos1 = objandpos.ypos + objandpos.negativeybound;
    var tempypos2 = objandpos.ypos + objandpos.positiveybound;


    if (tempxpos1 < tempxpos2) {
      thattopleft.push(tempxpos1);
      thatbottomright.push(tempxpos2);
    } else {
      thattopleft.push(tempxpos2);
      thatbottomright.push(tempxpos1);
    }

    if (tempypos1 < tempypos2) {
      thattopleft.push(tempypos1);
      thatbottomright.push(tempypos2);
    } else {
      thattopleft.push(tempypos2);
      thatbottomright.push(tempypos1);
    }

    var boxintersection = true;



    //check if they intersect

    //if my object1 is to the right of object2
    if (thistopleft[0] > thatbottomright[0]) {
      //no colission detected
      boxintersection = false;
    }
    //if object2 is to the right of object1
    else if (thattopleft[0] > thisbottomright[0]) {
      //no colission detected
      boxintersection = false;
    }
    //if object1 is lower than object2
    else if (thistopleft[1] > thatbottomright[1]) {
      //no colission detected
      boxintersection = false;
    }
    //if object2 is lower than object1
    else if (thattopleft[1] > thisbottomright[1]) {
      //no colission detected
      boxintersection = false;
    }
    //if there are colissions in the boundinig box

    if (boxintersection == false) {
      return (false);
    }

    //if they're both axis alligned boxes, return that there is an intersection
    if (this.shapetype == "allignedbox" && objandpos.shapetype == "allignedbox") {
      return (true);
    }




    //otherwise go on to do the in depth check
    //the "line intersection than if they're inside each other" method

    //console.log(dolinesintersect([0,0],[2,0],[1,1],[1,-1]));




    //check if the edges of the objects overlap
    var edgesoverlap = false;

    //get a list of the rotated and translated verts edges of object1
    var obj1verts = this._getrotatedandtranslatedverts(this);

    //get a list of the rotated and translated verts of object2
    var obj2verts = this._getrotatedandtranslatedverts(objandpos);

    var obj1edges = [];

    var obj2edges = [];

    //convert those edges to vertices

    for (var theint in obj1verts) {

      var curint = parseInt(theint);

      var curpoint = obj1verts[curint % obj1verts.length];

      var nextpoint = obj1verts[(curint + 1) % obj1verts.length];

      obj1edges.push([curpoint, nextpoint]);

    }

    for (var theint in obj2verts) {

      var curint = parseInt(theint);

      var curpoint = obj2verts[curint % obj2verts.length];

      //THIS LOOKS LIKE AN UNNCESSARY LINE
      //IT F*G DOES BUT I NEED IT FOR SOME F**G REASON
      //OR ELSE 2%4 = 3 FOR SOME REASON
      //APPARENTLY, IF ITS CURINT + 1 INSTEAD OF 1 + CURINT
      //JAVA THINKS IM ADDING STRINGS FOR SOME REASON
      //SO 11 % 4 = 3      ABSOLUTELY AMAZING
      //var nextpointvalue = 1 + parseInt(curint);

      var nextpoint = obj2verts[(curint + 1) % obj2verts.length];

      obj2edges.push([curpoint, nextpoint]);

    }




    var whatedgesintersect = [];




    //for each edge in this object
    for (var theint in obj1edges) {

      var curint = parseInt(theint);

      //get an edge of this object
      var currentedge = obj1edges[curint];

      //for each vertex in the object being checked against
      for (var theirint in obj2edges) {

        //get an edge of the object being checked against
        var theiredge = obj2edges[theirint];

        //if that edge and this edge intersect
        if (dolinesintersect(currentedge[0], currentedge[1], theiredge[0], theiredge[1]) != false) {

          whatedgesintersect.push(currentedge[0], currentedge[1], theiredge[0], theiredge[1]);

          //return that there has been edge overlapping and therefore intersection
          return (true);

        }

      }

    }








    //if (this.shapetype == "nonallignedbox") {
    //  console.log(this);
    //  console.log(objandpos);
    //  console.log("its edges dont overlap with mine");
    //}


    //now check if the objects are inside either of the other ones
    var is1inside2 = true;
    var is2inside1 = true;

    //these are already set the PROPER way like 40 lines above, so I dont need to again
    //var obj1edges = this._getrotatedandtranslatededges(this);
    //var obj2edges = this._getrotatedandtranslatededges(objandpos);


    //check if any point of object1 is in object2 (which will be representative of the whole shape)
    var object1point = obj1verts[0];

    //check if any point of object2 is in object1 (which will be representative of the whole shape)
    var object2point = obj2verts[0];


    for (var theint in obj2edges) {

      var curint = parseInt(theint);

      //for each edge of the shape
      var currentedge = obj2edges[curint];

      //using the next point in the list of edges to get one that should be on the side of the inside
      var insidepoint = obj2edges[(curint + 1) % obj2edges.length][1];

      //if any of the points are on the outside, not on the same side as the inside, then object1 is not in object2
      if (isonsameside(currentedge[0], currentedge[1], object1point, insidepoint) == false) {
        is1inside2 = false;
      }

    }




    for (var theint in obj1edges) {

      var curint = parseInt(theint);

      //for each edge of the shape
      var currentedge = obj1edges[curint];

      //using the next point in the list of edges to get one that should be on the side of the inside
      var insidepoint = obj1edges[(curint + 1) % obj1edges.length][1];

      if (isonsameside(currentedge[0], currentedge[1], object2point, insidepoint) == false) {
        //if any of the points are on the outside side, it's not inside it
        is2inside1 = false;
      }

    }




    //if either 1 is inside 2 or 2 is inside 1 return true for intersection,
    //otherwise return that there is no intersection
    if (is1inside2 || is2inside1) {
      return (true);
    } else {
      return (false);
    }



  }


  //get the list of vertices after being rotated around the origin
  _getrotatedverts(objandposobject) {


    //get the vertexes for the object
    var oldvertexlist = objandposobject.vertexlist;


    var vertexlist = [];

    //the rotation amount
    var rotation = objandposobject.shaperotation;

    //rotate them all by the rotation value and put them in the new list
    for (var vertint in oldvertexlist) {

      var curvert = oldvertexlist[vertint];

      var newx = Math.cos(rotation) * (curvert[0]) - Math.sin(rotation) * (curvert[1]);

      var newy = Math.sin(rotation) * (curvert[0]) + Math.cos(rotation) * (curvert[1]);

      //put that vertex into the new list
      vertexlist.push([newx, newy]);
    }

    //return the rotated list of vertices
    return (vertexlist);
  }


  //given an objandpos, get a list of it's edges that are translated according to its position
  _gettranslatedverts(objandposobject) {

    var vertexlist = objandposobject.vertexlist;

    var xoffset = objandposobject.getpos()[0];

    var yoffset = objandposobject.getpos()[1];

    var translatedlist = [];

    for (var curint in vertexlist) {

      var firstpoint = [vertexlist[curint % vertexlist.length][0] + xoffset, vertexlist[curint % vertexlist.length][1] + yoffset];

      translatedlist.push(firstpoint)

    }

    //return the list of edges with the translations
    return (translatedlist);

  }

  //return the rotated than translated vertex of the object
  _getrotatedandtranslatedverts(objandposobject) {

    var rotatedvert = this._getrotatedverts(objandposobject);

    var xoffset = objandposobject.getpos()[0];

    var yoffset = objandposobject.getpos()[1];

    var translatedlist = [];


    for (var curint in rotatedvert) {

      var firstpoint = [rotatedvert[curint % rotatedvert.length][0] + xoffset, rotatedvert[curint % rotatedvert.length][1] + yoffset];

      translatedlist.push(firstpoint)

    }



    //return the list of edges with the rotations and translations
    return (translatedlist);

  }


  setpos(xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
  }


  getpos() {
    return ([this.xpos, this.ypos]);
  }



}
