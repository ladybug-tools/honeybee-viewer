
const PBL = {};

PBL.lines = new THREE.Group();

PBL.init = function () {

	PBLdivParseBoundaryLines.innerHTML = PBL.getMenu();

	window.addEventListener( "onloadJson", PBL.processJson, false );

};


PBL.getMenu = function () {

	const htm = `
<details open>

	<summary class=sumMenuSecondary >
		Boundary lines details

		<span class="couponcode">??<span class="coupontooltip">
		</span></span>

	</summary>

	<div id=PBLdivBoundaryStats ></div>

	<div id=PBLdivBoundaryFloorStats ></div>

</details>`;

	return htm;

};


PBL.processJson = function ( json) {

	scene.remove( PBL.lines );

	PBL.lines = new THREE.Group();

	scene.add( PBL.lines );

	PBL.parseBoundary();

	//console.log( "json", json );

	for ( let building of json.buildings ) {

		for ( let storey of building.unique_stories ) {

			for ( let room of storey.room_2ds ) {

				//console.log( "fb", room );

				const vertices = room.floor_boundary.map( pt => new THREE.Vector2( pt[ 0 ], pt[ 1 ] ) );
				//console.log( "verts", vertices );

				const shape = new THREE.Shape( vertices );

				//const shapeGeometry = new THREE.ShapeGeometry( shape );
				//console.log( 'shapeGeometry', shapeGeometry );

				geometry = new THREE.ExtrudeGeometry( shape, { bevelEnabled: false, depth: room.floor_to_ceiling_height } );
				geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, 0, room.floor_height ) );

				const material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true, wireframe: false } );
				//const material = new THREE.MeshPhongMaterial( { color: color, opacity: 0.9, side: THREE.DoubleSide, transparent: true, wireframe: false } );

				const mesh = new THREE.Mesh( geometry, material );

				PBL.lines.add( mesh );
			}
		}

	}

	//PBL.parseBoundaryFloor();

	zoomObjectBoundingSphere( PBL.lines );

};


PBL.parseBoundary = function () {

	const v = arr => new THREE.Vector3().fromArray( arr );

	let matches = response.match( /"boundary"([^]*?)\}/gm );

	if ( matches ) {

		matches = matches.map( item => JSON.parse( item.slice( 11, - 1 ) ) );
		//console.log( 'matches', matches );

		const segment = matches.map( arr => arr.map( points => v( points ) ) );
		segment.forEach( arr => arr.push( arr[ 0 ] ) );
		//console.log( 'segment', segment );

		for ( let vertices of segment ) {

			const shape = PHJ.addShape3d( vertices, [], "beige" );
			PBL.lines.add( shape );

		}

		PBLdivBoundaryStats.innerHTML = `
<p>
Boundary lines: ${ matches.length }
</p>`;

	} else {

		PBLdivBoundaryStats.innerHTML = `
<p>
Boundary lines: 0
</p>`;

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



PBL.init();
