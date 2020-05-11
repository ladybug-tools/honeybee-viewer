


let mesh, group, axesHelper, ground, lightDirectional, cameraHelper;
let sceneRotation = 1;
let renderer, camera, controls, scene;

init();
animate();



function init () {

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( - 100, - 100, 100 );
	camera.up.set( 0, 0, 1 );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcce0ff );
	//scene.fog = new THREE.Fog( 0xcce0ff, 550, 800 );
	scene.add( camera );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	//controls.minDistance = 40;
	//controls.maxDistance = 500;
	//controls.autoRotate = true;
	controls.enableDamping = true;
	controls.dampingFactor = 0.09;
	//controls.enablePan = false;
	controls.autoRotateSpeed = 2;

	//controls.maxPolarAngle = Math.PI * 0.5;


	window.addEventListener( "resize", onWindowResize, false );
	window.addEventListener( "orientationchange", onWindowResize, false );
	window.parent.addEventListener( "keyup", () => controls.autoRotate = false, false );
	renderer.domElement.addEventListener( "click", () => controls.autoRotate = false, false );

	addLights();

	axesHelper = new THREE.AxesHelper( 100 );
	scene.add( axesHelper );

	addGround();


	const target = window.self === window.top ? window : window.parent;

	target.addEventListener( "hashchange", onHashChange );

	onHashChange();

}




function onHashChange () {

	const fileName = parent.location.hash.slice( 1 );

	if ( fileName ) {

		const path = "https://cdn.jsdelivr.net/gh/ladybug-tools/honeybee-schema@master/samples/";
		//const path = "https://cdn.jsdelivr.net/gh/ladybug-tools/dragonfly-schema@master/samples/";
		requestFile( fileName, onLoadJson );

	} else {

		getFile();

	}

}


function getFile ( index = 2 ) {

	const path = "https://cdn.jsdelivr.net/gh/ladybug-tools/honeybee-viewer@master/sample-files/2020-04-17/";

	const files = [
		"My_Mother_In_Laws_House.json",
		"Lab_Complex.json",
		"Urban_Model_Dragonfly.json",
		"Urban_Model_Honeybee.json"
	];

	const fileName = files[ index ];

	requestFile( path + fileName, onLoadJson );

}



function onLoadJson ( string ) {

	divInfo.innerHTML = "";

	const json = JSON.parse( string );
	console.log( "json", json );

	scene.remove( group, PBL.lines );

	if ( string.includes( "room_2ds" ) ) {

		response = string;

		PBL.processJson( json );

	} else {

		PHJ.processJson( json );

	}

}



function addLights () {

	//scene.add( new THREE.AmbientLight( 0x404040 ) );
	scene.add( new THREE.AmbientLight( 0x666666 ) );

	const pointLight = new THREE.PointLight( 0xffffff, 0.2 );
	pointLight.position.copy( camera.position );
	camera.add( pointLight );

	lightDirectional = new THREE.DirectionalLight( 0xdffffff, 0.9 );
	lightDirectional.position.set( 50, - 200, 20 );
	lightDirectional.castShadow = true;
	lightDirectional.shadow.mapSize.width = 1024;
	lightDirectional.shadow.mapSize.height = 1024;

	var d = 100;
	lightDirectional.shadow.camera.left = - d;
	lightDirectional.shadow.camera.right = d;
	lightDirectional.shadow.camera.top = d;
	lightDirectional.shadow.camera.bottom = - d;
	lightDirectional.shadow.camera.far = 500;
	scene.add( lightDirectional );

	//scene.add( new THREE.CameraHelper( lightDirectional.shadow.camera ) );

}



function addGround () {

	const geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
	const material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, depthWrite: false, side: 2 } );
	ground = new THREE.Mesh( geometry, material );
	ground.name = "ground";
	ground.receiveShadow = true;
	scene.add( ground );

}



