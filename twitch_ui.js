// ==UserScript==
// @name         New Userscript
// @namespace    Amano_Tools
// @version      1.1
// @description  
// @author       Amano
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// @grant        GM.registerMenuCommand
// ==/UserScript==

(function () {
    'use strict';

    let isHidden = false;

    function amano_changeUI() {
        const nav = document.querySelector('div[data-test-selector="side-nav"]');
        if (!nav) {
            console.warn('找不到側邊選單元素');
            return;
        }

        isHidden = !isHidden;
        nav.classList.toggle('amano-hidden', isHidden);
    }

    const style = document.createElement('style');
    style.textContent = `
        .amano-hidden {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    if (typeof GM !== 'undefined' && GM.registerMenuCommand) {
        GM.registerMenuCommand('切換隱藏選單', amano_changeUI);
    } else {
        console.warn('GM.registerMenuCommand 不可用');
    }
})();