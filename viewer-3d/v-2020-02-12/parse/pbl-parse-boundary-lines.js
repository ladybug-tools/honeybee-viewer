
const PBL = {};

PBL.lines = new THREE.Group();

PBL.init = function () {



	window.addEventListener( "onloadJson", PBL.processJson, false );

};


PBL.processJson = function () {

	THR.scene.remove( PBL.lines );

	PBL.lines = new THREE.Group();

	THR.scene.add( PBL.lines );


//	console.log( 'res', GFO.response );
const v = arr => new THREE.Vector3().fromArray( arr );

	matches = GFO.response.match( /"boundary"([^]*?)\}/gm )

	//matches = matches.map( item => item.replace( /\r\n|\r|\n/g, "" ) );
	//matches = matches.map( item => item.replace( / /g, "" ) );

	if ( matches ) {

		matches = matches.map( item => JSON.parse( item.slice( 11, -1 ) ) );

		//console.log( 'matches', matches );
		verticesArr = matches.map( item => item.map( arr => v( arr ) ) );
		console.log( 'vertices', verticesArr );

		for ( vertices of verticesArr ) {


			geometry = new THREE.Geometry();
			geometry.vertices = vertices;
			const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
			const line = new THREE.Line( geometry, material );

			PBL.lines.add( line );
		}

	}






};


PBL.init();