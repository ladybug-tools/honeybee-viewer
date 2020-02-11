// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/template
// 2020-01-15
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const TSG = {};

TSG.url = "https://api.github.com/repos/mrdoob/three.js/git/trees/master?recursive=1";
TSG.prefix = "https://rawcdn.githack.com/mrdoob/three.js/master/";


TSG.init = function () {

	TSGdivThreeSceneGround.innerHTML = TSG.getMenu();

	TSG.toggleGroundHelper();

};



TSG.getMenu = function () {

	const htm = `
<details ontoggle=TSG.getFilesPnGThree(); open>

	<summary>
		Scene ground

		<span class="couponcode">??? <span class="coupontooltip">
		Update the appearance of the ground mesh in the scene.
		</span></span>

	</summary>

	<p title="XYZ = RGB" >

		<label>
			<input type=checkbox onchange=THRT.toggleGroundHelper(); > ground
		</label>
	</p>

	<p>
		<label>
			<input type="color" value="#ff00ff" id="DSSinpColorGround"
				oninput="THR.groundHelper.material.color=( new THREE.Color(this.value));" >
			Select ground color
		</label>
	</p>

	<p>
	<select id=TSGselPng onchange=TSG.loadPng(this.value) size=20 style=width:100%;></select>
	</p>

	<div id=TSGdivMessage ></div>

</details>`;

	return htm;

};



TSG.toggleGroundHelper = function ( position = THR.scene.position.clone(), elevation = -50.1) {

	// move to THRT but z min should be zero

	if ( !THR.groundHelper ) {

		//THR.scene = new THREE.Scene();
		//THR.scene.background = new THREE.Color( 0xffe0ff );
		//THR.scene.fog.near = 20;
		//THR.scene.fog.far = 100;

		//const reElevation = /<Elevation>(.*?)<\/Elevation>/i;
		//GBX.elevation = GBX.text.match( reElevation )[ 1 ];
		//console.log( 'elevation', GBX.elevation );

		//elevation = GBX.boundingBox.box.min.z - 0.001 * THRT.radius;
		//elevation = 0;

		const geometry = new THREE.PlaneGeometry( 20 * THR.radius, 20 * THR.radius );

		color = new THREE.Color().setHex( THRTinpColorGround.value );
		const material = new THREE.MeshPhongMaterial( { color: 0x888888, opacity: 0.5, side: 2 } );
		THR.groundHelper = new THREE.Mesh( geometry, material );
		THR.groundHelper.receiveShadow = true;

		THR.groundHelper.position.set( position.x, position.y, parseFloat( elevation ) );
		THR.groundHelper.name = "groundHelper";

		THR.scene.add( THR.groundHelper );

		return;

	}

	THR.groundHelper.visible = !THR.groundHelper.visible;

};


TSG.getFilesPnGThree = function () {

	fetch(TSG.url)
		.then(response => response.json())
		.then(json => {

			TSG.pngData = json.tree.filter(item => item.path.includes("textures")).map(item => item.path);

			TSGselPng.innerHTML = TSG.getOptions();

		});

};


TSG.getOptions = function () {

	const options = TSG.pngData.map((item, index) => {

		return `<option value=${index}>${item.split("/").pop()}</option>`;

	});

	return options;

};

TSG.loadPng = function ( index ) {

	item = TSG.pngData[ index ]

	url = TSG.prefix + item;

	loader = new THREE.TextureLoader();


	loader.load( url, callback );

	function callback ( texture ){

		THR.groundHelper.material = new THREE.MeshPhongMaterial( { map: texture, side: 2 } );
		texture.needsUpdate = true;
		THR.groundHelper.material.needsUpdate = true;

	}

}

TSG.init();