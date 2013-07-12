﻿// -----------------------------------------------------------------------
// Eros Fratini - eros@recoding.it
// jqprint 0.3
//
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
        debug: false,
        importCSS: true,
        printContainer: true,
        operaSupport: true
    }, options);

    var $element = (this instanceof jQuery) ? this : $(this);
    var doc;

    if (opt.operaSupport && $.browser.opera) {
        var tab = window.open("", "jqPrint-preview");
        tab.document.open();

        doc = tab.document;
    } else {
        var $iframe = $("<iframe />");

        if (!opt.debug) {
            $iframe.css({position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px"});
        }

        $iframe.appendTo("body");
        doc = $iframe[0].contentWindow.document;
    }

    if (opt.importCSS) {
        var $linkPrint = $("link[media='print']");
        if ($linkPrint.length > 0)  {
            $linkPrint.each(function () {
                doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
            });
        } else {
            $("link").each(function () {
                doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
            });
        }
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

    (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
    setTimeout(function () {
        (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print();
        if (tab) {
            tab.close();
        }
    }, 1000);
};
