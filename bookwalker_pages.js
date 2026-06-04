// ==UserScript==
// @name         bookwalker pages
// @namespace    bookwalker
// @version      1.0
// @description  顯示產品頁數
// @author       Amano
// @match        https://www.bookwalker.com.tw/product/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bookwalker.com.tw
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const dataPage = JSON.parse(document.getElementById('app').getAttribute('data-page'));
    let pages = dataPage.props.productData.product_detail_info.pages
    const list = document.querySelector('.product-basic-info-list');
    const itemDom = `
        <li class="product-basic-info-item">
            <span class="product-basic-info-item-title">頁數 ${pages}</span>
        </li>
    `;
    const item = document.createElement('template');
    item.innerHTML = itemDom.trim();
    domElement = item.content.firstElementChild;
    list.appendChild(domElement);
})();