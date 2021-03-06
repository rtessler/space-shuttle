var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 2000 );
camera.position.z = -1000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
//const assestPath = '/examples/3d-obj-loader/assets/'
//const materialFile = 'r2-d2.mtl'
//const objFile = 'r2-d2.obj'
const assestPath = '/3d-obj-loader/assets/space-shuttle-orbiter-obj/'
const materialFile = 'space-shuttle-orbiter.mtl'
const objFile = 'space-shuttle-orbiter.obj'

mtlLoader.setTexturePath(assestPath);
mtlLoader.setPath(assestPath);
mtlLoader.load(materialFile, function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(assestPath);
    objLoader.load(objFile, function (object) {

        scene.add(object);
        object.position.y -= 60;

    });

});

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();