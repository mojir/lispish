const reference = require('../cli/reference')
const lispish = require('../dist/lispish')
const path = require('path')
const fs = require('fs')

const DOC_DIR = path.resolve(__dirname, '../docs')

const getTopBar = ({ back }) => `<div class="top-bar">
  <center><pre><span class="main-header"><a id="lispish-header" onclick="showPage('index')">Lispish</a></span></pre></center>
</div>`

const getHeader = () => `<head>
  <link rel="stylesheet" href="styles.css">
</head>`

const getPlayground = () => `  <div class="playground">
    <div class="header">
      Playground <span class="play" onclick="play()">&#9654;</span>
    </div>
    <div class="row">
      <div class="column-half">
        <h4>Lisp</h4>
        <textarea spellcheck=false rows="15" id="code">(* x x)</textarea>
      </div>
      <div class="column-half">
        <h4>Context (JSON)</h4>
        <textarea spellcheck=false rows="15" id="context">{ "x": 12 }</textarea>
      </div>
    </div>
    <div id="output" />
  </div>`

const getScriptTags = () => `  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js" ></script>
  <script src="lispish.iife.js"></script>
  <script>
    var id = location.hash.substring(1) || 'index'
    showPage(id)

    var activeId='index';
    function play() {
      var code = document.getElementById("code").value
      var contextString = document.getElementById("context").value
      var output = document.getElementById("output")
      var context
      try {
        context = JSON.parse(contextString)
      } catch (e) {
        output.innerHTML = "Error: Could not parse context"
        output.classList.add('error')
        return
      }
      var result
      try {
        result = lispish.lispish(code, context)
      } catch (error) {
        output.innerHTML = error
        output.classList.add('error')
        return
      }
      output.classList.remove('error')
      output.innerHTML = stringifyValue(result)
    }
    function showPage(id) {
      var els = document.getElementsByClassName('active')
      while (els[0]) {
        els[0].classList.remove('active')
      }
      els = document.getElementsByClassName('active-sidebar-entry')
      while (els[0]) {
        els[0].classList.remove('active-sidebar-entry')
      }

      document.getElementById(id).classList.add('active')
      if (id !== 'index') {
        document.getElementById(id + '_link').classList.add('active-sidebar-entry')
      }
      activeId = id
      history.pushState(null, '', '#' + id)
    }
    function stringifyValue(value) {
      return JSON.stringify(value, (k, v) => (v === undefined ? 'b234ca78-ccc4-5749-9384-1d3415d29423' : v)).replace(
        /"b234ca78-ccc4-5749-9384-1d3415d29423"/g,
        'undefined',
      )
    }
  </script>
`

setupDocDir()
copyScripts()
writeStyles()
writeIndexPage()

function writeIndexPage() {
  const page = `<!DOCTYPE html>
<html>
${getHeader()}
<body>
  ${getTopBar({ back: false })}
  <div class="row">
    ${getSideBar()}
    <div class="main">
      <div id="index" class="content">
      <h1>Welcome to the Lispish playground!</h1>
      <p>Lispish is a Lisp dialect made to work well in a browser or Node environment.</p>
      <p>Quite a lot in Lispish is not what you're used to if you've done some Lisp before.</p>
      <ul>
        <li><pre>t</pre> and <pre>nil</pre> are gone. Instead there are four new symbols: <pre>true</pre>, <pre>false</pre>, <pre>null</pre> and <pre>undefined</pre>.</li>
        <li>Only one sequence type exists: <pre>list</pre>. And its undelaying data structure is a javascript array.</li>
        <li>No quotes! <pre>'(1 2 3)</pre> is no more... Use <pre>(list 1 2 3)</pre> instead.</li>
        <li>No macros.</li>
        <li>No keyword symbols e.g. <pre>:foo</pre>.</li>
        <li>No tail call optimization (yet).</li>
        <li>No dotted pairs.</li>
        <li>100% test coverage</li>
      </ul>
      <p>Have a look at the list of functions to the left. These are what is available in terms of special- and normal expressions.</p>
      <p>For more instruction on how to install and use Lispish as a cli or a typescript lib, checkout <a href="https://github.com/mojir/lispish">https://github.com/mojir/lispish</a></p>
      <p/>
      <p>Happy coding!</p>



      </div>
      ${Object.values(reference)
        .map(obj => writeDoc(obj))
        .join('\n')}
      ${getPlayground()}
    </div>
  </div>
  ${getScriptTags()}
</body>
</html>
`
  fs.writeFileSync(path.join(DOC_DIR, `index.html`), page, { encoding: 'utf-8' })
}

