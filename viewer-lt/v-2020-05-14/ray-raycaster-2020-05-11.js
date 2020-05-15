////////// Interacting between DOM and 3D

/* global renderer, divPopUp */

const RAY = { // three.js mouse interaction with scene

	raycaster: new THREE.Raycaster(),
	mouse: new THREE.Vector2(),
	intersectObjects: []

};



RAY.addMouseMove = function () {

	renderer.domElement.addEventListener( "mousemove", RAY.onMouseMove );
	renderer.domElement.addEventListener( "touchstart", RAY.onMouseMove );
	renderer.domElement.addEventListener( "touchmove", RAY.onMouseMove );

	//divInfo.innerHTML = "";

};



RAY.onMouseMove = function ( event ) {

	if ( event.type === "touchmove" || event.type === "touchstart" ) {

		event.clientX = event.touches[ 0 ].clientX;
		event.clientY = event.touches[ 0 ].clientY;

	}

	RAY.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	RAY.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	RAY.raycaster.setFromCamera( RAY.mouse, camera );

	let intersects = RAY.raycaster.intersectObjects( RAY.intersectObjects );

	//console.log( "intersects", intersects );

	if ( intersects.length ) {

		let intersected = intersects[ 0 ];

		//console.log( "intersected", intersected );

		//if ( intersected.instanceId ) {


		divPopUp.hidden = false;
		divPopUp.style.left = event.clientX + "px";
		divPopUp.style.top = event.clientY + "px";
		divPopUp.innerHTML = RAY.getHtm( intersected );

		renderer.domElement.addEventListener( "click", RAY.onClick );

		//}

	} else {

		if ( [ "touchstart", "touchmove" ].includes( event.type ) ) {

			divPopUp.hidden = true;

		}

	}

};



RAY.onClick = function () {

	divPopUp.hidden = true;

	renderer.domElement.removeEventListener( "click", RAY.onClick );

};



RAY.getHtm = function ( intersected ) {

	//const country = intersected.object.userData.data[ intersected.instanceId ];
	//console.log( "country", country );

	//const htm = JSON.stringify( intersected, null, "<br>" ); // .replace( /[",]/g, "");

	//const name = country[ 1 ] ? country[ 1 ] : country[ 0 ];

	htm = `
		face index: ${ intersected.faceIndex }<br>
	`;

	return htm;

};
