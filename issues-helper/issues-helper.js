// ==UserScript==
// @name         SitethiefsTargetedIssuesHelper
// @namespace    sitethiefs-ns-scripts
// @version      0.2.1
// @description  Helps out with stats targeted issues answering in Nationstates
// @author       Sitethief of Vylixan
// @match        *www.nationstates.net/*page=dilemmas
// @match        *www.nationstates.net/*page=show_dilemma*dilemma=*
// @match        *www.mwq.dds.nl/ns/results/*
// @match        *www.nationstates.net/*page=enact_dilemma/*
// @match        *www.nationstates.net/page=enact_dilemma/*
// @updateURL    https://raw.githubusercontent.com/Sitethief/sitethiefs-ns-scripts/develop-stih/issues-helper/issues-helper.js
// @grant        none
// ==/UserScript==

/**
 * Adds a link the issues results stats at the current issue in the issue list or on the issue page
 * Filter the results of the issue stats, needs NSLinkIssueResultsStats installed, also highlights in the results
 */

(function () {
    'use strict';
    
    // Stats is the filtering on the stats page
    // Results is the highlighting on the result page
    let filterConfigs = {
        vylixan_gaea: {
            stats: [
                'Eco-Friendliness',
                'Weather',
                'Environmental Beauty',
            ],
            results: [
                'Eco-Friendliness',
                'Weather',
                'Environmental Beauty',
            ],
        },
        vylixan_aphrodite: {
            stats: [
                'Average Income (',
            ],
            results: [
                'Wealth Gaps',
                'Average Income of Rich',
                'Average Income of Poor',
                'Crime',
                'Industry: Beverage Sales',
                'Weaponization',
                'Obesity',
                'Death Rate',
                'Average Disposable Income',
                'Average Income',
            ],
        },
        vylixan_dora: {
            stats: [
                'Average Income of Poor',
            ],
            results: [
                'Average Income of Poor',
            ]
        },
        vylixan_ares: {
            stats: [
                'Industry: Arms Manufacturing',
            ],
            results: [
                'Industry: Arms Manufacturing',
            ]
        },
        vylixan_apollo: {
            stats: [
                'Average Disposable Income',
            ],
            results: [
                'Average Disposable Income',
            ]
        },
        vylixan_artemis: {
            stats: [
                'Eco-Friendliness',
            ],
            results: [
                'Eco-Friendliness',
            ]
        },
        vylixan_demeter: {
            stats: [
                'Sector: Agriculture',
            ],
            results: [
                'Sector: Agriculture',
            ]
        },
        vylixan_dionysus: {
            stats: [
                'Authoritarianism',
            ],
            results: [
                'Authoritarianism',
            ]
        },
        vylixan_hades: {
            stats: [
                'Economy (',
                'Income Equality',
                'Wealth Gaps',
                'Economic Freedom',
                'Corruption',
                'Employment',
            ],
            results: [
                'Economy (',
                'Income Equality',
                'Wealth Gaps',
                'Economic Freedom',
                'Corruption',
                'Employment',
            ]
        },
        vylixan_athena: {
            stats: [
                'Public Education',
                'Intelligence',
            ],
            results: [
                'Public Education',
                'Intelligence',
            ]
        }
    };
    
    const locationIsDilemmas = window.location.href.includes('page=dilemmas');
    const locationIsShowDilemma = window.location.href.includes('page=show_dilemma');
    const statsPage = window.location.href.includes('dds');
    const enactDilemma = window.location.href.includes('page=enact_dilemma');
    
    if (locationIsDilemmas && !locationIsShowDilemma) {
        let body = document.getElementById('loggedin');
        let currentNationKey = body.dataset.nname;
        const issues = document.querySelectorAll('ul.dilemmalist > li');
        if (issues.length) {
            issues.forEach(function (issueLi) {
                const issueLink = issueLi.querySelector('a.dillistnpaper');
                const issueID = getIssueID(issueLink.href);
                const link = `http://www.mwq.dds.nl/ns/results/${issueID}.html?nation=${currentNationKey}`;
                issueLi.innerHTML = issueLi.innerHTML + '<div style="text-align:center;margin-bottom:10px;"><a href=" ' + link + ' " style="text-decoration:underline;color: red;"> Issue Result Stats </a></div>';
            });
        }
    } else if (!locationIsDilemmas && locationIsShowDilemma) {
        let body = document.getElementById('loggedin');
        let currentNationKey = body.dataset.nname;
        const dilemma = document.getElementById('dilemma');
        let issueID = getIssueID(window.location.href);
        if (dilemma) {
            let issueLink = document.createElement('div');
            const link = `http://www.mwq.dds.nl/ns/results/${issueID}.html?nation=${currentNationKey}`;
            issueLink.innerHTML = '<div style="text-align:center;margin-bottom:10px;"><a href=" ' + link + ' " style="text-decoration:underline;color: red;"> Issue Result Stats </a></div>';
            dilemma.insertBefore(issueLink, dilemma.firstChild);
        }
    } else if (statsPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const nationKey = urlParams.get('nation');
        if (nationKey && filterConfigs[nationKey]) {
            const nationConfig = filterConfigs[nationKey].stats;
            if (statsPage) {
                let removeLines = [];
                let findCounter = 0;
                document.querySelectorAll('table tbody tr td:nth-child(2) div').forEach(function (div) {
                    
                    let found = false;
                    let color = 'black';
                    for (let key in nationConfig) {
                        if (div.innerText.indexOf(nationConfig[key]) !== -1) {
                            found = true;
                            if (found) {
                                let mean = div.innerText.substring(
                                    div.innerText.lastIndexOf('(') + 1,
                                    div.innerText.lastIndexOf(')')
                                );
                                if ((mean && mean.indexOf('-') !== -1) || (!mean && div.innerText.indexOf('-') !== -1)) {
                                    color = 'red';
                                } else if ((mean && mean.indexOf('+') !== -1) || (!mean && div.innerText.indexOf('+') !== -1)) {
                                    color = 'green';
                                }
                            }
                        }
                    }
                    if (found === false) {
                        div.style.display = 'none';
                        removeLines[findCounter] = true;
                    } else {
                        div.style.color = color;
                        removeLines[findCounter] = false;
                    }
                    findCounter++;
                });
                let removeCounter = 0;
                document.querySelectorAll('table tbody tr td:nth-child(3) div').forEach(function (td) {
                    if (removeLines[removeCounter] === true) {
                        td.style.display = 'none';
                    }
                    removeCounter++;
                });
            }
        }
    } else if (enactDilemma) {
        let body = document.getElementById('loggedin');
        if (body) {
            let currentNationKey = body.dataset.nname;
            const nationConfig = filterConfigs[currentNationKey].results;
            if (filterConfigs[currentNationKey]) {
                window.scrollTo(0, document.body.scrollHeight);
                const buttons = document.getElementById('toggleissuedetail');
                if (buttons && buttons.children.length && buttons.children[1]) {
                    buttons.childNodes[1].click();
                }
                document.querySelectorAll('.wceffects .wc-change').forEach(function (effect) {
                    let span = effect.querySelector('.wc1');
                    let found = false;
                    for (let key in nationConfig) {
                        if (span.innerText.indexOf(nationConfig[key]) !== -1) {
                            found = true;
                        }
                    }
                    if (found === true) {
                        let colour = 'red';
                        if (span.className.includes('wcg')) {
                            colour = 'green';
                        }
                        effect.style.border = '5px solid ' + colour;
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
                issueID = urlPart.substring(urlPart.lastIndexOf('=') + 1);
            }
            
        });
        return issueID;
    }
    
})();
