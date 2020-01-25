/* globals THREE, divContents */
// jshint esversion: 6
// jshint loopfunc: true

let mesh, meshGroup;
let THR = {};

THR.center = new THREE.Vector3( 0, 0, 0 );
THR.radius = 50;

THR.group = undefined;

THR.cameraAngle = 0;
THR.cameraRadius = 141.4;
THR.cameraDelta = 0.005;

let mouse = new THREE.Vector2(), intersected;
let raycaster

THR.init = function () {

	const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 10, 25, 7);
	camera.up.set( 0, 0, 1 );

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcce0ff );
	scene.fog = new THREE.Fog( 0xcce0ff, 9999, 999999 );
	scene.add( camera );

	const distance = 25;
	scene.fog.near = distance * 1.8;
	scene.fog.far = distance * 2.5;

	raycaster = new THREE.Raycaster();

	const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	document.body.appendChild( renderer.domElement );

	const controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.maxDistance = 500;
	controls.rotateSpeed = 2;
	//controls.maxPolarAngle = Math.PI * 0.5;


	window.addEventListener( 'resize', THR.onWindowResize, false );
	window.addEventListener( 'orientationchange', THR.onWindowResize, false );

	window.addEventListener( 'keydown', THR.onStart );
	renderer.domElement.addEventListener( 'wheel', THR.onStart );
	renderer.domElement.addEventListener( 'mousedown', THR.onStart );
	renderer.domElement.addEventListener( 'touchstart', THR.onStart );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	THR.camera = camera; THR.scene = scene; THR.renderer = renderer; THR.controls = controls;

	let event = new Event( "onloadthree", { "bubbles": true, "cancelable": false, detail: true } );

	window.addEventListener( "onloadthree", THR.onLoad, false );

	window.dispatchEvent( event );

	THR.animate();

};



THR.onLoad = function ( event ) {

	console.log( 'event thr', event );

	THRA.onLoad();

	TSG.onLoad();

	//TSF.onLoad();

	//THRV.zoomToFitObject();

};


THR.onStart = function () {

	//THRVchkDelta.checked = false;

	THR.cameraDelta = 0;

	window.removeEventListener( 'keydown', THR.onStart );
	THR.renderer.domElement.removeEventListener( 'heel', THR.onStart );
	THR.renderer.domElement.removeEventListener( 'mousedown', THR.onStart );
	THR.renderer.domElement.removeEventListener( 'touchstart', THR.onStart );



};



THR.onWindowResize = function () {

	THR.camera.aspect = window.innerWidth / window.innerHeight;
	THR.camera.updateProjectionMatrix();

	THR.renderer.setSize( window.innerWidth, window.innerHeight );

	//THR.controls.handleResize();

	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

};


function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

THR.animate = function() {

	requestAnimationFrame( THR.animate );
	THR.renderer.render( THR.scene, THR.camera );
	THR.controls.update();


	raycaster.setFromCamera( mouse, THR.camera );

	var intersects = raycaster.intersectObjects( THR.group.children );

	if ( intersects.length > 0 ) {

		if ( intersected != intersects[ 0 ].object ) {

			if ( intersected ) intersected.material.emissive.setHex( intersected.currentHex );

			intersected = intersects[ 0 ].object;
			intersected.currentHex = intersected.material.emissive.getHex();
			intersected.material.emissive.setHex( 0xff0000 );

			divHeadsUp.innerHTML = `
			<div>
			${ intersected.uuid }<br>
			${ intersected.name}</br>
			</div>`

		}

	} else {

		if ( intersected ) {
			divHeadsUp.innerHTML = "";
			intersected.material.emissive.setHex( intersected.currentHex );
		}

		intersected = null;

	}
};


