// ==UserScript==
// @name         Youtube Interface Modification for out Live CHat
// @namespace    Amano_Tools
// @version      0.1
// @description  將聊天室與直播位置切換 For 彈出式聊天室
// @author       Amano
// @match        https://www.youtube.com/live_chat?*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @license      Only Share
// @grant        GM.registerMenuCommand
// ==/UserScript==

(function () {
    GM.registerMenuCommand('表符', Lun_emojiMenuChenge);
})();

function Lun_emojiMenuChenge() {
    document.querySelector('yt-emoji-picker-renderer[floating-emoji-picker]').style.cssText = 'min-height: 400px';
}
Lun_emojiMenuChenge();