// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/template
// 2020-01-15
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


const JTF = {};



JTF.init = function () {

	JTFdivJsonTreeFinder.innerHTML = JTF.getMenu();

};



JTF.getMenu = function () {

	const htm = `
<details open>

	<summary>
		JSON Tree Finder

		<span class="couponcode">??? <span class="coupontooltip">aaa bbb ccc 123 456</span></span>

	</summary>

	<p><input id=JTFinpSearch value="Roof" ></p>
	<p><button onclick=JTF.findStuff(); >find stuff</button></p>

	<div id=JTFdivMessage ></div>

</details>`;

	return htm;

};


JTF.findStuff = function () {


	divs = Array.from( JTVdivJsonTree.querySelectorAll( "div" ) )

	find = JTFinpSearch.value;

	finds = divs.filter( div => div.innerText.includes(  find ))
	console.log( 'finds', finds );

	const htm = finds.map( find => find.innerHTML ).join( "" );

	JTFdivMessage.innerHTML = htm;

	//finds[ 2 ].parentNode.open = true

	console.log( '',  );

	//

};

JTF.init();