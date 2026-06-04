// ==UserScript==
// @name         bookwalker pages
// @namespace    bookwalker
// @version      1.1
// @description  顯示產品頁數
// @author       Amano
// @match        https://www.bookwalker.com.tw/product/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bookwalker.com.tw
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const ITEM_ID = 'amano-bookwalker-pages';

    function getPages() {
        const app = document.getElementById('app');
        if (!app) return null;

        const rawData = app.getAttribute('data-page');
        if (!rawData) return null;

        try {
            const dataPage = JSON.parse(rawData);
            return dataPage?.props?.productData?.product_detail_info?.pages ?? null;
        } catch {
            return null;
        }
    }

    function insertPages() {
        if (document.getElementById(ITEM_ID)) return true;

        const list = document.querySelector('.product-basic-info-list');
        const pages = getPages();

        if (!list || !pages) return false;

        const li = document.createElement('li');
        li.id = ITEM_ID;
        li.className = 'product-basic-info-item';

        const span = document.createElement('span');
        span.className = 'product-basic-info-item-title';
        span.textContent = `頁數 ${pages}`;

        li.appendChild(span);
        list.appendChild(li);

        return true;
    }

    window.addEventListener('load', () => {
        if (insertPages()) return;

        const observer = new MutationObserver(() => {
            if (insertPages()) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
})();