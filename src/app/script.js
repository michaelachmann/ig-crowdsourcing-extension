chrome.tabs.query({url: "https://www.instagram.com/*"}, results => {
    chrome.tabs.sendMessage(results[0].id, {type: 'userIds'}, function(response) {
        console.log(response)
        })
    })
    
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log(sender.tab ?
                      "from a content script:" + sender.tab.url :
                      "from the extension" + sender);
          if (request.greeting === "hello")
            sendResponse({farewell: "goodbye"});
        }
      );   

