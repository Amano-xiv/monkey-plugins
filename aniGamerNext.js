// ==UserScript==
// @name         巴哈動畫瘋下一集
// @namespace    Amano_Tools
// @version      1.1
// @description  自動在播放器加入「下一集」按鈕
// @author       Amano
// @match        https://ani.gamer.com.tw/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamer.com.tw
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const addNextButton = () => {
        if (document.getElementById('autoNextEpisode')) return;

        const nextEpisode = document.getElementById('nextEpisode');
        const ctrlBar = document.querySelector('.control-bar-leftbtn');
        if (!nextEpisode || !ctrlBar) return;

        const nextBtn = document.createElement('a');
        nextBtn.id = 'autoNextEpisode';
        nextBtn.classList.add('vjs-next-button', 'vjs-control', 'vjs-show-tip');
        nextBtn.role = 'button';
        nextBtn.title = '自動下一集';
        nextBtn.addEventListener('click', () => nextEpisode.click());

        ctrlBar.appendChild(nextBtn);
    };

    const observer = new MutationObserver(() => addNextButton());
    observer.observe(document.body, { childList: true, subtree: true });

    addNextButton();
})();
