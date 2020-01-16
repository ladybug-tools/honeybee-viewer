// copyright 2020 Theo Armour. MIT license.
/* global GFO, JTVdivJsonTreeView, JTVdivJsonTree */
// jshint esversion: 6
// jshint loopfunc: true



const JTV = {};

JTV.target = JTVdivJsonTreeView;
JTV.root = "model";
JTV.json = undefined;

JTV.init = function () {

	window.addEventListener( "onloadgfo", JTV.onLoad, false );

	JTV.target.innerHTML = JTV.getMenu();

};



JTV.onLoad = function ( event ) { //console.log( 'JTC event', event );

	JTV.json = GFO.json;

	JTVdivJsonTree.innerHTML = JTV.parseJson( JTV.root, JTV.json, 0 );

	const details = JTVdivJsonTree.querySelectorAll( "details" );

	details[ 0 ].open = true;

};



JTV.getMenu = function () {

	const htm = `

	<details open >

		<summary>
			JSON tree view

			<span class="couponcode" >??<span class="coupontooltip" >
				JSON rendered to a tree view using Theo's parser script</p>
			</span></span>
		</summary>

		<div id="JTVdivJsonTree"></div>

	</details>

`;

	return htm;

};



JTV.parseJson = function ( key = "", item = {}, index = 0 ) { //console.log( '', key, item, index );
	const type = typeof item;

	if ( type === "null" ) { console.log( 'null item', item ); };

	if ( [ "string", "number", "boolean", "null", "bigint" ].includes( type ) || !item ) {

		return JTV.getString( key, item, index );

	} else if ( type === 'object' ) {

		return Array.isArray( item ) ? JTV.getArray( key, item, index ) : JTV.getObject( key, item, index );

	}

};



JTV.getString = function ( key, item, index ) { //console.log( 'string', key, item, index  );

	// https://stackoverflow.com/questions/8299742/is-there-a-way-to-convert-html-into-normal-text-without-actually-write-it-to-a-s
	//if ( typeof item === "string" ) { item = item.replace( /<[^>]*>/g, '' ); }
	//if ( typeof item === "number" ) { item = item.toLocaleString() };

	//if ( typeof item === "null" ) { console.log( 'null item', item ); };

	return `<div>${ key }: <span style=color:blue >${ item }<span></div>`;

};



JTV.getArray = function ( key, array, index ) { //console.log( 'Array', key, array );

	const htm = array.map( ( item, index ) => JTV.parseJson( key, item, index ) ).join( "" );

	return `<details style="margin: 1ch 0 1ch 1ch;" >
		<summary>${ key } [ ${ array.length } ]</summary>${ htm }
	</details>`;

};



JTV.getObject = function ( key, item, index ) {

	if ( !item ) { console.log( 'error:', key, item, index ); return; }

	const keys = Object.keys( item );
	const htm = keys.map( key => JTV.parseJson( key, item[ key ] ) ).join( "" );

	return `<details style="margin: 1ch 0 1ch 1ch;" >
		<summary>${ key } ${ index }: { ${ keys.length } }</summary>${ htm }
	</details>`;

};



JTV.init();