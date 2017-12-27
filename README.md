# JqPrint

Printing plug-in for jQuery, evolution of jPrintArea: http://plugins.jquery.com/project/jPrintArea
requires jQuery 1.3.x or more (supports jQuery 2).

This is fork of https://github.com/tanathos/jquery.jqprint (v0.3) with merged pull request [#1](https://github.com/tanathos/jquery.jqprint/pull/1), so is v0.4

Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

Example:
```js
$("#selector").jqprint({
    debug: false, //show the iframe for debugging
    importCSS: true, // import page CSS
    printContainer: true // grab outer container as well as the contents of the selector
});
```
