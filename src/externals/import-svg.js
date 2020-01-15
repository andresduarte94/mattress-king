var ajax = new XMLHttpRequest();
ajax.open("GET", "assets/externals/styles-and-defs.svg", true);
ajax.send();

/**
 * Append the external SVG to this very SVG.
 *
 * Notice the use of an SVG selector on the document derived from the AJAX result.
 *  This is because the full cannot be included directly into the SVG.
 *  Trying to include to do so would result in:
 *      `HierarchyRequestError: Node cannot be inserted at the specified point in the hierarchy` in Firefox;
 *      `Nodes of type '#document' may not be inserted inside nodes of type 'svg'.` in Chrome.
 */
ajax.onload = function(e) {
    var parser = new DOMParser();
    var ajaxdoc = parser.parseFromString( ajax.responseText, "image/svg+xml" );
    document.getElementsByTagName('body')[0].appendChild( ajaxdoc.getElementsByTagName('svg')[0] );
}