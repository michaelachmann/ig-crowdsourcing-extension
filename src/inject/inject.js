chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		console.log(window.location.pathname)

	}
	}, 10);
});

fetch(chrome.runtime.getURL('/src/inject/inject.html')).then(r => r.text()).then(html => {
	document.body.insertAdjacentHTML('beforeend', html);
	// not using innerHTML as it would break js event listeners of the page
	// Opens the overlay and Annotator Interface
  })
  .then(() => {

	// Init

	// TODO: Request stories, save them to list
	// TODO: Add Interface for Coding / Annotating the Stories
	// TODO: Push them to server.

	// UI Functions

	// Opening the App UI
	$('#open-overlay').on('click', function() {
		$('#overlay').show()
	})

	// Closes the overlay and Annotator Interface
	$('#close-overlay').on('click', function() {
		$('#overlay').fadeOut()
	})
  });


/* fetch('https://www.instagram.com/graphql/query/?query_hash=d15efd8c0c5b23f0ef71f18bf363c704&only_stories=True').then(r => r.json()).then(result => {
   console.log(result);
   edges = result["data"]["user"]["feed_reels_tray"]["edge_reels_tray_to_reel"]["edges"];

   const userids = [];

   edges.forEach(element => userids.push(element["node"]["id"]));

   console.log(userids);

   fetch("https://www.instagram.com/graphql/query/?query_hash=303a4ae99711322310f25250d988f3b7&reel_ids=" + userids[0] + "&precomposed_overlay=False").then(r => r.json()).then(result => {
	   console.log(result)
   })

}) */
