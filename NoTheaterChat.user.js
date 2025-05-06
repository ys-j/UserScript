// ==UserScript==
// @name         No Theater Chat
// @namespace    https://github.com/ys-j/UserScript
// @version      0.1
// @description  Hide chat on YouTube Theater mode.
// @author       ys-j
// @match        *://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.addEventListener('yt-set-theater-mode-enabled', onTheaterModeSwitch, { passive: true });
    document.addEventListener('yt-chat-collapsed-changed', e => {
        const flexy = document.querySelector('ytd-watch-flexy');
        if (flexy) {
            const detail = { enabled: flexy.hasAttribute('theater') };
            onTheaterModeSwitch({ detail, target: flexy });
        }
    }, { passive: true });
})();

function onTheaterModeSwitch(e) {
    const { enabled } = e.detail;
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) chatContainer.style.display = enabled ? 'none' : '';
    if (enabled) e.target.removeAttribute('fixed-panels');
}
