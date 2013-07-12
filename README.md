# JqPrint

Printing plug-in for jQuery, evolution of jPrintArea: http://plugins.jquery.com/project/jPrintArea
requires jQuery 1.3.x

Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

Example:
```js
$("#selector").jqprint({
    debug: false, //show the iframe for debugging
    importCSS: true, // import page CSS
    printContainer: true // grab outer container as well as the contents of the selector
});
```