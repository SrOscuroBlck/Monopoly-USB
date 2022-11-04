//Renderización de las componentes previamente creadas
let i = 0;
let objObjects = [];
let gltfObjects = [];

objectLoader = new THREE.OBJLoader();



var camera = null,
	scene = null,
	board = null,
	renderer = null,
	controls = null,
	modPlayer = null;




// Inicialización de la escena
function initScene() {
	window.onresize = onWindowResize;
	createBasicElements();
	loadModelObjMtl("../src/3dModels/dado/", "dice.obj", "dice.mtl");
	generateUI();
	loadModelGltf("../src/3dModels/pato/","../src/3dModels/pato/Duck.gltf");

	objectLoader.load("dice.obj", function (object) {
		object.position.x = 6;
	});


	animate();
}
// Creación de estructura básica para three.js
function createBasicElements() {
	//Cargado de textura
	const texture = new THREE.TextureLoader().load("../src/textures/table.png");
	//Creación de escena y declaración de fondo
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x2a4c3b);
	//Creación de cámara
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
	//Configuración del renderizador, definición de tamaño de la escena y declaración del renderer como dominante
	const canvas = document.querySelector('.webgl');
	renderer = new THREE.WebGLRenderer({
		canvas: canvas,
        antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.set(6.882041748355365, 4.45235845033474, 7.030995870152893);

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

//Renderización de la escena
function animate() {
	controls.update();
	requestAnimationFrame(animate);
	i += 0.01;
	renderer.render(scene, camera);
}

//Ajuste de tamaño de la escena
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

//Cargado de modelos 3d de formato .obj
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
			modPlayer = object;
			modPlayer.position.y = 0.3;
			// modPlayer.scale.set(modelScale, modelScale, modelScale);
			scene.add(object);
		});

	});
}



function generateUI() {
	var gui = new dat.GUI({width:180});
	var param = {
		rotX: 0,
		rotY: 0,
		rotZ: 0,
		movX: 0,
		movY: 0,
		movZ: 0,
		scale: 1,
		ColorLight: "#ffffff",
		Intensity: 0.5
	};

	var m = gui.addFolder("Mover");
	var e = gui.addFolder("Escalar");
	var r = gui.addFolder("Rotar");
	var l = gui.addFolder("Lights");

	var movementX = m.add(param,'movX').min(-10).max(10).step(1).name("X");
	var movementY = m.add(param,'movY').min(-10).max(10).step(1).name("Y");
	var movementZ = m.add(param,'movZ').min(-10).max(10).step(1).name("Z");

	movementX.onChange(function (valueX) {
		modPlayer.position.x = valueX;
	});

	movementY.onChange(function (valueY) {
		modPlayer.position.y = valueY;
	});

	movementZ.onChange(function (valueZ) {
		modPlayer.position.z = valueZ;
	});

	var myScale = e.add(param,'scale').min(1).max(10).step(1).name("Scale");

	myScale.onChange(function (myScaleN) {
		modPlayer.scale.set(myScaleN,myScaleN,myScaleN);
	});

	var myRotationX = r.add(param,'rotX').min(-1).max(1).step(0.1).name("X");
	var myRotationY = r.add(param,'rotY').min(-1).max(1).step(0.1).name("Y");
	var myRotationZ = r.add(param,'rotZ').min(-1).max(1).step(0.1).name("Z");

	myRotationX.onChange(function (rotationX) {
		modPlayer.rotation.x = Math.PI*rotationX;
	});

	myRotationY.onChange(function (rotationY) {
		modPlayer.rotation.y = Math.PI*rotationY;
	});

	myRotationZ.onChange(function (rotationZ) {
		modPlayer.rotation.z = Math.PI*rotationZ;
	});

	var myColor = l.addColor(param, 'ColorLight');
	var myIntensity = l.add(param, 'Intensity').min(0).max(1).step(0.1);

	myColor.onChange(function (colorGet) {
		console.log("Chage Color " + colorGet);
		pointLight.color.setHex(Number(colorGet.toString().replace('#', '0x')));
	});

	myIntensity.onChange(function (intensity) {
		pointLight.intensity = intensity;
	});
}



//Cargado de modelos 3d de formato .gltf  (Los comentarios adentro de este, están predeterminados por la librería por eso estan en inglés)
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