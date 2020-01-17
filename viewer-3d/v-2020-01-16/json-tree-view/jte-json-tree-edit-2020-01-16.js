const JTE = {}


JTE.init = function () {

	JTHpButtons.innerHTML += JTE.getMenu();

	//window.addEventListener( "onloadjson", JTE.onLoad, false );

}


JTE.getMenu = function() {

	const htm =
	`
		<button onclick=JTE.addFaceIds() >add face buttons</button>
	`;

	return htm
};


JTE.onLoad = function () {

	JTE.addFaceIds();

	const details = JTVdivJsonTree.querySelectorAll( "details" );

	details[ 0 ].open = true;

}

JTE.addFaceIds = function () {

	id = 0;

	const rooms = JTV.json.rooms;

	for ( let room of rooms ) {

		const faces = room.faces;

		for ( let face of faces ) {

			face.id = id;

			face.button = `<button onclick=console.log(this.value);JTE.addHighLight(this.value); value=${ id++ } >faces</button>`;

		}
	}

	JTVdivJsonTree.innerHTML = JTV.parseJson( JTV.root, JTV.json, 0 );

	//htm = `<button onclick=console.log(this.value); value=23 >faces</button>`;

	//JTVdivJsonTree.innerHTML = JTVdivJsonTree.innerHTML.replace( /xxxx/g, htm );
};


JTE.addHighLight = function ( id ) {

	//console.log( 'id', id );

	shape = undefined;

	for ( child of PHJ.group.children ) {

		//console.log( 'child', child.userData.id, id );

		if ( child.userData.id === +id ) {

			shape = child;
			continue;
		}

		child.material.emissive.setHex( 0x000000 );


	}

	//console.log( 'shape', shape, shape, id );

	//shape.material.color = new THREE.Color( "black" );

	if ( shape.material.emissive.getHex() !== 16711680 ) {

		shape.material.emissive.setHex( 0xff0000 );

	} else {

		shape.material.emissive.setHex( 0x000000 );


	}


	shape.material.needsUpdate = true;

	console.log( 'shape mat', shape.material );
}


JTE.init();
