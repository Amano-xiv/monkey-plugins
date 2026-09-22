// ==UserScript==
// @name         Twitter Image Inline Download Button
// @namespace    Amano_Tools
// @version      1.0
// @description  在 Twitter 貼文圖片上加一個浮動下載按鈕，下載 PNG + large 圖片
// @author       Amano
// @match        https://twitter.com/*
// @match        https://x.com/*
// @match        https://pbs.twimg.com/media/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const BUTTON_CLASS = 'twitter-img-download-button';
    const imgSettings = {
        nameBlock: null,
        handle: 'unknown'
    }

    const observer = new MutationObserver(() => {
        addButtonsToImages();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    function addButtonsToImages() {
        const images = document.querySelectorAll('img');
        imgSettings.nameBlock = document.querySelector('div[data-testid="User-Name"]') || document.querySelector('div[data-testid="UserName"]');

        if (imgSettings.nameBlock) {
            const spans = imgSettings.nameBlock.querySelectorAll('span');
            for (const s of spans) {
                if (s.textContent.startsWith('@')) {
                    imgSettings.handle = s.textContent.replace('@', '');
                    break;
                }
            }
        }

        for (const img of images) {
            if (!img.src.includes('pbs.twimg.com/media/')) continue;
            if (img.closest('div[data-shadow-host]')) continue;
            if (img.dataset.hasDownloadButton) continue;

            img.dataset.hasDownloadButton = true;

            const host = document.createElement('div');
            host.setAttribute('data-shadow-host', '1');
            host.style.position = 'absolute';
            host.style.top = '5px';
            host.style.right = '5px';
            host.style.zIndex = '9999';
            host.style.pointerEvents = 'none';

            const shadow = host.attachShadow({ mode: 'open' });

            const style = document.createElement('style');
            style.textContent = `
                button {
                    background: rgba(0,0,0,0.6);
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 2px 6px;
                    font-size: 12px;
                    cursor: pointer;
                    pointer-events: auto;
                }
                button:hover {
                    background: rgba(0,0,0,0.85);
                }
            `;

            const btn = document.createElement('button');
            btn.textContent = '下載';
            btn.className = BUTTON_CLASS;
            btn.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                downloadImageBlob(img.src, img);
            };

            shadow.appendChild(style);
            shadow.appendChild(btn);

            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';

            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
            wrapper.appendChild(host);
        }
    }

    async function downloadImageBlob(src) {
        const finalUrl = new URL(src);
        finalUrl.searchParams.set('format', 'png');
        finalUrl.searchParams.set('name', '4096x4096');
        let filename = finalUrl.pathname.split('/').pop();
        filename = `${imgSettings.handle}_${filename}`;
        const response = await fetch(finalUrl.href);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const changeMedia = () => {
        const format = 'png'
        const name = '4096x4096'
        if (location.href.includes('pbs.twimg.com/media') && location.href.includes('format=jpg')) {
            const href = location.href;
            const url = `${href.split('?')[0]}?format=${format}&name=${name}`
            location.replace(url);
        }
    }

    changeMedia();
})();
