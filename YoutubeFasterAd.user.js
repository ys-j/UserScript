// ==UserScript==
// @name         YouTube Faster Ad
// @namespace    http://tampermonkey.net/
// @version      2024-04-21
// @description  try to take over the world!
// @author       ys-j
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const RATE = 16, INTERVAL = 500;
    const observer = new MutationObserver(records => {
        for (const record of records) {
            const video = record.target.querySelector('video');
            if (video && record.type === 'attributes' && record.attributeName === 'class') {
                const isAd = ['ad-showing', 'ad-interrupting'].map(v => record.target.classList.contains(v)).includes(true);
                video.playbackRate = isAd ? RATE : 1;
                if (isAd) {
                    const button = record.target.querySelector('.ytp-ad-skip-button-container > button');
                    if (button) button.click();
                }
            }
        }
    });
    main();
    function main() {
        const player = document.getElementById('movie_player');
        if (player) {
            observer.observe(player, { attributes: true });
        } else {
            setTimeout(main, INTERVAL);
        }
    }
})();
