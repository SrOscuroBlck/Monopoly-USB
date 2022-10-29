//Renderización de las componentes previamente creadas
let i = 0;

var camera = null,
	scene = null,
	board = null,
	renderer = null,
	controls = null;

function initScene() {
	window.onresize = onWindowResize;
	createBasicElements();
	loadModelObjMtl("../src/3dModels/dado/", "dice.obj", "dice.mtl");
	loadModelGltf("../src/3dModels/pato/","../src/3dModels/pato/Duck.gltf");
	animate();
}

function createBasicElements() {
	//Cargado de textura
	const texture = new THREE.TextureLoader().load("../src/textures/table.png");
	//Creación de escena y declaración de fondo
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x2a4c3b);
	//Creación de cámara
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
	//Configuración del renderizador, Definición de tamaño de la escena y declaración del renderer como dominante
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.set(6.3, 3.7, 6.0);

	controls.update();

	//Creación del tablero de monopoly compuesto de una geometría y un material que es la textura previamente cargada
	const geometry = new THREE.BoxGeometry(10, 10, 0.09);
	const material = new THREE.MeshBasicMaterial({
		map: texture
	});
	board = new THREE.Mesh(geometry, material)

	//Ajustes de posición del tablero y agregado del tablero a la escena
	board.rotation.x = 33;
	//board.position.y = -3;

	const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
	scene.add(light);

	const gridHelper = new THREE.GridHelper(100, 100);
	scene.add(gridHelper);
	scene.add(board);
}

function animate() {
	controls.update();
	requestAnimationFrame(animate);
	//camera.lookAt(board.position);
	//camera.position.x = Math.cos(i) * 5;
	//camera.position.z = Math.sin(i) * 5;
	i += 0.01;
	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}


function loadModelObjMtl(generalPath, pathObj, pathMtl) {
	console.log("load model obj y mtl");
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setTexturePath(generalPath);
	mtlLoader.setPath(generalPath);
	mtlLoader.load(pathMtl, function (materials) {

		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath(generalPath);
		objLoader.load(pathObj, function (object) {

			object.scale.set(1, 1, 1);
			object.position.y = 1;
			scene.add(object);
		});

	});
}

function loadModelGltf(generalPath,filePath) {
	// Instantiate a loader
	const loader = new THREE.GLTFLoader();

	// Optional: Provide a DRACOLoader instance to decode compressed mesh data
	const dracoLoader = new THREE.DRACOLoader();
	dracoLoader.setDecoderPath(generalPath);//'/examples/js/libs/draco/');
	loader.setDRACOLoader(dracoLoader);

	// Load a glTF resource
	loader.load(
		// resource URL
		filePath,//'models/gltf/duck/duck.gltf',
		// called when the resource is loaded
		function (gltf) {

			scene.add(gltf.scene);

			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object

		},
		// called while loading is progressing
		function (xhr) {

			console.log((xhr.loaded / xhr.total * 100) + '% loaded');

		},
		// called when loading has errors
		function (error) {

			console.log('An error happened');

		}
	);

}