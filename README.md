# SCWebIDE

A browser-based IDE for SuperCollider, for multiple users to collaborate on a shared document. Features:
* Browser-based editor w. [ace-editor](https://github.com/ajaxorg/ace)
* Shared documents w. [ShareDb](https://github.com/share/sharedb)through WebSockets
* Syntax Highlighting (based on [highlightjs-supercollider](https://github.com/highlightjs/highlightjs-supercollider/blob/master/supercollider.js))
* Multiple cursors and selections

## Running
The app is made with angular and express. After you `npm i`, you need to build the client code with `npm run build` and then you can start a local server with `npm start`.
By default it wants to run on port 80.
