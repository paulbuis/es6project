
*Draft README

This is a work in progress with a planned release to my CS languages class in the fall

This is intended to be a starter template for ES6 language projects targetted at non-ES6 interpreters
such as those running in a browser. It shows use of Babel as a transpiler for ES6/7, but other transpilers such
as those for TypeScript or CoffeeScript can be used intstead. It shows use of Webpack https://www.npmjs.com/package/webpack 
to package multiple
ES6/7 modules/files into a single deliverable .js file, but Browserify (http://browserify.org/) could be used instead. It does not
show minification with something like UglifyJS, although most projects will want to use something like
that on their deliveable (perhaps as a plug-ing for Webpack: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/).
This project uses NPM as the taskrunner rather than something more sophisticated like Grunt (https://gruntjs.com/),
Gulp (http://gulpjs.com/), or Gradle (https://gradle.org/). One of these tools may be more appropriate on a more complex project.

*Setting up projects: for project creators

In order to set up a NodeJS/NPM-based project (where NodeJS is running the JavaScript tools, even if the
target is a browser rather than NodeJS). The first step is to create a project directory with a package.json
file that describes the dependencies for NPM. This process is shown below with the "npm init" command creating
a minimal package.json file which is then updated by the "npm install" command. The "npm install" command will
also create a directory called "node_modules" which contains the NodeJS code for these packages as well as the
packages they recursivley depend on.

```bash
mkdir es6project
cd es6project
npm init -y
npm install --save-dev babel-loader babel-preset-es2017 webpack live-server
mkdir src tmp dist
```

Since I am distributing the project via GitHub and want to use Git as my source code control system, I then
begin the process of setting things up for Git (by creating a .git directory) with the command

```bash
git init
```

and create a .gitignore file in the project directory. I happen to use Windows and use a Git Bash (https://git-scm.com/downloads)
command window to give me a more Unix-like command environment. Mac users may simply use a Bash shell provided by the MacOS Terminal
app. I currently avoid GUIs and IDEs to make sure I know what is really going on under the hood. I also use Micrsoft Code (which is
cross-platform and uses NodeJS under the hood) as my code editor. However, you should use whatever code editor you feel most comfortable
with. My friends who can afford commercial editors tend to prefer Sublime Text (https://www.sublimetext.com/). My students tend to
prefer Nodepad++ (https://notepad-plus-plus.org/). You can use and IDE just for its editors. Eclipse's Webtools Platform
(WTP, https://projects.eclipse.org/projects/webtools) or using
an Eclipse distribution that has WTP pre-installed (such as Eclipse for Java EE) may be a reasonable approach as would using a
one of the fine IDEs produced by JetBrains such as WebStorm (https://notepad-plus-plus.org/).

*If you are downloading via GitHub

If you are downloading this via GitHub, you might just grab the ZIP file from ... or clone the project with the command
```bash
git clone ...
```

If you want to keep the project under the Git source code control system, I recommend cloning the project rather than downloading
the ZIP file, otherwise you can just download the ZIP and forget about Git.

In the project directory, you can reconsitute the contents of the node_modules directory with fresh downloads via the command
```
npm install
```


We then create three new directories. src will be where we place our ES6 JavaScript
source code to be transpiled. The transpiler will put its output in the tmp directory
which can be emptied before staring the transpile process to get rid of unwanted output
generated from deleted source files.



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
we will be using Babel (http://babeljs.io/). We need to modify package.json
and then run npm to read package.json and use the command line arguments
we specified there.



Add a line to package.json:
```json
"babel": "babel ./src/lib.js -o ./tmp/lib.js"
```
