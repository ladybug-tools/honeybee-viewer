/* global scene, response */


const PBL = {};


PBL.processJson = function ( json ) {

	PBL.parseBuildings( json.buildings || [] );

	PBL.parseStories( json.unique_stories || [] );

	PBL.parseRoom2ds ( json.room_2ds || [] );

	PBL.parseContextShades( json.context_shades || [] );

	PBL.parseGeometry( json.geometry || [] );

	if ( json.type === "Room2D" ) PBL.parseFloorBoundary( json || [] );

};



PBL.parseBuildings = function ( buildings = [] ) {

	for ( let building of buildings ) {

		PBL.parseStories( building.unique_stories )

	}

};



PBL.parseStories = function ( unique_stories ) {

	for ( let story of unique_stories ) {

		PBL.parseRoom2ds( story.room_2ds )

	}

};



PBL.parseRoom2ds = function ( room_2ds ) {

	for ( let room of room_2ds ) {

		PBL.parseFloorBoundary( room );

	}

};



PBL.parseFloorBoundary = function ( floor ) {

	const vertices = floor.floor_boundary.map( pt => new THREE.Vector2( pt[ 0 ], pt[ 1 ] ) );
	//console.log( "verts", vertices );

	const shape = new THREE.Shape( vertices );

	const geometry = new THREE.ExtrudeGeometry( shape, { bevelEnabled: false, depth: floor.floor_to_ceiling_height } );
	geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, 0, floor.floor_height ) );

	const material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true, wireframe: false } );
	//const material = new THREE.MeshPhongMaterial( { color: color, opacity: 0.9, side: THREE.DoubleSide, transparent: true, wireframe: false } );

	const mesh = new THREE.Mesh( geometry, material );

	PBL.group.add( mesh );

};



PBL.parseContextShades = function ( context_shades ) {

	for ( let context_shade of context_shades ) {

		PBL.parseGeometry( context_shade.geometry );

	}

};



PBL.parseGeometry = function ( geometries ) {

	for ( let geometry of geometries ) {

		const vertices = geometry.boundary.map( point => new THREE.Vector3().fromArray( point ) );

		const shape = PHJ.addShape3d( vertices, [], "beige" );

		PBL.group.add( shape );

	}

};
