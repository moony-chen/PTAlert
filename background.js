'use strict';

chrome.runtime.onInstalled.addListener(function() {

  chrome.pageAction.onClicked.addListener(function() {
    chrome.storage.sync.get(['mode'], function(result) {
      let mode = result.mode || 'developer'
      if(mode === 'developer') {
        chrome.storage.sync.set({mode: 'full'}, function() {

        })
      } else {
        chrome.storage.sync.set({mode: 'developer'}, function() {

        })
      }

    });
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'www.pivotaltracker.com' },
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });

});
