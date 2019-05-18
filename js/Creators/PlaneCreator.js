class PlaneCreator {

  constructor() {

    this.difficulty = 1;


    //negative for how rural it isthis.side
    //positive for how urban it is
    this.urbanness = 0;

    this.sizescalar = 1;


    //this is going to be the kingdom that owns the objects on this plane on the planes initialization
    this.kingdom = null;


  }

  setkingdom(kingdom) {

    this.kingdom = kingdom;

  }


  createfarmingplane() {
    //what parameters of creation does a farming plane have?




    //create a new plane of size x and y
    var newplane = new Plane(50 * this.sizescalar, 50 * this.sizescalar);


    var farmercreator = new ObjectCreator();

    console.log(farmercreator);

    farmercreator.setfarmer();

    var newobject = farmercreator.createobject();

    newplane.passinobject(newobject, 12, 12);

    for (var x = 1; x < 3 ; x += 1){
      for (var y = 1; y < 3 ; y += 1){
        var newobject = farmercreator.createobject();
        newplane.passinobject(newobject, (x+10) * 2, (y+10) * 2);

      }
    }






    //creating the borders


    var entitycreator = new ObjectCreator();
    entitycreator.setwall(49.999 * this.sizescalar, 1 * this.sizescalar);
    //create borders along for the walls
    newplane.passinobject(entitycreator.createobject(), 0, -1 * this.sizescalar);

    var entitycreator = new ObjectCreator();
    entitycreator.setwall(1 * this.sizescalar, 49.99 * this.sizescalar);
    //create borders along for the walls
    newplane.passinobject(entitycreator.createobject(),  -1.01*this.sizescalar, 0);


    var entitycreator = new ObjectCreator();
    entitycreator.setwall(1 * this.sizescalar, 49.99 * this.sizescalar);
    //create borders along for the walls
    newplane.passinobject(entitycreator.createobject(),  50 * this.sizescalar, 0);


    var entitycreator = new ObjectCreator();
    entitycreator.setwall(49.99 * this.sizescalar, 1 * this.sizescalar);
    //create borders along for the walls
    newplane.passinobject(entitycreator.createobject(),  0, 50 * this.sizescalar);



    //returns the plane
    return (newplane);
  }





}
