console.log("Test!")
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension" + sender);
      if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
    }
  );

  chrome.runtime.sendMessage({url: '/src/inject/inject.html'}, function(response) {
    console.log(response);
})