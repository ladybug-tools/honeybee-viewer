
<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://ladybug.tools/www.ladybug.tools/honeybee-viewer/viewer-3d/README.md "View file as a web page." ) </span>

<div><input type=button class = "btn btn-secondary btn-sm" onclick=window.location.href="https://github.com/ladybug-tools/honeybee-viewer/tree/master/viewer-3d/README.md"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ></div>

<br>

# [Honeybee Viewer 3D Read Me]( #README.md )


<iframe src=https://ladybug.tools/honeybee-viewer/viewer-3d/ width=100% height=500px >Iframes are not viewable in GitHub source code views</iframe>
_<small>Honeybee Viewer 3D</small>_


## Full screen demo with preferred link: [Honeybee Viewer 3D]( https://ladybug.tools/honeybee-viewer/viewer-3d/index.html )


## Concept

View Honeybee models in 3D in your browser using the WebGL and the Three.js JavaScript library


## Honeybee Viewer 3D

_The following links go to the version as dated_

### [Honeybee Viewer 3D 2020-02-13]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-02-13/honeybee-viewer-3d.html)

* F: Add listing and opening Dragonfly Schema sample files in GitHub repo
* F: Begins to add second and new algorithm for identifying items of interest
	* Based on String.match() as opposed to JSON.parse();
	* Both searching and parsing algorithms appear to work well together and have no conflicts
	* Output may be identified as the black lines around faces
* F: Begins to add reading ```floor_boundary``` elements and displaying these in the 3D model view

The new search algorithm is a way of helping me identify geometry elements I do not yet know about and/or have not yet built a parser that creates a face-filling shape.



### [Honeybee Viewer 3D 2020-02-10]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-02-10/honeybee-viewer-3d.html)

* F: Click any face to view its properties in the JSON Tree View card in the left menu
* F: Mouse over any face to see minimal details appear at screen top right JSON Tree View card in the left menu
* F: Text input search: type in text to search for key or properties to be displayed in
* C: Update help text and titles throughout
* F: Make JSON Tree finder work as expected
	* Enter text to search for
	* Click buttons in results
	* View item in tree view highlighted in green and scrolled into view


### [Honeybee Viewer 3D 2020-02-03]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-02-03/honeybee-viewer-3d.html)

* F: Add link to Builder
* R: Turn off gaming mode
* F: Add gfb-github-file-builder-2020-02-03.js
	* Honeybee JSON Schema sample files from ladybug-tools/spider on GitHub.


### [Honeybee Viewer 3D 2020-01-27]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-01-27/honeybee-viewer-3d.html)

* thrv-three-view-2020-01-27.js
	* R: Remove raycasting
* thrm-three-mouseover-2020-01-27.js
	* New module
	* Improved and working raycasting
	* Currently - and just for the moment - turns the viewer into a game
* phj-parse-honeybee-json-2020-01-24.js
	* R: Add mesh.computeBoundingBox - helps with raycasting
* jtf-json-tree-finder-2020-01-27.js
	* F: New module
	* F: Allows you to initiate a text search
	* F: Displays the findings ****but does not yet locate them****

### [Honeybee Viewer 3D 2020-01-24]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-01-24/honeybee-viewer-3d.html)

* phj-parse-honeybee-json-2020-01-24.js
	* R: Has shade fix from https://discourse.threejs.org/t/2d-to-3d-shape-shade-and-texture/12299/5
	* B: ass through jsHint and cleanup
* gfh-github-file-honeybee-2020-01-24.js
	* Don't run if you already have the data
* thrv-three-view-2020-01-21.js
	* New zoom fit

### [Honeybee Viewer 3D 2020-01-16]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-01-16/honeybee-viewer-3d.html)

* jtv-json-tree-view-2020-01-16.js
	* R: Strings from blue to green
	* F: Add face.indoor_shades
	* F: Add face.outdoor_shades
	* F: Add model.orphaned_shades
* jth-json-tree-helper-2020-01-16.js
	* R: comment out 'clickable links' ang popup help
* jte-json-tree-edit-2020-01-16.js
	* B: Working again
	* F: Turned on by default
	* F: Clicking button acts as toggle
	* F: Only one face is highlighted at a time
* thr-three-2020-01-16.js
	* F: New module
	* F: 'Zoom all' beginning to work

### [Sample File Viewer 3d 2020-01-10-00]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-01-10-00/sample-file-viewer-3d.html )
* style-2020-01-10.js
	* B: Views better on very very small devices
	* B: Handles OS darkmode
* gfl-github-file-list-2020-01-10-00.js
	* B: GFLselFiles resizes more nicely in menu
	* R: Update Honeybee schema repo name
* jtv-json-tree-view-2020-01-10-00.js
	* R: Rename top from "root" to "model"
* phj-parse-honeybee-json-2020-01-10
	* F: Add ability to parse and show apertures
	* F: Identify doors and shades in console but no parsing yet
* thrt-three-toggles-2020-01-07-00.js
	* F: Add fog toggle;
	* F: Set Axes, ground and fog on by default
* jte-json-tree-edit-2020-01-09-00.js
	* Face buttons turned on at load time

### [Sample File Viewer 3d 2020-01-09-00]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-01-09-00/sample-file-viewer-3d.html )
* R: now built around GFL anf JTV modules
* phj-parse-honeybee-json-2020-01-07
	* Now passes jsHint
	* Listens for and responds to GFL onLoad event dispatch

### [Sample File Viewer 3d 2020-01-08-00]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-01-08-00/sample-file-viewer-3d.html )

### [Sample File Viewer 3d 2020-01-07-00]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-01-07-00/sample-file-viewer-3d.html )
* Add JSON tree view to menu
* Add faces have color
* Add lights, shade and shadow
* Add Setting menu panel with toggles card and functions
	* Axes, ground plane, edges bounding box
* General refactor and cleanup

### [Sample File Viewer 3d 2020-01-05-02]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-01-05-02/sample-file-viewer-3d.html )
	* Begins to add a tree view of the JSON

### [Sample File Viewer 3d 2020-01-05-01]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/v-2020-01-05-01/sample-file-viewer-3d.html ) <br><img src="https://www.ladybug.tools/honeybee-viewer/images/sample-file-viewer-3d-2020-01-05-01.png" width=240>

### [Sample File Viewer 3d 2020-01-05-00]( https://www.ladybug.tools/honeybee-viewer/viewer-3d/sample-file-viewer-3d/v-2020-01-05-00/sample-file-viewer-3d.html )


## To Do / Wish List

* 2020-02-12 ~ Theo ~ Add boundary display as lines function
* 2020-02-12 ~ Theo ~ Add unique floors
* 2020-02-12 ~ Theo ~ boundary_floor
* 2020-02-12 ~ Theo ~ Add context shade


## Issues


## Things you can do using this script

* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the Octocat icon to view or edit the source code on GitHub
* Click on title to reload
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors


## Links of Interest

* http://techslides.com/how-to-parse-and-search-json-in-javascript

## Change Log

Items here relate to the readme and other non-script matters

### 2020-01-16 ~ Theo

* Start of update icon to honeybee
* Add iframe and start fixing links to older versions


### 2020-01-13 ~ Theo

* Move to 'honeybee viewer'

### 2020-01-07 ~ Theo

Sample File Viewer 3D 2020-01-07

* First commit read me



***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > <img src='../honeybee.ico' height=24 > </a></center>

