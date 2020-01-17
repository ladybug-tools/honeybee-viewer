// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/template
// 2020-01-16
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const THRV = {};



THRV.init = function () {

	THRVdivThreejsView.innerHTML = THRV.getMenu();

};



THRV.getMenu = function () {

	const htm = `
<details open>

	<summary>
		View

		<span class="couponcode">??? <span class="coupontooltip">control the camera</span></span>

	</summary>

	<p>
		<button onclick=THR.controls.reset(); title="Return to default view">reset view</button>

		<button onclick=THRV.zoomObjectBoundingSphere(meshGroup); title="zoom without shifting camera angle">zoom all</button>

	</p>

	<p>
		<button onclick="THR.controls.autoRotate=!THR.controls.autoRotate">rotation</button>
	</p>

	<p>
		<input type="range" onclick="THR.controls.autoRotateSpeed=+this.value/10-5;" title="rotation speed" >
	</p>


	<div id=TMPdivMessage ></div>

</details>`;

	return htm;

};



THRV.zoomObjectBoundingSphere = function ( obj = PHJ.group) {
	//console.log( "obj", obj );

	THR.center = new THREE.Vector3( 0, 0, 0 );
	THR.radius=  50;

	const bbox = new THREE.Box3().setFromObject( obj );
	console.log( 'bbox', bbox );

	if ( bbox.max.x !== Infinity ) {

		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );

		THR.center = sphere.center;
		THR.radius = sphere.radius;
		//console.log( "sphere", sphere )
	}

	THR.controls.target.copy( THR.center ); // needed because model may be far from origin
	THR.controls.maxDistance = 10 * THR.radius;

	delta = THR.camera.position.clone().sub( THR.controls.target ).normalize();
	//console.log( 'delta', delta );

	position = THR.controls.target.clone().add( delta.multiplyScalar( 2 * THR.radius ) );
	//console.log( 'position', position );

	distance = THR.controls.target.distanceTo( THR.camera.position );

	THR.camera.zoom = distance / ( 2 * THR.radius ) ;

	//THR.camera.position.copy( THR.center.clone().add( new THREE.Vector3( -2 * THR.radius, 2 * THR.radius, 1.0 * THR.radius ) ) );
	THR.camera.near = 0.001 * THR.radius; //2 * camera.position.length();
	THR.camera.far = 20 * THR.radius; //2 * camera.position.length();
	THR.camera.updateProjectionMatrix();

	let event = new Event( "onresetthree", {"bubbles": true, "cancelable": false, detail: true } );

	//window.addEventListener( "onrresetthree", doThings, false );

	// listening: or-object-rotation-xx.js
	// listening: dss-display-scene-settings-xx.js

	window.dispatchEvent( event );

};


THRV.init();