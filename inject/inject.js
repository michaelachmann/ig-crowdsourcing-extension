// Init API
const appwrite = new Appwrite();

appwrite
	.setEndpoint('http://api.digitalhumanities.io/v1') // Your Appwrite Endpoint
	.setProject('61f913c8612abf254673') // Your project ID
;

// Request anonymous user
appwrite.account.get()
	.catch(e => {
		console.error(e)
		appwrite.account.createAnonymousSession()
	})

// Inject HTML 
// Injects a button into the instagram website 
fetch(chrome.runtime.getURL('inject/inject.html')).then(r => r.text()).then(html => {
	document.body.insertAdjacentHTML('beforeend', html);
	// not using innerHTML as it would break js event listeners of the page
	// Opens the overlay and Annotator Interface
  })
  .then(() => {
	// Opening the App UI
	$('#open-overlay').on('click', function() {
		window.open(chrome.extension.getURL('app/index.html'))
	})
  })

// Messaging
// Listens to messages by extension-windows. Messages are used to request pages from API
// and Instagram.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "image") {
		fetch(request.url)
			.then(r => r.blob())
			.then(blob => {
				sendResponse(URL.createObjectURL(blob))
			})
	}

	if (request.type === "userIds") {
 		fetch('https://www.instagram.com/graphql/query/?query_hash=d15efd8c0c5b23f0ef71f18bf363c704&only_stories=True')
			.then(r => r.json())
			.then(result => {
				let userIds = []
				let edges = result["data"]["user"]["feed_reels_tray"]["edge_reels_tray_to_reel"]["edges"]
				edges.forEach(element => userIds.push(element["node"]["id"]))
				sendResponse(userIds)
			}) 

		}
	if (request.type === "userStories") {
		
		 fetch("https://www.instagram.com/graphql/query/?query_hash=303a4ae99711322310f25250d988f3b7&reel_ids=" + request.userId + "&precomposed_overlay=False")
			.then(r => r.json())
			.then(result => {
				let stories = []
				result['data']['reels_media'][0]['items'].forEach(element => stories.push(element))
				sendResponse(stories)
			}) 
	}

	if (request.type === "appwrite.createDocument") {
		appwrite.database.createDocument(request.collection, 'unique()', request.payload);
	}
	
	return true;
	})