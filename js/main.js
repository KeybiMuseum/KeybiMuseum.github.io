// ----------------------------
// Inicialización de Variables:
// ----------------------------
var scene    = null,
    camera   = null,
    renderer = null,
    controls = null,
    clock = null;

var sound1      = null,
    countPoints = null,
    modelLoad   = null,
    light       = null,
    figuresGeo  = [];

var MovingCube         = null,
    collidableMeshList = [],
    lives              = 3,
    numberToCreate     = 5;

var color = new THREE.Color();

var scale  = 1;
var rotSpd = 0.05;
var spd    = 0.05;
var input  = {left:0,right:0, up: 0, down: 0};

var posX = 0;
var posY = 0.5;
var posZ = 0;
// ----------------------------
// Funciones de creación init:
// ----------------------------
function start() {
    window.onresize = onWindowResize;
    initScene();
    animate();
    
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScene(){
    initBasicElements(); // Scene, Camera and Render
    initSound();         // To generate 3D Audio
    createLight();       // Create light
    initWorld();
    //createFrontera();
    createEs();
    createDashboard();
    createPenguin(); 
    //pictures();
    
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    sound1.update(camera);
    movePlayer();
    //collisionAnimate(); 

}

function initBasicElements() {
    scene    = new THREE.Scene();
    camera   = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#app") });
    clock    = new THREE.Clock();

    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.update();

    scene.background = new THREE.Color( 0x000000 );
    scene.fog = new THREE.Fog( 0x000000, 0, 750 );

    var light = new THREE.HemisphereLight( 0x000000, 0x000000, 0.10 );
    light.position.set( 0.5, 1, 0.75 );
    scene.add( light );
           
    renderer.setSize(window.innerWidth, window.innerHeight - 4);
    document.body.appendChild( renderer.domElement );

    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 0;
}


function initSound() {
    sound1 = new Sound(["../songs/tomp3.cc - Arrival of the Birds.mp3"],500,scene,{   // radio(10)
        debug:true,
        position: {x:camera.position.x,y:camera.position.y+10,z:camera.position.z}
    });
}




function createLight() {
    var light2 = new THREE.AmbientLight(0xffffff);
    light2.position.set(1, 1, 1);
    scene.add(light2);
    light = new THREE.DirectionalLight(0xffffff, 0, 100);
    scene.add(light);
}

////////////////////////////////////////////////////////////// MUSEO//////////////////////////////////////////////////////////////////
function initWorld() {
    // Create Island
    const loader = new THREE.OBJLoader();
    const mtlLoader = new THREE.MTLLoader();

    mtlLoader.setTexturePath('../modelos/museum/');
    mtlLoader.setPath('../modelos/museum/');
    mtlLoader.load('Museum.mtl', function (materials) {

        materials.preload();

        loader.setMaterials(materials);
        loader.setPath('../modelos/museum/');
        loader.load('Museum.obj', function (object) {
              scene.add(object);
              object.scale.set(0.3,0.3,0.3);

              object.position.set = (0,0,0);
             
             
        });
    }); 
    
}
/////////////////////////////////////////////////TEXTURA Y PINTURAS////////////////////////////////////////////////////////////////////////////////

function createDashboard(){

    ///////////////////////////////////////PISO//////////////////////////////////////////////

  const TextureLoader= new THREE.TextureLoader();
  const base=TextureLoader.load("../modelos/texturas/laminate_floor_02_diff_4k.jpg");
  const normal=TextureLoader.load("../modelos/texturas/laminate_floor_02_nor_gl_4k.jpg");
  const ao= TextureLoader.load("../modelos/texturas/laminate_floor_02_ao_4k.jpg");
  const rough= TextureLoader.load("../modelos/texturas/laminate_floor_02_rough_4k.jpg");
   
  const geometry = new THREE.PlaneGeometry( 4.5, 8 ); 
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff,side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotation.x= Math.PI/2;
    plane.position.x=0;
    plane.position.y=0.036;
    plane.position.z=0;

    material.map=base;
    material.normalMap=normal;
    material.aoMap= ao;
    material.roughnessMap=rough;
    scene.add( plane );

    //////////////////////////////////////// PINTURAS/////////////////////////////////////////////////////

    const geometryBalsa = new THREE.PlaneGeometry( 0.92, 0.65 );
    const loader = new THREE.TextureLoader();
    const materialBalsa = new THREE.MeshBasicMaterial( {color: 0xffffff,
       map: loader.load('../src/img/Obras/La balsa de Medusa.jpg'),
       side: THREE.DoubleSide} );
    const balsa = new THREE.Mesh( geometryBalsa, materialBalsa );
    balsa.rotation.y= -Math.PI/2;
    balsa.position.x=2.099;
    balsa.position.y=1.73;
    balsa.position.z=-0.93;
    scene.add( balsa );

    const geometryPersist = new THREE.PlaneGeometry( 0.95, 0.65 );
    const loaderPersist = new THREE.TextureLoader();
    const materialPersist = new THREE.MeshBasicMaterial( {color: 0xffffff,
       map: loaderPersist.load('../src/img/Obras/La persistencia de la memoria.jpg'),
       side: THREE.DoubleSide} );
    const persist = new THREE.Mesh( geometryPersist, materialPersist );
    persist.rotation.y= -Math.PI/2;
    persist.position.x=2.099;
    persist.position.y=0.72;
    persist.position.z=-0.90;
    scene.add( persist );

    const geometryRetrato = new THREE.PlaneGeometry( 1, 1.4 );
    const loaderRetrato = new THREE.TextureLoader();
    const materialRetrato = new THREE.MeshBasicMaterial( {color: 0xffffff,
       map: loaderRetrato.load('../src/img/Obras/Retrato de una negra.jpg'),
       side: THREE.DoubleSide} );
    const retrato = new THREE.Mesh( geometryRetrato, materialRetrato );
    retrato.rotation.y= -Math.PI/2;
    retrato.position.x=2.099;
    retrato.position.y=1.27;
    retrato.position.z=-2.6;
    scene.add( retrato );


    const geometryNoche = new THREE.PlaneGeometry( 2, 1 );
    const loaderNoche = new THREE.TextureLoader();
    const materialNoche = new THREE.MeshBasicMaterial( {color: 0xffffff,
       map: loaderNoche.load('../src/img/Obras/noche estrellada1.jpg'),
       side: THREE.DoubleSide} );
    const noche = new THREE.Mesh( geometryNoche, materialNoche );
    noche.rotation.y= -Math.PI/2;
    noche.position.x=2.099;
    noche.position.y=1.225;
    noche.position.z=1.1;
    scene.add( noche );

    
    const geometryMenina = new THREE.PlaneGeometry( 0.75, 1.5 );
    const loaderMenina = new THREE.TextureLoader();
    const materialMenina = new THREE.MeshBasicMaterial( {color: 0xffffff,
       map: loaderMenina.load('../src/img/Obras/Las Meninas.jpg'),
       side: THREE.DoubleSide} );
    const menina = new THREE.Mesh( geometryMenina, materialMenina );
    menina.rotation.y= -Math.PI/2;
    menina.position.x=2.099;
    menina.position.y=1.25;
    menina.position.z=3.045;
    scene.add( menina );

    const geometryMonalisa = new THREE.PlaneGeometry( 0.90, 1.45 );
    const loaderMonalisa = new THREE.TextureLoader();
    const materialMonalisa = new THREE.MeshBasicMaterial( {color: 0xffffff,
       map: loaderMonalisa.load('../src/img/Obras/La gioconda.jpg'),
       side: THREE.DoubleSide} );
    const monalisa = new THREE.Mesh( geometryMonalisa, materialMonalisa );
    monalisa.rotation.y= Math.PI/2;
    monalisa.position.x=-2.099;
    monalisa.position.y=1.225;
    monalisa.position.z=-2.85;
    scene.add( monalisa );

    const geometryCreacion = new THREE.PlaneGeometry( 1.9, 0.5 );
    const loaderCreacion = new THREE.TextureLoader();
    const materialCreacion = new THREE.MeshBasicMaterial( {color: 0xffffff,
       map: loaderCreacion.load('../src/img/Obras/La creacion de adam.png'),
       side: THREE.DoubleSide} );
    const creacion = new THREE.Mesh( geometryCreacion, materialCreacion );
    creacion.rotation.y= Math.PI/2;
    creacion.position.x=-2.099;
    creacion.position.y=1.685;
    creacion.position.z=-0.805;
    scene.add( creacion );

    const geometryCena = new THREE.PlaneGeometry( 1.9, 0.5 );
    const loaderCena = new THREE.TextureLoader();
    const materialCena = new THREE.MeshBasicMaterial( {color: 0xffffff,
       map: loaderCena.load('../src/img/Obras/La ultima cena .jpg'),
       side: THREE.DoubleSide} );
    const cena = new THREE.Mesh( geometryCena, materialCena );
    cena.rotation.y= Math.PI/2;
    cena.position.x=-2.099;
    cena.position.y=0.75;
    cena.position.z=-0.82;
    scene.add( cena );

    
    const geometryjoven = new THREE.PlaneGeometry( 0.95, 1.40 );
    const loaderjoven = new THREE.TextureLoader();
    const materialjoven = new THREE.MeshBasicMaterial( {color: 0xffffff,
       map: loaderjoven.load('../src/img/Obras/La joven de la perla.jpg'),
       side: THREE.DoubleSide} );
    const joven = new THREE.Mesh( geometryjoven, materialjoven );
    joven.rotation.y= Math.PI/2;
    joven.position.x=-2.099;
    joven.position.y=1.225;
    joven.position.z=1.187;
    scene.add( joven );

    const geometrypaseante = new THREE.PlaneGeometry( 0.95, 1.40 );
    const loaderpaseante = new THREE.TextureLoader();
    const materialpaseante = new THREE.MeshBasicMaterial( {color: 0xffffff,
       map: loaderpaseante.load('../src/img/Obras/La paseante con sombrilla.jpg'),
       side: THREE.DoubleSide} );
    const paseante = new THREE.Mesh( geometrypaseante, materialpaseante );
    paseante.rotation.y= Math.PI/2;
    paseante.position.x=-2.099;
    paseante.position.y=1.225;
    paseante.position.z=2.74;
    scene.add( paseante );

    const geometrylogo = new THREE.PlaneGeometry( 1.5, 0.90 );
    const loaderlogo = new THREE.TextureLoader();
    const materiallogo = new THREE.MeshBasicMaterial( {
       map: loaderlogo.load('../src/img/kyg.jpg'),
       side: THREE.DoubleSide} );
    const logo = new THREE.Mesh( geometrylogo, materiallogo );
    logo.rotation.y= -Math.PI;
    logo.position.x=0;
    logo.position.y=1.225;
    logo.position.z=3.77;
    scene.add( logo );





   }

    





  


function createEs(){

  const loader = new THREE.OBJLoader();
 const mtlLoader = new THREE.MTLLoader();



    mtlLoader.setTexturePath('../modelos/estatuta/');
    mtlLoader.setPath('../modelos/estatuta/');
    mtlLoader.load('untitled.mtl', function (materials) {

        materials.preload();

        loader.setMaterials(materials);
        loader.setPath('../modelos/estatuta/');
        loader.load('untitled.obj', function (object) {
              scene.add(object);
              object.scale.set(0.1,0.1,0.1);
              object.position.y = 0;
              object.position.x = 0;
              object.position.z = 0.5;
              
              
        });
    }); 
}

    function createPenguin(){

        const loader = new THREE.OBJLoader();
       const mtlLoader = new THREE.MTLLoader();
      
      
      
          mtlLoader.setTexturePath('../modelos/penguin/');
          mtlLoader.setPath('../modelos/penguin/');
          mtlLoader.load('Penguin.mtl', function (materials) {
      
              materials.preload();
      
              loader.setMaterials(materials);
              loader.setPath('../modelos/penguin/');
              loader.load('Penguin.obj', function (object) {
                    scene.add(object);
                    object.scale.set(0.1,0.1,0.1);
                    object.position.y = 0.8;
                    object.position.x = 0;
                    object.position.z = 0.5;
                    
                    
              });
          }); 
        }
      

    

    //object.name = "duck";







// ----------------------------------
// Función Para mover al jugador:
// ----------------------------------
function movePlayer(){
    if(input.right == 1){
      camera.rotation.y -= rotSpd;
      MovingCube.rotation.y -= rotSpd;
    }
    if(input.left == 1){
      camera.rotation.y += rotSpd; 
      MovingCube.rotation.y += rotSpd;
    }
    
     if(input.up == 1){
      camera.position.z -= Math.cos(camera.rotation.y) * spd;
      camera.position.x -= Math.sin(camera.rotation.y) * spd;

      MovingCube.position.z -= Math.cos(camera.rotation.y) * spd;
      MovingCube.position.x -= Math.sin(camera.rotation.y) * spd;
    }
    if(input.down == 1){
      camera.position.z += Math.cos(camera.rotation.y) * spd;
      camera.position.x += Math.sin(camera.rotation.y) * spd;
      
      MovingCube.position.z += Math.cos(camera.rotation.y) * spd;
      MovingCube.position.x += Math.sin(camera.rotation.y) * spd;
    }
  }
  
   window.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
      case 68:
        input.right = 1;
        break;
      case 65:
        input.left = 1; 
        break;
      case 87:
        input.up = 1;
        break;
      case 83:
        input.down = 1;
        break;
      case 27:
        document.getElementById("blocker").style.display = 'block';
        break;
    }
  });


  window.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
      case 68:
        input.right = 0;
        break;
      case 65:
        input.left = 0;
        break;
      case 87:
        input.up = 0;
        break;
      case 83:
        input.down = 0;
        break;
    }
  });
