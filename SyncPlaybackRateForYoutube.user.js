// ==UserScript==
// @name         Sync playback rate for YouTube
// @namespace    https://github.com/ys-j/UserScript
// @version      2025-10-30
// @description  Sync playback rate of video with YouTube config.
// @author       ys-j
// @match        *://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const video = document.querySelector('video');
    video.addEventListener('ratechange', () => {
        sessionStorage.setItem('yt-player-playback-rate', JSON.stringify({
            data: video.playbackRate.toString(),
            creation: Date.now(),
        }));
    }, { passive: true });
})();
