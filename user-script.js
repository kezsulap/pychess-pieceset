// ==UserScript==
// @name         Pychess custom pieces
// @version      1.0.6
// @description  dark theme for codeforces
// @author       K
// @match        https://www.pychess.org/*
// @match        https://pychess.org/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     custom_piecesCSS https://raw.githubusercontent.com/kezsulap/pychess-pieceset/master/custom-pieces.css
// @run-at       document-start
// ==/UserScript==

console.log('still there')
var style = GM_getResourceText("custom_piecesCSS");
GM_addStyle(style);

