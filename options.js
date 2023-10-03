document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['ytViewPort'], function(result) {
    const portNumber = result.ytViewPort || '';
    document.getElementById('portInput').value = portNumber;
  });

  document.getElementById('saveButton').addEventListener('click', function() {
    var portNumber = document.getElementById('portInput').value;
    chrome.storage.sync.set({ 'ytViewPort': portNumber }, function() {
    });
  });
});
