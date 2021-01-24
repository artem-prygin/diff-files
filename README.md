### Badges:
[![Linter for Google Actions](https://github.com/artem-prygin/frontend-project-lvl2/workflows/Linter%20Github%20Actions/badge.svg)](https://github.com/artem-prygin/frontend-project-lvl2/actions?query=workflow%3A%22Linter+Github+Actions%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/57760033663318a676a1/maintainability)](https://codeclimate.com/github/artem-prygin/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/57760033663318a676a1/test_coverage)](https://codeclimate.com/github/artem-prygin/frontend-project-lvl2/test_coverage)
* * *
## About
**Gendiff** is a console package, that compares two files and shows the difference between them. Json and Yaml formats are supported.

## Installation
You must have [**node.js**](https://nodejs.org/en/) installed on your machine (version 14.x is preferable). <br>
To install the package on your machine run:
<pre><code>npm install -g @hexlet/code</code></pre>

To compare files in a stylish format (provided by default) run
<pre><code>gendiff filePath1 filePath2</code></pre>
where filePath1 and filePath2 are absolute or relative paths to your json or/and yml files

**Comparing two flat JSON files**
[![asciicast](https://asciinema.org/a/CLMANdSfiIHJ8qA7D6TgMBx19.svg)](https://asciinema.org/a/CLMANdSfiIHJ8qA7D6TgMBx19)

**Comparing two flat YAML files**
[![asciicast](https://asciinema.org/a/rXEjMztMHItdoqRHKQPAZD0Bn.svg)](https://asciinema.org/a/rXEjMztMHItdoqRHKQPAZD0Bn)

**Comparing two complex files in a stylish format**
[![asciicast](https://asciinema.org/a/igxUKMOWZW6OJxfOVgRcY1REB.svg)](https://asciinema.org/a/igxUKMOWZW6OJxfOVgRcY1REB)

To compare files in plain text format run
<pre><code>gendiff -f plain filePath1 filePath2</code></pre>

**Comparing two complex files in plain format**
[![asciicast](https://asciinema.org/a/5r1JyemDr6QKFnljRQ9DmLTxU.svg)](https://asciinema.org/a/5r1JyemDr6QKFnljRQ9DmLTxU)

To compare files in json format run
<pre><code>gendiff -f json filePath1 filePath2</code></pre>

**Comparing two complex files in json format**
[![asciicast](https://asciinema.org/a/F7QFPfGrBUbGQTGAE3m7Frw79.svg)](https://asciinema.org/a/F7QFPfGrBUbGQTGAE3m7Frw79)
* * *
### Good luck and good bye!
Author: Artem Prygin
