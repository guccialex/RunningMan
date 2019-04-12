
//the class for an object that is on a plane
//this is just a abstract class anyways, so the values of the variables dont matter
class ObjectOnPlane{

	constructor(){

		//supposed to be a string of what object type it is
		//but this is covered by the "isethral" things until
		//i choose to use this
		this.objecttype = null;


		//doesnt have an AI by default
		this.isAI = false;



		this.isethral = null;

		this.istangible = null;

		this.ispickupable = null;

		this.doesdamage = null;

		this.ismobile = null;


		//the size of the object
		this.xsize = 1;

		this.ysize = 1;



		//if true, delete and remove this object
		this.isexpired = false;

		//the side this object is on
		this.side = "neither";

		//how much that this resource effects the player/kingdom
		//at the end of the turn
		this.resourceeffect = 0;


		this.plane = null;

		this.setting = null;


		//the age of this object in months
		this.age = 0;



		//each character has a set of animations for each of their Actions
		//each action has

		this.animations = new animations(typeofobject);

		this.currentanimation = this.animations.animationfor("running");

	 	ever loop:
		this.currentanimation.tick();

		this.animationframe = currentanimation.getframe();
		this.mesh = this.animationframe().setforanimation(thismesh);


		animationframe.tick()

		animationframe.


		//the geometry and mesh of the object
		this.geometry = new THREE.BoxGeometry( 1,1,1 );
		this.material = new THREE.MeshNormalMaterial();
		this.mesh  = new THREE.Mesh( this.geometry, this.material );

	}


	//this obviously differs for each object, but this is what is common between them
	twomonthspass(){

		this.age += 2;

	}


	setisethral(isethral){
		this.isethral = isethral;
	}
	setistangible(istangible){
		this.istangible = istangible;
	}
	setispickupable(ispickupable){
		this.ispickupable = ispickupable;
	}
	setdoesdamage(doesdamage){
		this.doesdamage = doesdamage;
	}
	setismobile(ismobile){
		this.ismobile = ismobile;
	}


	setside(newside){

		this.side = newside;
	}


	setresourceeffect(effectonresources){
		this.resourceeffect = effectonresources;
	}



	setplane(plane){
		this.plane = plane;
	}
	setsetting(setting){
		this.setting = setting;
	}










	getisethral(){
		return(this.isethral);
	}

	getistangible(){
		return(this.istangible);
	}

	getispickupable(){
		return(this.ispickupable);
	}

	getdoesdamage(){
		return(this.doesdamage);
	}

	getismobile(){
		return(this.ismobile);
	}

	getisexpired(){
		return(this.isexpired);
	}





	//update the mesh size to fit on the actual size of the object
	updatemeshsize(){
		this.geometry = new THREE.BoxGeometry( this.xsize,this.ysize,1 );
		this.material = new THREE.MeshNormalMaterial();
		this.mesh  = new THREE.Mesh( this.geometry, this.material );
	}



	setxsize(xsize){
		this.xsize = xsize;
		//update the mesh size i think i should do
		this.updatemeshsize();
	}
	setysize(ysize){
		this.ysize = ysize;
		//update the mesh size i think i should do
		this.updatemeshsize();
	}



	updatemeshpos(xpos, ypos){
		this.mesh.position.set(xpos+this.getmeshoffset()[0], ypos+ this.getmeshoffset()[1], 1);
	}



	getxsize(){
		return(this.xsize);
	}
	getysize(){
		return(this.ysize);
	}


	getplane(){
		return(this.plane);
	}

	getsetting(){
		return(this.setting);
	}


	//get the offset of how far to render it from where it is to accurately reflect it
	getmeshoffset(){
		return([this.xsize/2, this.ysize/2]);
	}

	//get the position of this object on the plane
	getposonplane(){
		return(this.plane.getposition(this));
	}





	getmesh(){
		return(this.mesh);
	}



	update(){

	}
}
