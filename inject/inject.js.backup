// Init API
const appwrite = new Appwrite();

appwrite
	.setEndpoint('http://api.digitalhumanities.io/v1') // Your Appwrite Endpoint
	.setProject('61f913c8612abf254673') // Your project ID
;


// Fetching HTML, 
fetch(chrome.runtime.getURL('/src/inject/inject.html')).then(r => r.text()).then(html => {
	document.body.insertAdjacentHTML('beforeend', html);
	// not using innerHTML as it would break js event listeners of the page
	// Opens the overlay and Annotator Interface
  })
  .then(() => {

		// Opening the App UI
		$('#open-overlay').on('click', function() {
			annoApp.render()
			$('#overlay').fadeIn()
			window.open(chrome.extension.getURL('/src/app/index.html'))
		})
	
		// Closes the overlay and Annotator Interface
		$('#close-overlay').on('click', function() {
			$('#overlay').fadeOut()
		})

	  	// Initializing Reef-App
		// Init
		let userIds = []
		let currentState = 0
		//const validationIds = []	// List of predefined IDs for Stories each user has to annotate in order to verify interrater reliability
		let currentStories = null
		let currentOwner = null
		let annoApp = null

			annoApp = new Reef('#annotator-app', {
				data: {
					userIds: [],
					currentState: 0,
					//const validationIds = []	// List of predefined IDs for Stories each user has to annotate in order to verify interrater reliability
					currentStories: [],
					currentStory: 0,
					currentOwner: {},
					log: ""
				},
				template: function (props) {
					return `
					<div class="flex m-5 flex-row place-content-center justify-center align-middle">
					<div class="basis-3/4">
						
					<a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Story Kodieren</a>
					<p class="mt-2 text-slate-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>

					<a href="#">Weiter</a>

					</div>
					<div class="basis-1/4 justify-center">
						<div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">@${props.currentStories[props.currentStory]['owner']['username']}</div>
						<img class="w-full max-h-full" src="${props.currentStories[props.currentStory]['display_url']}" alt="Man looking at item at a store">
					</div>
					`;
				}
			});	


async function getUserIds() {
	await fetch('https://www.instagram.com/graphql/query/?query_hash=d15efd8c0c5b23f0ef71f18bf363c704&only_stories=True')
			.then(r => r.json())
			.then(result => {
				let edges = result["data"]["user"]["feed_reels_tray"]["edge_reels_tray_to_reel"]["edges"]
				edges.forEach(element => annoApp.data.userIds.push(element["node"]["id"]))
				annoApp.data.currentState = 0
			})
			.catch(e => console.error("Error in getUserIds: " + e))
}

async function getStories(userId=null) {
	console.log(userId)
	if(userId != null){
		await fetch("https://www.instagram.com/graphql/query/?query_hash=303a4ae99711322310f25250d988f3b7&reel_ids=" + userId + "&precomposed_overlay=False")
			.then(r => r.json())
			.then(result => {
				annoApp.data.currentStories = null
				annoApp.data.currentOwner = null

				annoApp.data.currentStory = 0
				annoApp.data.currentOwner = result['data']['reels_media'][0]['owner']
				let stories = []
				result['data']['reels_media'][0]['items'].forEach(element => stories.push(element))
				annoApp.data.currentStories = stories
			})
			.then(() => {
				appwrite.account.get()
				.catch(e => {
					console.error(e)
					appwrite.account.createAnonymousSession()
				})
				.then(() => {
					appwrite.database.createDocument('61f91407e6be2fb18ab1', 'unique()', {
					typename: annoApp.data.currentStories[0]['__typename'],
					taken_at_timestamp:  annoApp.data.currentStories[0]['taken_at_timestamp'],
					expiring_at_timestamp:  annoApp.data.currentStories[0]['expiring_at_timestamp']
				});
			})

			})
			.catch(e => console.error("Error in getStories: " + e))
		} else {
			throw "getStories: userId missing!"
		}	 
	}

	getUserIds()
		.then(() => getStories(annoApp.data.userIds[0]))
		.catch(e => console.error("Error retrieving Stories: " + e))


	// TODO: Request stories, save them to list
	// TODO: Add Interface for Coding / Annotating the Stories
	// TODO: Push them to server.

	// Requests


	// UI Functions


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

chrome.runtime.onMessage.addListener(
    function(request) {
      fetch(chrome.runtime.getURL(request.url))
	  	.then(r => r.text())
		.then(r => {
		chrome.extension.sendMessage({content: r})
	  })
    }
  );