// ----------------------------------
// Funciones llamadas desde el index:
// ----------------------------------
function go2Play() {
    document.getElementById('blocker').style.display = 'none';
    document.getElementById('cointainerOthers').style.display = 'block';
    playAudio(x);
    initialiseTimer();
}



function showInfoCreator() {
    if( document.getElementById("myNameInfo").style.display == "none")
        document.getElementById("myNameInfo").style.display = "block";
    else
        document.getElementById("myNameInfo").style.display = "none";

}

function regresar(){
  document.getElementById("myNameInfo").style.display == "none"

}
// ----------------------------------
// Funciones llamadas desde el index:
// ----------------------------------
/*function createPlayerMove() {
    var cubeGeometry = new THREE.CubeGeometry(2,2,2,2,2,2);
	var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true, transparent: true, opacity: 0.0 } );
	MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
	MovingCube.position.set(camera.position.x,camera.position.y,camera.position.z);
	scene.add( MovingCube );
}*/

function createFrontera() {
    var cubeGeometry = new THREE.CubeGeometry(3,1.5,3,0,0,0);
	var wireMaterial = new THREE.MeshBasicMaterial( { wireframe:true, transparent: true, opacity: 0.0 } );
	worldWalls = new THREE.Mesh( cubeGeometry, wireMaterial );
	worldWalls.position.set(0,0.7,0);
	scene.add( worldWalls );
    collidableMeshList.push(worldWalls);
}

function collisionAnimate() {
    
    var originPoint = MovingCube.position.clone();

    for (var vertexIndex = 0; vertexIndex < MovingCube.geometry.vertices.length; vertexIndex++)
	{		
		var localVertex = MovingCube.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4( MovingCube.matrix );
		var directionVector = globalVertex.sub( MovingCube.position );
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( collidableMeshList );
		if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()){ 
            document.getElementById("lives").innerHTML = lives;//'toco, '+ JSON.stringify(collisionResults[0].object.name);//points;
            camera.position.set(posX,posY,posZ);
            MovingCube.position.set(posX,posY,posZ);
            lives = lives - 1;
            if(lives==0){
                document.getElementById("lost").style.display = "block";
                document.getElementById("cointainerOthers").style.display = "none";
                pauseAudio(x);
                playAudio(y);
            }
        }else{
            document.getElementById("lives").innerHTML = lives; // 'no toco';  
        }
	}
}


 

