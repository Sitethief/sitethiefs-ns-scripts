// ==UserScript==
// @name         Region Highlighter
// @namespace    sitethiefs-ns-scripts
// @version      0.1.2
// @description  Highlights regions
// @downloadURL  https://github.com/Sitethief/sitethiefs-ns-scripts/raw/master/region-highlighter/region-highlighter.js
// @author       Sitethief of Vylixan
// @match        https://www.nationstates.net/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  
  let options = {
    // Highlights these elements
    border: true,
    stripe: false,
    highlight_color: 'red',
    // removes the junking button
    junkingRemoved: true,
  }
  
  let regionlist = [
    'the_pacific',
    'lazarus',
    'the_east_pacific',
    //'the_west_pacific',
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
    .querySelectorAll('div.deckcard-container')
    .forEach(function (container) {
      let anchor = container.querySelectorAll('div.deckcard > figure.front > div.deckcard-stripe > div.deckcard-region > a');
      if (anchor[0] && regionlist.includes(anchor[0].getAttribute('href').replace('region=', ''))) {
        if (options.stripe) {
          anchor[0].parentElement.parentElement.style.backgroundColor = options.highlight_color;
        }
        if (options.border) {
          container.style.outline = '5px ' + options.highlight_color + 'solid';
        }
        if (options.junkingRemoved) {
          let buttons = container.querySelectorAll('div.deckcard > figure.front > div.deckcard-flag > div.deckcard-info > div.deckcard-info-cardbuttons a.deckcard-junk-button');
          if (buttons[0]) {
            buttons[0].remove();
          }
        }
      }
    });
})();