function zoomObjectBoundingSphere ( obj = group ) {

	//console.log( "obj", obj );

	let center = new THREE.Vector3( 0, 0, 0 );
	let radius = 50;

	const bbox = new THREE.Box3().setFromObject( obj );
	//console.log( 'bbox', bbox );

	if ( bbox.max.x !== Infinity ) {

		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );

		center = sphere.center;
		radius = sphere.radius;
		//console.log( "sphere", sphere )

	}

	ground.position.z = bbox.min.z;

	controls.target.copy( center ); // needed because model may be far from origin
	controls.maxDistance = 50 * radius;

	delta = camera.position.clone().sub( controls.target ).normalize();
	//console.log( 'delta', delta );

	position = controls.target.clone().add( delta.multiplyScalar( 2 * radius ) );
	//console.log( 'position', position );

	distance = controls.target.distanceTo( camera.position );

	//camera.zoom = distance / (  * radius ) ;

	camera.position.copy( center.clone().add( new THREE.Vector3( - 1.5 * radius, 1.5 * radius, 0.5 * radius ) ) );
	camera.near = 0.001 * radius; //2 * camera.position.length();
	camera.far = 50 * radius; //2 * camera.position.length();
	camera.updateProjectionMatrix();

	axesHelper.position.copy( center );

	if ( lightDirectional ) {

		lightDirectional.position.copy( center.clone().add( new THREE.Vector3( - 1.5 * radius, 1.5 * radius, 0.25 * radius ) ) );
		lightDirectional.shadow.camera.scale.set( 0.02 * radius, 0.02 * radius, 0.2 * radius );

		var d = 50;
		lightDirectional.shadow.camera.left = - d;
		lightDirectional.shadow.camera.right = d;
		lightDirectional.shadow.camera.top = d;
		lightDirectional.shadow.camera.bottom = - d;
		lightDirectional.shadow.camera.far = 500;
		//targetObject.position.copy( center );

		scene.remove( cameraHelper );
		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
		scene.add( cameraHelper );

	}

	let event = new Event( "onresetthree", { "bubbles": true, "cancelable": false, detail: true } );

	//window.addEventListener( "onrresetthree", doThings, false );

	// listening: or-object-rotation-xx.js
	// listening: dss-display-scene-settings-xx.js

	window.dispatchEvent( event );

}


//////////


function requestFile ( url, callback ) {

	const xhr = new XMLHttpRequest();
	xhr.open( "GET", url, true );
	xhr.onerror = ( xhr ) => console.log( "error:", xhr );
	//xhr.onprogress = ( xhr ) => console.log( 'bytes loaded:', xhr.loaded );
	xhr.onload = ( xhr ) => callback( xhr.target.response );
	xhr.send( null );

}



function setStats () {

	const script = document.head.appendChild( document.createElement( "script" ) );
	script.onload = () => {

		const stats = new Stats();
		const sts = document.body.appendChild( stats.dom );
		sts.style.left = "";
		sts.style.right = "0px";
		requestAnimationFrame( function loop () {

			stats.update(); requestAnimationFrame( loop );

		} );

	};

	script.src = "https://raw.githack.com/mrdoob/stats.js/master/build/stats.min.js";


	const render = renderer.info.render;

	//divInfo.classList.add( "navText" );
	divInfo.innerHTML = `
	Renderer<br>
	Calls: ${render.calls }<br>
	Triangles: ${render.triangles.toLocaleString() }<br>
	`;

}


function onWindowResize () {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	//controls.handleResize();

	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

}



function animate () {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update();

}



///////////



var PHJ = {};

PHJ.processJson = function ( json ) {

	const colors = {

		Wall: "beige",
		Floor: "brown",
		RoofCeiling: "red",
		AirBoundary: "blue"

	};

	scene.remove( group );

	group = new THREE.Group();

	const rooms = json.rooms || [];

	let id = 0;

	for ( let room of rooms ) {

		const faces = room.faces;

		for ( let face of faces ) {

			//console.log( '', face.face_type );

			const boundary = face.geometry.boundary;

			const vertices = boundary.map( point => new THREE.Vector3().fromArray( point ) );

			const openings = [];

			openings.push( ... face.apertures || [] );

			openings.push( ... face.doors || [] );

			const holes = PHJ.parseApertures( openings, vertices );

			const color = colors[ face.face_type ];

			const shape = PHJ.addShape3d( vertices, holes, color );
			shape.name = face.display_name;
			shape.userData.id = id ++;

			group.add( shape );

			PHJ.parseShades( face.indoor_shades || [] );

			PHJ.parseShades( face.outdoor_shades || [] );

		}

	}

	PHJ.parseShades( json.orphaned_shades || [] );

	scene.add( group );

	zoomObjectBoundingSphere( group );

};




