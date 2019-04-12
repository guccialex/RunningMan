class WallObject extends CharacterObject{

	constructor(xsize, ysize){
		super();

		//cant be attacked
		this.isethral = true;

		//cannot be moved through
		this.istangible = true;

		//cant be picked up
		this.ispickupable = false;

		//this object doesnt deal damage on contact
		this.doesdamage = false;

		//this object does not move
		this.ismobile = false;



		//tell it there's no AI
		this.isAI = false;

		//remove the AI
		this.AIcontroller = null;


		//set xsize and ysize
		this.xsize = xsize;
		this.ysize = ysize;

		//set the geometry of the object
		this.geometry = new THREE.BoxGeometry( xsize, ysize, 1 );
		this.material = new THREE.MeshNormalMaterial();
		this.mesh  = new THREE.Mesh( this.geometry, this.material );

	}

	//override the update method that tries to update position
	update(){

		
	}

}