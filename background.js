'use strict';

chrome.runtime.onInstalled.addListener(function() {

  // chrome.storage.sync.get(['mode'], function(result) {
  //   result.mode
  // })

  chrome.pageAction.onClicked.addListener(function() {
    chrome.storage.sync.get(['mode'], function(result) {
      let mode = result.mode || 'developer'
      if(mode === 'developer') {
        chrome.storage.sync.set({mode: 'full'}, function() {
            console.log("The mode is set to full.");
        })
      } else {
        chrome.storage.sync.set({mode: 'developer'}, function() {
            console.log("The mode is set to developer.");
        })
      }

    });
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'www.pivotaltracker.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });

});
