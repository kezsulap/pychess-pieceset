// ==UserScript==
// @name         Pychess custom pieces
// @version      1.0.6
// @description  dark theme for codeforces
// @author       K
// @match        https://www.pychess.org/*
// @match        https://pychess.org/*
// @match        https://pychess-variants-pr-657.herokuapp.com/*
// @match        https://liantichess.herokuapp.com/*
// @match        https://playstrategy.org/*
// @match        127.0.0.1:8080/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     custom_piecesCSS https://raw.githubusercontent.com/kezsulap/pychess-pieceset/<current_commit_hash>/custom-pieces.css
// @run-at       document-start
// ==/UserScript==

console.log('still there')
var style = GM_getResourceText("custom_piecesCSS");
GM_addStyle(style);


function fix_pieces_svg() {
	var variant = document.querySelector('#mainboard').className.split(' ');
	var elements = document.querySelectorAll('svg image');
    for (var i = 0; i < elements.length; ++i) {
			var el = elements[i];
        if (!el.fixed) {
            el.fixed = true;
						var piece_type = el.getAttribute('className').split(' ');
            if (variant.includes('kyoto')) {
							var piece_id, piece_colour, piece_orientation;
							if (piece_type.includes('p-piece')) piece_id = 'FU';
							else if (piece_type.includes('pp-piece')) piece_id = 'HI';
							else if (piece_type.includes('n-piece')) piece_id = 'KE';
							else if (piece_type.includes('pn-piece')) piece_id = 'KI';
							else if (piece_type.includes('l-piece')) piece_id = 'KY';
							else if (piece_type.includes('pl-piece')) piece_id = 'TO';
							else if (piece_type.includes('s-piece')) piece_id = 'GI';
							else if (piece_type.includes('ps-piece')) piece_id = 'KA';
							else console.log('Unknown piece ' + piece_type);

							if (piece_type.includes('white')) piece_colour = 'dark';
							else if (piece_type.includes('black')) piece_colour = 'bright';
							else console.log('Unknown colour ' + piece_type);

							if (piece_type.includes('ally')) piece_orientation = '0';
							else if (piece_type.includes('black')) piece_orientation = '1';
							else console.log('Unknown orientation ' + piece_type);
							el.setAttribute('href', 'https://cdn.jsdelivr.net/gh/kezsulap/pychess-pieceset@master/static/SIeeO/kyoto/' + piece_orientation + piece_id + '-' + piece_colour + '.svg');
            }
						else if (variant.includes('chennis')) {
							var piece_id = '', piece_colour = '';
							if (piece_type.includes('white')) piece_colour = 'w';
							else if (piece_type.includes('black')) piece_colour = 'b';
							else console.log('Unknown colour ' + piece_type);
							if (piece_type.includes('ps-piece')) piece_id = 'BS';
							else if (piece_type.includes('pm-piece')) piece_id = 'NM';
							else if (piece_type.includes('pp-piece')) piece_id = 'RP';
							else if (piece_type.includes('pf-piece')) piece_id = 'CF';
							else if (piece_type.includes('s-piece')) piece_id = 'SB';
							else if (piece_type.includes('m-piece')) piece_id = 'MN';
							else if (piece_type.includes('p-piece')) piece_id = 'PR';
							else if (piece_type.includes('f-piece')) piece_id = 'FC';
							else console.log('Unknown piece ' + piece_type);
							if (piece_id) {
								el.setAttribute('href', 'https://cdn.jsdelivr.net/gh/kezsulap/pychess-pieceset@master/static/SIeeO/chennis1/' + piece_colour + piece_id + '.svg');
							}
						}
						else {
							var curr_href = el.getAttribute('href');
							if (curr_href.includes('/SIeeO/')) {
								el.setAttribute('href', 'https://cdn.jsdelivr.net/gh/kezsulap/pychess-pieceset@master' + curr_href);
							}
						}
        }
    }
}

function wait_for_element(selector, callback) {
	const config = { childList: true, subtree: true };
	const test = function(mutationsList, observer) {
		var found = document.querySelectorAll(selector);
		// alert(found);
		if (found.length) {
			observer.disconnect();
			callback(found[0]);
		}
	}
	const observer = new MutationObserver(test);
	observer.observe(document, config);
}

function set_fix(element) {
	const config = { childList: true, subtree: true };
	const callback = function(mutationsList, observer) {
		fix_pieces_svg();
	}
	const observer = new MutationObserver(callback);
	observer.observe(element, config);
}

wait_for_element('#mainboard', set_fix)
