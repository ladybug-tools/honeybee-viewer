

var PHJ = {


};

PHJ.processJson = function ( json ) {

	const colors = {

		Wall: "beige",
		Floor: "brown",
		RoofCeiling: "red",
		AirBoundary: "blue"

	};



	const rooms = json.rooms || [];

	let id = 0;
	PHJ.vertices = [];
	PHJ.geometryShade = new THREE.Geometry();

	PHJ.geometryFaces = new THREE.Geometry();

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

			PHJ.addShape3d( vertices, holes );

			PHJ.parseShades( face.indoor_shades || [] );

			PHJ.parseShades( face.outdoor_shades || [] );

			PHJ.parseApertureShades( face.apertures || [] );

		}

	}

	PHJ.parseShades( json.orphaned_shades || [] );

	//zoomObjectBoundingSphere( PHJ.group );

	//PHJ.parseBoundary();



};


PHJ.parseApertureShades = function ( apertures ) {

	for ( let aperture of apertures ) {

		PHJ.parseShades( aperture.outdoor_shades || [] );

	}

};




PHJ.parseBoundary = function () {

	// boundaries may not be at ground zero

	const v = arr => new THREE.Vector3().fromArray( arr );

	const boundariesStrings = string.match( /"boundary"([^]*?)\}/gm );
	//console.log( "boundariesStrings", boundariesStrings );

	if ( boundariesStrings ) {

		const boundaries = boundariesStrings.map( item => JSON.parse( item.slice( 11, - 1 ) ) );
		//console.log( "boundaries", boundaries );

		const boundariesVertices = boundaries.map( arr => arr.map( points => v( points ) ) );
		boundariesVertices.forEach( vertices=> vertices.push( vertices[ 0 ] ) );
		//console.log( 'boundariesVertices', boundariesVertices );

		for ( let vertices of boundariesVertices ) {

			const shape = PHJ.addShape3d( vertices, [], "beige" );
			PHJ.group.add( shape );

		}

	}

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

		const tempVertices = PHJ.getTempVertices( vertices );
		const shape = new THREE.Shape( tempVertices );
		const shapeGeometry = new THREE.ShapeGeometry( shape );

		shapeGeometry.vertices = vertices;
		PHJ.geometryShade.merge( shapeGeometry );

		PHJ.vertices.push( vertices );

	}



};



PHJ.addShape3d = function ( vertices, holes ) {

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
	shapeGeometry.vertices = vertices;
	//console.log( 'shapeGeometry', shapeGeometry );

	PHJ.geometryFaces.merge( shapeGeometry );

	PHJ.vertices.push( vertices );

};



function addLine ( vertices ) {

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const line = new THREE.Line( geometry, material );
	//line.updateMatrixWorld();

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
