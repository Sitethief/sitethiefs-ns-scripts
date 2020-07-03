// ==UserScript==
// @name         Region Highlighter
// @namespace    sitethiefs-ns-scripts
// @version      0.1.1
// @description  Highlights regions
// @downloadURL  https://github.com/Sitethief/sitethiefs-ns-scripts/raw/master/region-highlighter/region-highlighter.js
// @author       Sitethief of Vylixan
// @copyright    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
// @match        https://www.nationstates.net/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  
  let regionlist = [
    'the_pacific',
    'lazarus',
    'the_east_pacific',
    'europeia',
    'the_leftist_assembly',
    'the_communist_bloc',
    'social_liberal_union',
    'the_internationale',
    'north_korea',
    'anarchy',
    'the_red_fleet',
  ];
  
  document
    .querySelectorAll('div.deckcard-container > div.deckcard > figure.front > div.deckcard-stripe > div.deckcard-region > a')
    .forEach(function (el) {
      if (regionlist.includes(el.getAttribute('href').replace('region=', ''))) {
        el.parentElement.parentElement.style.backgroundColor = 'red';
      }
    });
})();
