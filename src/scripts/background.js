import browser from 'webextension-polyfill';

// eslint-disable-next-line
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.from === 'content' && request.subject === 'showPageAction') {
    // TODO: open popup.
    console.log('loading popup')
    //browser.pageAction.show(sender.tab.id);
  }
})