function writeDoc(docObj) {
  const { name, longDescription, syntax, linkName, specialExpression, examples, sideEffects, arguments: args } = docObj
  return `    <div id="${linkName}" class="content function">
      <h1 class="function-header">${name}</h1>
      ${specialExpression ? '<h3>Special Expression</h3>' : ''}
      <p>${longDescription}</p>
      <label>Syntax</label>
      <pre>${syntax}</pre>
      <label>Arguments</label>
      <pre>${args.length === 0 ? 'No arguments' : args.map(arg => `${arg.name}: ${arg.type}`).join('<br />')}</pre>
      <label>Side effects</label>
      <pre>${sideEffects.length === 0 ? 'No side effects' : sideEffects.map(effect => effect).join('<br />')}</pre>
      <label>Examples</label>
      ${examples
        .map(example => {
          var oldLog = console.log
          console.log = function () {}
          var result
          try {
            result = lispish.lispish(example)
          } catch (error) {
            result = 'Error!'
          } finally {
            console.log = oldLog
          }
          return `<pre>${example} => ${stringifyValue(result)}</pre>`
        })
        .join('\n')}

    </div>
`
}
function getSideBar() {
  const categoryKeys = [
    'Special expression',
    'Math',
    'Predicate',
    'String',
    'List',
    'Object',
    'Regular expression',
    'Misc',
  ]
  const categories = Object.values(reference).reduce((result, obj) => {
    result[obj.category] = result[obj.category] || []
    result[obj.category].push(obj)
    return result
  }, {})

  return `<div class="sidebar">
    ${categoryKeys
      .map(categoryKey => {
        return `<label>${categoryKey}</label><ul>
        ${
          categories[categoryKey]
            ? categories[categoryKey]
                .map(obj => {
                  const linkName = obj.linkName
                  const name = escape(obj.name)
                  return `<a class="small-pre" onclick="showPage('${linkName}')"><li id="${linkName}_link">${name}</li></a>`
                })
                .join('\n')
            : ''
        }
</ul>`
      })
      .join('\n')}
</div>`
}

function setupDocDir() {
  fs.rmdirSync(DOC_DIR, { recursive: true, force: true })
  fs.mkdirSync(DOC_DIR)
}

function copyScripts() {
  fs.copyFileSync(path.join(__dirname, '../dist/lispish.iife.js'), path.join(DOC_DIR, 'lispish.iife.js'))
}

function escape(str) {
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/</g, '&lt;')
  return str
}

function stringifyValue(value) {
  return JSON.stringify(value, (k, v) => (v === undefined ? 'b234ca78-ccc4-5749-9384-1d3415d29423' : v)).replace(
    /"b234ca78-ccc4-5749-9384-1d3415d29423"/g,
    'undefined',
  )
}

function writeStyles() {
  const styles = `body {
  margin: 0;
  padding: 1rem;
  font-family: verdana;
  background-color: #222222;
  color: #dddddd;
}

a:link, a:visited, a:hover, a:active {
  color: #dddddd;
  text-decoration: none;
  cursor: pointer;
}

#lispish-header:hover {
  text-decoration: underline;
}

.sidebar ul {
  list-style-type: none;
  list-style-position: inside;
  padding: 0;
  margin: 0;
}

.sidebar label {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  text-decoration: underline;
}

.row {
  display: flex;
}

.sidebar {
  flex: 25%;
}

.main {
  padding: 0 2rem;
  flex: 75%;
}

.content {
  display: none;
}

.content.active {
  display: block;
}

.column-third {
  flex: 33.33333%;
}

.column-half {
  flex: 1;
  margin-right: 16px;
}

h4, h2, h1 {
  margin: 0;
  padding: 0;
}

.top-bar {
  background-color: #333333;
  margin-bottom: 3rem;
}

.main-header {
  font-size: 36px;
  font-weight: bold;
}

.small-pre, pre {
  font-family: monospace;
  font-size: 1rem;
}

.sidebar .active-sidebar-entry, .sidebar li:hover.active-sidebar-entry {
  background-color: #444444;
  font-weight: bold;
}

.sidebar li:hover {
  background-color: #333333;
}

.playground {
  margin-top: 5rem;
}

.playground .header {
  font-size: 24px;
  margin-bottom: 1.5rem;
}

textarea {
  outline: none;
  background-color: #333333;
  width: 100%;
  resize: none;
  padding: 0.5rem;
  color: #dddddd;
  font-size: 1rem;
}

.play {
  cursor: pointer;
  color: gray;
}

.play:hover {
  color: white;
}

#output {
  margin-top: 1rem;
  font-family: monospace;
  font-size: 1rem;
}
#output.error {
  color: red;
}

#index pre {
 margin: 0;
 display: inline;
 color: #fdff91;
}

label {
  display: block;
  margin-top: 1.5rem;
  font-weight: bold;
}

#index a {
  text-decoration: underline;
  color: #fdff91;
}

h1.function-header {
  font-family: monospace;
}

`
  fs.writeFileSync(path.join(DOC_DIR, `styles.css`), styles, { encoding: 'utf-8' })
}
