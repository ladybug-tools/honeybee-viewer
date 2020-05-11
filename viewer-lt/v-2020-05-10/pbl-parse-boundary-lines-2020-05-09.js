/* global scene, response */


const PBL = {};


PBL.processJson = function ( json) {

	scene.remove( PBL.lines );

	PBL.lines = new THREE.Group();

	PBL.parseBoundary();

	//console.log( "json", json );

	if ( json.buildings ) {

		PBL.parseBuildings( json.buildings );

	} else if ( json.unique_stories ) {

		PBL.parseStories( json.unique_stories );

	} else if ( json.room_2ds ) {

		PBL.parseRoom2ds ( json.room_2ds )

	}



	scene.add( PBL.lines );

	zoomObjectBoundingSphere( PBL.lines );

};


PBL.parseBuildings = function ( buildings = [] ) {

	for ( let building of buildings ) {

		PBL.parseStories( building.unique_stories )

	}

};


PBL.parseStories = function ( unique_stories ) {

	for ( let storey of unique_stories ) {

		PBL.parseRoom2ds( storey.room_2ds )

	}

};


PBL.parseRoom2ds = function ( room_2ds ) {

	for ( let room of room_2ds ) {

		//console.log( "fb", room );

		const vertices = room.floor_boundary.map( pt => new THREE.Vector2( pt[ 0 ], pt[ 1 ] ) );
		//console.log( "verts", vertices );

		const shape = new THREE.Shape( vertices );

		const geometry = new THREE.ExtrudeGeometry( shape, { bevelEnabled: false, depth: room.floor_to_ceiling_height } );
		geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, 0, room.floor_height ) );

		const material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true, wireframe: false } );
		//const material = new THREE.MeshPhongMaterial( { color: color, opacity: 0.9, side: THREE.DoubleSide, transparent: true, wireframe: false } );

		const mesh = new THREE.Mesh( geometry, material );

		PBL.lines.add( mesh );

	}

};



PBL.parseBoundary = function () {

	// boundaries may not be at ground zero

	const v = arr => new THREE.Vector3().fromArray( arr );

	const boundariesStrings = response.match( /"boundary"([^]*?)\}/gm );
	console.log( "boundariesStrings", boundariesStrings );

	if ( boundariesStrings ) {

		const boundaries = boundariesStrings.map( item => JSON.parse( item.slice( 11, - 1 ) ) );
		//console.log( "boundaries", boundaries );

		const boundariesVertices = boundaries.map( arr => arr.map( points => v( points ) ) );
		boundariesVertices.forEach( vertices=> vertices.push( vertices[ 0 ] ) );
		//console.log( 'boundariesVertices', boundariesVertices );

		for ( let vertices of boundariesVertices ) {

			const shape = PHJ.addShape3d( vertices, [], "beige" );
			PBL.lines.add( shape );

		}

	}

};




PBL.parseBoundaryFloor = function () {

	xx = JSON


	matches = response.match( /"floor_boundary"([^]*?)\}/gm );

	if ( matches ) {

		matches = matches.map( item => item.replace( /\r\n|\r|\n/g, "" ) );
		matches = matches.map( item => item.replace( / /g, "" ) );
		matches = matches.map( item => "{" + item + "]}");
		console.log( 'matches', matches );

		xx = JSON.parse( matches )

		console.log( "xx", xx );


		points = matches.map( item => item.slice( 17, 2 + item.indexOf( "]]" ) ) );
		console.log( "points", points );

		const heightsArr = matches.map( item => item.match( /"floor_to_ceiling_height":(.*?),/ ) );
		heights = heightsArr.map( heightArr => heightArr ? heightArr[ 1 ] : 0 );
		//console.log( 'heights', heights );

		points = points.map( item => JSON.parse( item ) );
		//console.log( 'points', points );

		const verticesArr = points.map( ( points, i ) => points.map( point => new THREE.Vector3( point[ 0 ], point[ 1 ], heights[ i ] ) ) );

		verticesArr.forEach( arr => arr.push( arr[ 0 ] ) );
		//console.log( 'verticesArr', verticesArr );

		for ( let vertices of verticesArr ) {

			const geometry = new THREE.Geometry();
			geometry.vertices = vertices;
			const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
			const line = new THREE.Line( geometry, material );

			PBL.lines.add( line );

		}

		PBLdivBoundaryFloorStats.innerHTML = `
<p>
Boundary floor lines: ${ matches.length }
</p>`;

	} else {

		PBLdivBoundaryFloorStats.innerHTML = `
<p>
Boundary floor lines: 0
</p>`;

	}

};



//PBL.init();
