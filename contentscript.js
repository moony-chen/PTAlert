function queryAllButtons() {
  return ['state button accept', 'state button reject', 'state button deliver'];
}

function setButtonsStatus(enabled) {
  var style = enabled ? '' : 'pointer-events: none; opacity: 0.4;';
  queryAllButtons().forEach(function(buttonClass) {
    [].forEach.call(document.getElementsByClassName(buttonClass), function(button){
      button.setAttribute("style", style);
    });
  });
}

let observer = new MutationObserver(function() {
  setButtonsStatus(false)
});

function setup() {
  function init(fullAccess) {
    setButtonsStatus(fullAccess)
    if (!fullAccess) {
      observer.observe(document, { attributes: false, childList: true, subtree: true });
    } else {
      observer.disconnect()
    }
  }

  chrome.storage.sync.get(['mode'], function(result) {
    let mode = result.mode || 'developer'
    // setTimeout(function(){ setButtonsStatus(mode === 'full') })
    init(mode === 'full')
  })
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    let fullAccess = changes.mode.newValue === 'full'
    init(fullAccess);
  });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
} else {  // `DOMContentLoaded` already fired
    setup();
}
