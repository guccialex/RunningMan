class Plane{

	constructor(xsize, ysize){


		//the object lists needed

		//the list of objects in this plane
		this.objandpos = new ObjandPosList();
		//will be run into
		this.tangible = new ObjandPosList();
		//will take attacks
		this.attackable =  new ObjandPosList();
		//the drops on this plane
		this.drops =  new ObjandPosList();
		//all attack objects
		this.attackobjects =  new ObjandPosList();
		//all mobile objects
		this.mobileobjects =  new ObjandPosList();
		//all visible objects
		this.visibleobjects =  new ObjandPosList();



		//the proportion of control that each side has over this plane
		//calculated by the amount of objects of each side that are on this plane
		this.control = [["kingdom1", 0.5], ["myside", 0.5]];


		//size of this map
		//really should create on construction of border objects around it
		this.xsize = xsize;
		this.ysize = ysize;



		this.geometry = new THREE.BoxGeometry( this.xsize, this.ysize, 0.05 );
		this.material = new THREE.MeshBasicMaterial();

		this.planemesh  = new THREE.Mesh( this.geometry, this.material );

		//move it down and to the right half its size so its rendered right
		this.planemesh.position.x = this.xsize /2;
		this.planemesh.position.y = this.ysize /2;

		//find out how rendering works and how to pass it through
		//this.scene.push(this.planemesh);
	}


	//methods
	/*

	setsetting(setting)
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




	//setters for this objects plane and floor
	setsetting(setting){

		//set this variables setting
		this.setting = setting;


		var listofobjects = this.objandpos.getlist();

		//set the setting of each object inside to this setting
		for (var curobj in listofobjects){
			listofobjects[curobj].getobject().setsetting(setting);
		}
	}




	passinobject(object, xposition, yposition){
		this.objandpos.addobject(object, [xposition, yposition]);

		if (xposition == null){
			throw ("here");
		}

		//give it this plane
		object.setplane(this);

		//and this setting
		object.setsetting(this.setting);
	}


	//remove this object from the plane
	removeobject(object){

		//remove the object from the main list
		this.objandpos.removeobject(object);

		//and update the lists to reflect its removal
		this.updatelists();
	}




	updateposition(object, direction, distance){

		//get the object, its direction and its distance
		//and return whether this proposed new position will be able to go there

		//get the object in the list
		var topleftxandy = this.objandpos.getpos(object);

		//console.log("old");
		//console.log(topleftxandy);

		//get the new topleftx & y positions
		topleftxandy[0] += direction[0] *distance;

		topleftxandy[1] += direction[1] *distance;



		//see if this object and its new position intersect with any object in tangible

		if (this.tangible.doesintersect(object, topleftxandy) == false){

			this.objandpos.setpos(object, topleftxandy);

		}
		else{

			//console.log("collided");

			return(false);
		}

	}



	//return the position of the object in the plane
	getposition(object){

		return(this.objandpos.getpos(object));

	}




	getcenterposition(object){


		var topleftxandy = this.objandpos.getpos(object);


		//add half of its size to each of its dims so that it
		topleftxandy[0] += object.getxsize()/2;

		topleftxandy[1] += object.getysize()/2;


		return(topleftxandy);
	}



	//add an object into the scene using the object creating it
	//the distance from the object creating it, and the rotation to the left/right/behind
	//of the object
	addfromperspective(perspectiveobject, object, distance, rotationamount){

		//get the position of the center of the object
		var perspectiveposcenter = this.getcenterposition(perspectiveobject);


		//get the direction of the object
		var perspectivedirection = perspectiveobject.getdirection();


		//rotate the perspective direction by the rotation array to get the total rotation

		var newperspx = Math.cos(rotationamount)*perspectivedirection[0] - Math.sin(rotationamount) * perspectivedirection[1];

		var newperspy =	Math.sin(rotationamount)*perspectivedirection[0] + Math.cos(rotationamount) * perspectivedirection[1];


		//the xdistance from the perspective of the object
		var perspxvector = newperspx * distance;

		var perspyvector = newperspy * distance;


		//the center of the object passed is the distance from the object creating its center

		//the real xposition is the center plus the persp distance vector, minus half the xsize of the input object
		var xposition = perspxvector + perspectiveposcenter[0] - object.getxsize()/2;

		var yposition = perspyvector + perspectiveposcenter[1] - object.getysize()/2;



		//if the object is tangible and intersecting with any tangible object,
		//reduce the distance that you want to put the object in at and try again
		//and try again until it becomes 0, then return that you cant do it
		if (object.getistangible()){

			if (this.tangible.doesintersect(object, [xposition,yposition])){

				//readjust placement in the scene until you can readjust no more, then return false
				return(false);

			}

			else{
				//returns "false"
				//which means nothing intersects
				//so alls good
			}
		}



		//then add it to the main list of objects and update all the object lists
		this.objandpos.addobject(object, [xposition,yposition]);


		//update all the lists in the scene
		this.updatelists();

	}


	//return the list of meshs
	getvisiblemeshs(){
		var listofmeshs = [];

		//get a list of objects in the plane
		var listofobjs = this.objandpos.getlist();

		for (var curobject in listofobjs){
			//get the current object
			var curmesh = listofobjs[curobject].getobject();

			//update the position of the mesh
			curmesh.updatemeshpos(listofobjs[curobject].getpos()[0],listofobjs[curobject].getpos()[1]);

			//get the mesh of the object
			curmesh = curmesh.getmesh();

			//add it to the list of meshs
			listofmeshs.push(curmesh)
		}


		//add this plane's mesh to the listofmeshs
		listofmeshs.push(this.planemesh);

		return(listofmeshs);
	}


	updatelists(){
		//set all the lists empty

		//will be run into
		this.tangible = new ObjandPosList();

		//will take attacks
		this.attackable = new ObjandPosList();

		//the drops on this plane
		this.drops = new ObjandPosList();

		//all attack objects
		this.attackobjects = new ObjandPosList();

		//all mobile objects
		this.mobileobjects = new ObjandPosList();

		//update all of the object lists


		//get all the objects in the plane
		var allobjects = this.objandpos.getlist();


		//go through the keys of these list which are the objects
		for (var curobjitr in allobjects){

			var curobj = allobjects[curobjitr].getobject();

			if (curobj.getisethral() == false){
				this.attackable.passinobject(allobjects[curobjitr]);
			}

			if (curobj.getistangible() == true){

				this.tangible.passinobject(allobjects[curobjitr]);
			}

			if (curobj.getispickupable() == true){
				this.drops.passinobject(allobjects[curobjitr]);
			}

			if (curobj.getdoesdamage() == true){
				this.attackobjects.passinobject(allobjects[curobjitr]);
			}

			if (curobj.getismobile() == true){
				this.mobileobjects.passinobject(allobjects[curobjitr]);
			}
		}
	}






	update(){

		//update all the lists so that my lists are valid
		this.updatelists();

		//call update on all the objects
		var allobjects = this.objandpos.getlist();


		for (var curobjitr in allobjects){
			allobjects[curobjitr].getobject().update();
		}

		//remove all expired objects
		for (var curobjitr in allobjects){
			if (allobjects[curobjitr].getobject().isexpired == true){

				this.removeobject(allobjects[curobjitr].getobject());
			}
		}

		//update the list to remove expired objects from all lists
		this.updatelists();


		//gives the object and the position
		var allattackobjects = this.attackobjects.getlist();

		var allattackable = this.attackable.getlist();


		//check for intersections between attack objects and attackables
		for (var curattackitr in allattackobjects){

			var curattack = allattackobjects[curattackitr];

			//get what objects this attack intersects with
			for (var curattackableitr in allattackable){

				var curattackable = allattackable[curattackableitr];

				if (curattack.doesobjandposintersect(curattackable)){

					curattack.storedobject.landedattack(curattackable.storedobject);

				}
			}
		}
	}


	updaterender(){
		var allobjects = this.objandpos.getlist();

		//call update on all the charachter objects
		for (var curobjitr in allobjects){
			allobjects[curobjitr].getobject().updaterender();
		}
	}


}




























//a object that holds a group of objects and positions for that object
class ObjandPosList{

	constructor(){
		//the dictionary of the objects
		//mapping the object to its corresponding objandpos object
		this.objsandpos = [];

		//array of [object, objectpositionobject]

	}

	hasobject(object){

		//see if the object is in the plane

		for (var curobjiter in this.objsandpos){

			if (object === this.objsandpos[curobjiter]){
				return(true);
			}
		}

		return(false);

	}

	passinobject(objandposobject){

		this.objsandpos.push(objandposobject);
	}

	addobject(object, xposandypos){
		var newelement = new ObjandPos(object, xposandypos[0],xposandypos[1]);

		this.objsandpos.push(newelement);
	}

	getpos(object){

		//get the pos object from this list
		for (var eachpair in this.objsandpos){

			if (this.objsandpos[eachpair].getobject() === object){

				return(this.objsandpos[eachpair].getpos());

			}
		}

		//if the object isnt found
		throw("object not found in list");

	}

	getlist(){

		//return the array of objects and their values
		return(this.objsandpos);
	}

	setpos(object, xposandypos){

		//find the object than give it a new pos
		for (var curobjiter in this.objsandpos){
			if (object === this.objsandpos[curobjiter].getobject()){
				this.objsandpos[curobjiter].setpos(xposandypos[0],xposandypos[1]);
			}
		}

	}

	removeobject(object){

		//find the object

		for (var curobjiter in this.objsandpos){

			if (object === this.objsandpos[curobjiter].getobject()){

				this.objsandpos.splice(curobjiter,1);

				//return to end loop
				return(true);
			}
		}
	}

	//does this object at this pos intersect with anything in the list
	doesintersect(object, topleft){


		//create a temporary objandpos object for object detection
		var checkingobject = new ObjandPos(object, topleft[0], topleft[1]);


		for (var curobjiter in this.objsandpos){

			//if they're the same object, skip it
			if (this.objsandpos[curobjiter].getobject() === object){

				//skip
			}
			else{

				if (this.objsandpos[curobjiter].doesobjandposintersect(checkingobject))
				{
					return(true);
				}
			}

		}

		//if no colissions are found at the end
		return(false);
	}
}








class ObjandPos{

	constructor(object, xpos,ypos){

		this.storedobject = object;

		this.xpos = xpos;

		this.ypos = ypos;

	}


	getobject(){

		return(this.storedobject);
	}


	//given another objandpos object, see if it intersects with this one
	doesobjandposintersect(objandpos){


		//get the pos of the objects passed in
		var object1topx = this.xpos;

		var object1topy = this.ypos;

		var object1botx = this.xpos+this.storedobject.xsize;

		var object1boty = this.ypos+this.storedobject.ysize;



		//the object being checked against in the list
		var object2topx = objandpos.xpos;

		var object2topy = objandpos.ypos;

		var object2botx = objandpos.xpos + objandpos.storedobject.xsize;

		var object2boty = objandpos.ypos + objandpos.storedobject.ysize;



		//if my object1 is to the right of object2
		if (object1topx > object2botx){
			//no colission detected
			return(false);
		}
		//if object2 is to the right of object1
		else if (object2topx > object1botx){
			//no colission detected
			return(false);
		}
		//if object1 is lower than object2
		else if (object1topy > object2boty){
			//no colission detected
			return(false);
		}
		//if object2 is lower than object1
		else if (object2topy > object1boty){
			//no colission detected
			return(false);
		}
		else
		{

			//if there are intersections
			return(true);
		}



	}


	setpos(xpos,ypos){
		this.xpos = xpos;
		this.ypos = ypos;
	}


	getpos(){
		return([this.xpos,this.ypos]);
	}



}
