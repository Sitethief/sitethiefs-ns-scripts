// ==UserScript==
// @name         Region Highlighter
// @namespace    sitethiefs-ns-scripts
// @version      0.1.1
// @description  Highlights regions
// @downloadURL  https://github.com/Sitethief/sitethiefs-ns-scripts/raw/master/region-highlighter/region-highlighter.js
// @author       Sitethief of Vylixan
// @match        https://www.nationstates.net/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  
<<<<<<< Updated upstream
=======
  let options = {
    // Highlights these elements
    border: true,
    stripe: true,
    // removfes junking button
    junkingRemoved: true,
  }
  
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    .querySelectorAll('div.deckcard-container > div.deckcard > figure.front > div.deckcard-stripe > div.deckcard-region > a')
    .forEach(function (el) {
      if (regionlist.includes(el.getAttribute('href').replace('region=', ''))) {
        el.parentElement.parentElement.style.backgroundColor = 'red';
=======
    .querySelectorAll('div.deckcard-container')
    .forEach(function (container) {
      let anchor = container.querySelectorAll('div.deckcard > figure.front > div.deckcard-stripe > div.deckcard-region > a');
      if (anchor[0] && regionlist.includes(anchor[0].getAttribute('href').replace('region=', ''))) {
        if (options.stripe) {
          anchor[0].parentElement.parentElement.style.backgroundColor = 'red';
          anchor[0].parentElement.parentElement.style.marginLeft = '1px';
          anchor[0].parentElement.parentElement.style.width = '95%';
        }
        if (options.border) {
          container.style.outline = '5px red solid';
        }
        if (options.junkingRemoved) {
          let buttons = container.querySelectorAll('div.deckcard > figure.front > div.deckcard-flag > div.deckcard-info > div.deckcard-info-cardbuttons a.deckcard-junk-button');
          if (buttons[0]) {
            buttons[0].remove();
          }
        }
>>>>>>> Stashed changes
      }
    });
})();
