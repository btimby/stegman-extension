chrome.runtime.onMessage.addListener((msg, sender) => {
    if ((msg.from === 'content') && msg.subject === 'openPageAction') {
        chrome.pageAction.show(sender.tab.id);
    }
});