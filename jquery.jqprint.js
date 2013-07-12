// -----------------------------------------------------------------------
// Eros Fratini - eros@recoding.it
// jqprint
//
// - 11/05/2012 - improved implementation of css file inclusion (by https://github.com/permanenttourist)
// - 19/06/2009 - some new implementations, added Opera support
// - 11/05/2009 - first sketch
//
// Printing plug-in for jQuery, evolution of jPrintArea: http://plugins.jquery.com/project/jPrintArea
// requires jQuery 1.3.x
//
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
//------------------------------------------------------------------------
jQuery.fn.jqprint = function (options) {
    var opt = $.extend({}, {
        debug: false, // show the iframe for debugging
        importCSS: true, // import page CSS
        printContainer: true // grab outer container as well as the contents of the selector
    }, options);

    var $element = (this instanceof jQuery) ? this : $(this);
    var isOpera = window.opera !== undefined;
    var doc, content;

    if (isOpera) {
        var tab = window.open("", "jqPrint-preview");
        tab.document.open();

        doc = tab.document;
    } else {
        var $iframe = $("<iframe />");

        if (!opt.debug) {
            $iframe.css({
                position: "absolute",
                width: "0px",
                height: "0px",
                left: "-600px",
                top: "-600px"
            });
        }

        $iframe.appendTo(document.body);
        content = $iframe[0].contentWindow;
        doc = content.document;
    }

    if (opt.importCSS) {
        $("link[rel='stylesheet']").each(function () {
            var $this = $(this);
            var href = $this.attr('href');
            if (href) {
                var media = $this.attr('media') || 'all';
                doc.write("<link type='text/css' rel='stylesheet' href='" + href + "' media='" + media + "' />");
            }
        });
    }

    if (opt.printContainer) {
        // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
        doc.write($($('<div></div>').html($element.clone())).html());
    } else {
        $element.each(function () {
            doc.write($(this).html());
        });
    }

    doc.close();

    (isOpera ? tab : content).focus();
    setTimeout(function () {
        (isOpera ? tab : content).print();
        if (tab) {
            tab.close();
        }
    }, 1000);
};