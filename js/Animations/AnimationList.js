class AnimationList{

  constructor() {

    //how are the animation frames stored
    // Create a texture loader so we can load all our image file
    this.loader = new THREE.TextureLoader();

  }

  numberofframes(objecttype, animationtype) {

    //given an object type and animation type
    //return the number of frames for that animation

    return (1);
  }

  getframe(objecttype, animationtype, frame) {

    //given an object type, and animationtype, and the frame
    //return the right group of meshs for that animation frame



    // Load an image file into a custom material
    var material = new THREE.MeshLambertMaterial({
      map: this.loader.load('http://138.197.170.252/frame0.png'),
    });


    // create a plane geometry for the image with a width and height of 1
    var geometry = new THREE.PlaneGeometry(1, 1);

    // combine our image geometry and material into a mesh
    var mesh = new THREE.Mesh(geometry, material);

    // set the position of the image mesh in the x,y,z dimensions
    mesh.position.set(0, 0, 0);

    var group = new THREE.Group();

    group.add(mesh);

    return (group);

  }

}
