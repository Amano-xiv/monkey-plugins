function toggleLayout() {
    const columns = document.getElementById('columns');
    const primary = document.getElementById('primary');
    const secondary = document.querySelector('#secondary.ytd-watch-flexy');
    const btnList = document.getElementById('Amano_btnList');

    if (!columns || !secondary || !btnList || !primary) return;

    columns.classList.toggle('amano-reverse');
    primary.classList.toggle('amano-reverse');
    secondary.classList.toggle('amano-reverse-secondary');
    btnList.classList.toggle('amano-btn-reverse');
}

const btnListSetting = [
    { id: 'Amano_loayoutSwitch', name: '介面', method: toggleLayout },
];

function createBtnList() {
    if (typeof ytInitialPlayerResponse === 'undefined') return;

    const target = ytInitialPlayerResponse.videoDetails?.isLiveContent
        ? document.querySelector('#chat-container')
        : document.querySelector('#related.style-scope.ytd-watch-flexy');

    if (!target || target.querySelector('#Amano_btnList')) return;

    const btnList = document.createElement('span');
    btnList.id = 'Amano_btnList';
    btnList.className = 'amano-btnlist';
    target.append(btnList);

    btnListSetting.forEach(({ id, name, method }) => {
        const btn = document.createElement('button');
        btn.id = id;
        btn.textContent = name;
        btn.addEventListener('click', method);
        btnList.append(btn);
    });
}

function removeWaitList() {
    if (location.href.includes('list=WL') && !location.href.includes('playlist?list=WL')) {
        const url = location.href
            .split('&')
            .filter(item => item !== 'list=WL' && !item.startsWith('index='))
            .join('&');
        // const url = location.href.replace(/^([^?]+)((\?|&)(v=[^&]+)(&.*)?)/,"$1?$4");
        location.replace(url);
    }
}

if (!document.getElementById('amano-style')) {
    const style = document.createElement('style');
    style.id = 'amano-style';
    style.textContent = `
        #columns.amano-reverse { flex-direction: row-reverse; }
        #primary.amano-reverse {margin-left: 0rem !important;}
        #secondary.amano-reverse-secondary { padding-left: var(--ytd-margin-6x); padding-right: 0; }
        #Amano_btnList.amano-btn-reverse { left: initial; right: 3rem; }
        .amano-btnlist { position: absolute; top: 0; left: 0; }
    `;
    document.head.appendChild(style);
}

const observer = new MutationObserver(() => createBtnList());
observer.observe(document.body, { childList: true, subtree: true });

removeWaitList();
createBtnList();