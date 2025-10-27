// ==UserScript==
// @name         Youtube Interface Modification
// @namespace    Amano_Tools
// @version      0.6
// @description  將聊天室與直播位置切換
// @author       Amano
// @match        https://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @license      Only Share
// @grant        GM.registerMenuCommand
// ==/UserScript==

(function () {
    GM.registerMenuCommand('呼叫', Amano_createBtnList);
    GM.registerMenuCommand('介面', Amano_loayoutSwitch);
    // GM.registerMenuCommand('表符', Amano_emojiMenuChenge);
})();

function Amano_loayoutSwitch() {
    document.getElementById('columns').style.cssText == '' ? document.getElementById('columns').style.cssText = 'flex-direction: row-reverse;' : document.getElementById('columns').style.cssText = '';
    const btnList = document.getElementById('Amano_btnList').style;
    btnList.left = btnList.left == '' ? '0px' : '';
    btnList.right = btnList.right == '' ? '3rem' : '';
}

function Amano_emojiMenuChenge() {
    const iframe = document.getElementById('chatframe');
    if (iframe.contentDocument) {
        var iframeDocument = iframe.contentDocument;
        var targetElement = iframeDocument.querySelector('yt-emoji-picker-renderer[floating-emoji-picker]');
        targetElement.style.cssText = 'min-height: 400px';
    }
}

function Amano_createBtnList() {
    const btnListSetting = [
        { id: 'Amano_loayoutSwitch', name: '介面', method: Amano_loayoutSwitch, },
        // { id: 'Amano_emojiMenuChenge', name: '表符', method: Amano_emojiMenuChenge, },
    ]
    const iframe = document.getElementById('chat-container')
    if (iframe) {
        if (iframe.querySelector('Amano_btnList') == null) {
            const btnList = document.createElement('span');
            btnList.id = 'Amano_btnList';
            btnList.style.cssText = 'position: absolute; top: 0rem;left: 0;'
            iframe.append(btnList);
            btnListSetting.forEach(b => {
                let btn = document.createElement('button');
                btn.id = b.id;
                btn.innerText = b.name;
                btnList.append(btn);
                btn.addEventListener('click', b.method);
            });
        }
    }
}

const main = function () {
    // Amano_emojiMenuChenge();
    Amano_createBtnList();
}

const injectScript = function (frameWindow) {
    main()
}

const retrieveChatFrameWindow = function () {
    if (window.location.pathname === "/live_chat" || window.location.pathname === "/live_chat_replay") return window;
    for (let i = 0; i < window.frames.length; i++) {
        try {
            if (window.frames[i].location) {
                let pathname = window.frames[i].location.pathname;
                if (pathname === "/live_chat" || pathname === "/live_chat_replay") return frames[i];
            }
        } catch (ex) { }
    }
}

const tryBrowserIndependentExecution = function () {
    let destinationFrameWindow = retrieveChatFrameWindow();
    if (!destinationFrameWindow || !destinationFrameWindow.document || destinationFrameWindow.document.readyState != "complete") {
        setTimeout(tryBrowserIndependentExecution, 1000);
        return;
    }
    if (destinationFrameWindow.channelResolverInitialized) return;
    injectScript(destinationFrameWindow);
    destinationFrameWindow.channelResolverInitialized = true;
}

if (ytInitialPlayerResponse.videoDetails.isLiveContent) {
    console.log('直播')
    tryBrowserIndependentExecution();
} else {
    console.log('正常影片')
}