PHJ.parseApertures = function ( apertures, verticesFace ) {

	const holes = [];

	for ( let aperture of apertures ) {

		const boundary = aperture.geometry.boundary;

		const vertices = boundary.map( point => new THREE.Vector3().fromArray( point ) );

		//console.log( "cw v", THREE.ShapeUtils.isClockWise( verticesFace ) );

		if ( THREE.ShapeUtils.isClockWise( vertices ) === true ) { vertices.reverse(); }

		const tempVerticesHoles = PHJ.getTempVertices( vertices );
		//console.log( 'tempVerticesHoles', tempVerticesHoles );

		const path = new THREE.Path( tempVerticesHoles );
		//path.setFromPoints( vertices2d );

		//console.log( 'path', path, vertices );
		holes.push( { path, vertices } );

	}

	return holes;

};



PHJ.parseShades = function ( shades ) {

	//console.log( "shades", shades );

	for ( let shade of shades ) {

		const boundary = shade.geometry.boundary;

		const vertices = boundary.map( point => new THREE.Vector3().fromArray( point ) );

		const shape = PHJ.addShape3d( vertices, [], "darkgray" );

		shape.name = shade.type;

		group.add( shape );

	}

};



PHJ.addShape3d = function ( vertices, holes, color ) {

	const tempVertices = PHJ.getTempVertices( vertices );
	const shape = new THREE.Shape( tempVertices );

	if ( holes.length ) {

		holes.forEach( hole => {

			shape.holes.push( hole.path );
			vertices = vertices.concat( hole.vertices.reverse() );
			//console.log( 'vertices', vertices );

		} );

	}

	const shapeGeometry = new THREE.ShapeGeometry( shape );

	//console.log( 'shapeGeometry', shapeGeometry );

	//const material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true, wireframe: false } );
	const material = new THREE.MeshPhongMaterial( { color: color, opacity: 0.9, side: THREE.DoubleSide, transparent: true, wireframe: false } );

	const mesh = new THREE.Mesh( shapeGeometry, material );

	// needed when you want textures to fit the mesh nicely
	const box = new THREE.Box3().setFromObject( mesh );
	const size = new THREE.Vector3();
	box.getSize( size );

	mesh.geometry.faceVertexUvs[ 0 ].forEach( fvUvs => {

		fvUvs.forEach( fvUv => {

			fvUv.x = ( fvUv.x - box.min.x ) / size.x; fvUv.y = 1 - ( fvUv.y - box.min.y ) / size.y;

		} );

	} );

	mesh.geometry.vertices = vertices;

	const line = addLine( vertices );
	mesh.add( line );

	mesh.castShadow = true;
	mesh.receiveShadow = true;

	mesh.geometry.computeVertexNormals();
	mesh.geometry.computeFaceNormals();
	mesh.geometry.computeBoundingBox();
	//mesh.geometry.computeBoundingSphere();
	mesh.updateMatrixWorld();

	//scene.add( mesh );

	return mesh;

};



function addLine ( vertices ) {

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const line = new THREE.Line( geometry, material );

	return line;

}



PHJ.getTempVertices = function ( vertices ) {

	const triangle = new THREE.Triangle( vertices[ 2 ], vertices[ 1 ], vertices[ 0 ] );
	const normal = triangle.getNormal( new THREE.Vector3() );
	const baseNormal = new THREE.Vector3( 0, 0, 1 );
	const quaternion = new THREE.Quaternion().setFromUnitVectors( normal, baseNormal );

	const tempVertices = vertices.map( vertex => vertex.clone().applyQuaternion( quaternion ) );
	//console.log( 'tempVertices', tempVertices );

	return tempVertices;

};
