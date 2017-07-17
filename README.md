
```bash
mkdir es6project
cd es6project
npm init -y
npm install --save-dev babel-loader babel-preset-es2017 webpack
npm install -g live-server
mkdir src tmp dist
```


(or shoud it be babel-loader + babel-core instead of babel-cli ???)

The npm package manager is used first to create a minimal package.json file and then
install development packages that are not needed to deploy the project. The package
manager will install the 4 packages specifically mentioned on the command line as well 
as any packages upon which they transitively depend into a subdirectory named 
node_modules. The files in node_modules will not be put under source code control
with git. After the project is downloaded from a git server, the content of this 
directory can be reconstituted with the command "npm install" 

The npm package manager is also used to "globally" install new command line
commands that can be used on any project and are installed in a subdirectory of the 
users home directory, something like (/Users/username/AppData/Roaming/npm) on Windows.


https://www.npmjs.com/package/live-server
https://www.npmjs.com/package/webpack

We then create three new directories. src will be where we place our ES6 JavaScript
source code to be transpiled. The transpiler will put its output in the tmp directory
which can be emptied before staring the transpile process to get rid of unwanted output
generated from deleted source files.

All of the files in tmp will eventually be "packed" into a single file in the dist 
directory which will
be the root of the project to deploy. We will manually place HTML and possibly CSS 
files in the dist directory as well.

dist/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>es2015-project</title>
</head>
<body>
  <h1>Results</h1>

  <p>timesTwo(2) = <em id="result1"></em></p>
  <p>addFive(2) = <em id="result2"></em></p>

  <script src="bundle.js"></script>
</body>
</html>
```

"bundle.js" refers to the currently non-existent ./dist/bundle.js file. We will
generate this by transpiling a set of .js from files in ./src into ./tmp and
then "packing" them into the ./dist/bundle.js file. Here are the two files to transpile:

src/lib.js

```javascript

const timesTwo = (number) => number * 2;
const plusFive = (number) => number + 5;

// ES6 standard format for exporting local names from a module
// not same as what is typically used in NodeJS modules
export {
  timesTwo,
  plusFive
}
```

src/main.js

```javascript
import {timesTwo, addFive} from './lib.js';

document.getElementById('result1').textContent = timesTwo(2);
document.getElementById('result2').textContent = addFive(2)'
```

The goal is to transpile these from an up-to-date version of JavaScript
to the older version that will actually run in the browser. To do this
we will be using Babel (http://babeljs.io/). We need to set up a ./.babelrc file modify package.json
and then run npm to read package.json and use the command line arguments
we specified there with further configuration coming from the ./.babelrc file.

Create ./.babelrc with
```bash
echo '{ "presets": ["es2015"] }' > .babelrc
```

Add a line to package.json:
```json
"babel": "babel ./src/lib.js -o ./tmp/lib.js"
```
