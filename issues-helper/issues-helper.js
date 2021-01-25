// ==UserScript==
// @name         SitethiefsTargetedIssuesHelper
// @namespace    sitethiefs-ns-scripts
// @version      0.1.0.1
// @description  Helps out with stats targeted issues answering in Nationstates
// @author       Sitethief of Vylixan
// @match        *www.nationstates.net/*page=dilemmas
// @match        *www.nationstates.net/*page=show_dilemma*dilemma=*
// @match        http://www.mwq.dds.nl/ns/results/*
// @match        https://www.nationstates.net/*page=enact_dilemma/*
// @match        https://www.nationstates.net/page=enact_dilemma/*
// @updateURL    https://raw.githubusercontent.com/Sitethief/sitethiefs-ns-scripts/develop-stih/issues-helper/issues-helper.js
// @grant        none
// ==/UserScript==

/**
 * Adds a link the issues results stats at the current issue in the issue list or on the issue page
 * Filter the results of the issue stats, needs NSLinkIssueResultsStats installed, also highlights in the results
 */

(function() {
    'use strict';
    
    let filterConfigs = {
        vylixan_gaea: [
            'Eco-Friendliness',
            'Weather',
            'Environmental Beauty',
        ],
        vylixan_aphrodite: [
            'Average Income (',
        ],
        vylixan_dora: [
            'Average Income of Poor',
        ],
        vylixan_ares: [
            'Industry: Arms Manufacturing',
        ],
        vylixan_apollo: [
            'Average Disposable Income',
        ],
        vylixan_artemis: [
            'Eco-Friendliness',
        ],
        vylixan_demeter: [
            'Sector: Agriculture',
        ],
        vylixan_dionysus: [
            'Authoritarianism',
        ],
        vylixan_hades: [
            'Economy (',
            'Income Equality',
            'Wealth Gaps',
            'Economic Freedom',
            'Corruption',
            'Employment',
        ],
        vylixan_athena: [
            'Public Education',
            'Intelligence',
        ]
    };
    
    const locationIsDilemmas = window.location.href.includes('page=dilemmas');
    const locationIsShowDilemma = window.location.href.includes('page=show_dilemma');
    const statsPage = window.location.href.includes('dds');
    const enactDilemma = window.location.href.includes('page=enact_dilemma');
    
    if (locationIsDilemmas && !locationIsShowDilemma) {
        let body = document.getElementById("loggedin");
        let currentNationKey = body.dataset.nname;
        const issues = document.querySelectorAll('ul.dilemmalist > li');
        if (issues.length) {
            issues.forEach(function (issueLi) {
                const issueLink = issueLi.querySelector('a.dillistnpaper');
                const issueID = getIssueID(issueLink.href);
                const link = `http://www.mwq.dds.nl/ns/results/${issueID}.html?nation=${currentNationKey}`;
                issueLi.innerHTML = issueLi.innerHTML + '<div style="text-align:center"><a href=" ' + link +' " style="text-decoration:underline;color: red;"> Issue Result Stats </a></div>';
            });
        }
    } else if (!locationIsDilemmas && locationIsShowDilemma) {
        let body = document.getElementById("loggedin");
        let currentNationKey = body.dataset.nname;
        const dilemma = document.getElementById("dilemma");
        let issueID = getIssueID(window.location.href);
        if (dilemma) {
            let issueLink = document.createElement('div');
            const link = `http://www.mwq.dds.nl/ns/results/${issueID}.html?nation=${currentNationKey}`;
            issueLink.innerHTML = '<div style="align:center"><a href=" ' + link +' " style="text-decoration:underline;color: red;"> Issue Result Stats </a></div>';
            dilemma.insertBefore(issueLink, dilemma.firstChild);
        }
    } else if (statsPage && urlParams.get('nation')) {
        const nationKey = urlParams.get('nation')
        if (filterConfigs[nationKey]) {
            const nationConfig = filterConfigs[nationKey];
            if (statsPage) {
                document.querySelectorAll('table tbody tr td:nth-child(2) div').forEach(function (div) {
                    let found = false;
                    for(let key in nationConfig) {
                        if (div.innerText.indexOf(nationConfig[key]) !== -1) {
                            found = true;
                        }
                    }
                    if (found === false) {
                        div.style.display = 'none'
                    }
                });
                document.querySelectorAll('table tbody tr td:nth-child(3)').forEach(function (td) {
                    td.style.display = 'none'
                });
            }
        }
    } else if (enactDilemma) {
        let body = document.getElementById("loggedin");
        if (body){
            let currentNationKey = body.dataset.nname;
            const nationConfig = filterConfigs[currentNationKey];
            if (filterConfigs[currentNationKey]) {
                window.scrollTo(0,document.body.scrollHeight);
                const buttons = document.getElementById("toggleissuedetail");
                if (buttons && buttons.children.length && buttons.children[1]) {
                    buttons.childNodes[1].click();
                }
                document.querySelectorAll('.wceffects .wc-change').forEach(function (effect) {
                    let span = effect.querySelector('.wc1');
                    let found = false;
                    for(let key in nationConfig) {
                        if (span.innerText.indexOf(nationConfig[key]) !== -1) {
                            found = true;
                        }
                    }
                    if (found === true) {
                        effect.style.border = '5px solid red'
                        effect.style.padding = '3px';
                    }
                });
            }
        }
    }
    
    function getIssueID(URL) {
        let issueID = null;
        let spliturl = URL.split('/');
        spliturl.forEach(function (urlPart) {
            if (urlPart.includes('dilemma=')) {
                issueID = urlPart.substring(urlPart.lastIndexOf("=") + 1);
            }
            
        });
        return issueID;
    }
    
})();
