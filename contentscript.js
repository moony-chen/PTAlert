function queryAllButtons() {
  return ['state button accept', 'state button reject', 'state button deliver'];
}

function setButtonsStatus(enabled) {
  var style = enabled ? '' : 'pointer-events: none;opacity: 0.4;';
  queryAllButtons().forEach(function(buttonClass) {
    [].forEach.call(document.getElementsByClassName(buttonClass), function(button){
      button.setAttribute("style", style);
    });
  });
}
window.addEventListener('load', function(){
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    setButtonsStatus(changes.mode.newValue === 'full');
  });
});
