// import {GLTFLoader} from "./GLTFLoader2";

//Para la creación del frontend del juego se propuso usar three.js, para poder generar un juego 3D.

//Cargado de textura
const texture = new THREE.TextureLoader().load( "../textures/table.png" );
//Creación de escena y declaración de fondo
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x2a4c3b );
//Creación de cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
//Configuración del renderizador, Definición de tamaño de la escena y declaración del renderer como dominante
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Creación del tablero de monopoly compuesto de una geometría y un material que es la textura previamente cargada
const geometry = new THREE.BoxGeometry(5, 5, 0.09);
const material = new THREE.MeshBasicMaterial({
	map:texture
});
const board = new THREE.Mesh(geometry, material)

//Ajustes de posición del tablero y agregado del tablero a la escena
board.rotation.x = 5.3;
scene.add(board);

//Intento de cargado de un modelo 3D
// const loader = new GLTFLoader();
//
// loader.load( '/Users/gustavocamargo/WebstormProjects/MonopolyUSB/3dModels', function ( gltf ) {
//
// 	scene.add( gltf.scene );
//
// }, undefined, function ( error ) {
//
// 	console.error( error );
//
// } );

//Ajustes de posición de la cámara
camera.position.z = 6;

//Renderización de las componentes previamente creadas
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();

