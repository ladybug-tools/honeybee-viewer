// copyright 2020 Theo Armour. MIT license.
/* global GFLdivGetFiles, GFLselFiles, GFLdivOnLoad, GFLdivFileLoaded, GFLtxtRawJson, JTV, JTVdivJsonView */
// jshint esversion: 6
// jshint loopfunc: true


const GFL = {};

GFL.url = "https://api.github.com/repos/ladybug-tools-in2/honeybee-schema/git/trees/gh-pages?recursive=1";
GFL.prefix = "https://rawcdn.githack.com/ladybug-tools-in2/honeybee-schema/gh-pages/";
GFL.source = "https://github.com/ladybug-tools-in2/honeybee_model_schema/blob/gh-pages/honeybee_schema/samples/";

// GFL.init() is at end of file



GFL.init = function() {

	GFLdivGetFiles.innerHTML = GFL.getMenu();

};


GFL.getMenu = function() {

	const htm = `
	<details ontoggle=GFL.getFileNames(); open>

		<summary>Honeybee Model-Schema Samples</summary>

		<p>
			A list of files from <a href="https://github.com/ladybug-tools-in2/honeybee-schema/tree/master/honeybee_schema/samples" target="_blank">ladybug-tools-in2
			</a> on GitHub. Tooltips indicate file size in bytes. Click file title to view its contents.
			More details available in JavaScript developer console.
		</p>

		<select id=GFLselFiles onchange=GFO.getFileJson(this.value) size=10 style=overflow:auto;width:100% ></select>

		<div id=GFLdivOnLoad ></div>

		<div id=GFLdivFileLoaded ></div>

	</details>


	<details>

		<summary>Raw JSON file <span class=help onmouseover=GFLpRawJsonHelp.hidden=false >?</span></summary>

		<p id=GFLpRawJsonHelp onmouseout=GFLpRawJsonHelp.hidden=true hidden >
			The plain text JSON source code as read directly from the GitHub repository. The text is editable.</p>

		<textarea id=GFLtxtRawJson style=height:400px;width:100%;></textarea>

	</details>

	<br>
`;

	return htm;

};


GFL.getFileNames = function () {

	fetch( GFL.url )
		.then( response => response.json() )
		.then( json => {

			GFL.filesData = json.tree; //.filter( item => item.path.includes( "samples" ) ).filter( item => item.path.endsWith( ".json" ) ).map( item => item );

			GFLselFiles.innerHTML = GFL.getOptions();

			//GFLselFiles.selectedIndex = 28; // select a default file

			//GFL.getFileJson(); // load a default file

		} );

};



GFL.getOptions = function () {

	const options = GFL.filesData.map( ( item, index ) =>
		`<option value=${ index } title="${ item.size.toLocaleString() } bytes" >${ index + 1 } ${ item.path.split( "/" ).pop() }</option>` );

	GFLdivOnLoad.innerHTML = `<p>Files found on GitHub: ${ options.length }</p>`;

	return options;

};



GFL.init();