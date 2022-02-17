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
				console.log(blob)
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
				console.log(userIds)
				sendResponse(userIds)
			}) 
			
/* 			let userIds = []
			let result = {"data":{"user":{"feed_reels_tray":{"edge_reels_tray_to_reel":{"edges":[{"node":{"id":"2127438079","can_reply":true,"expiring_at":1645091207,"latest_reel_media":1645004807,"muted":false,"prefetch_count":3,"ranked_position":1,"seen":null,"seen_ranked_position":1,"user":{"id":"2127438079","profile_pic_url":"https://scontent-frt3-1.cdninstagram.com/v/t51.2885-19/s150x150/209570133_648060089924395_4086155218884088209_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com\u0026_nc_cat=107\u0026_nc_ohc=iW2SFHODkIAAX9VOZDW\u0026edm=APrQDZQBAAAA\u0026ccb=7-4\u0026oh=00_AT81cFllncaNffPd115XQ3DMGPXfjOHp7hDF1MJHzQBwug\u0026oe=621444C5\u0026_nc_sid=6e5aa5","username":"fdp"}}},{"node":{"id":"50513856245","can_reply":true,"expiring_at":1645120428,"latest_reel_media":1645034031,"muted":false,"prefetch_count":3,"ranked_position":2,"seen":null,"seen_ranked_position":2,"user":{"id":"50513856245","profile_pic_url":"https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/265278874_1502606796779922_5323857415616652674_n.jpg?stp=dst-jpg_s150x150\u0026_nc_ht=scontent-frx5-1.cdninstagram.com\u0026_nc_cat=1\u0026_nc_ohc=WTnfxgurvzcAX_V7dxK\u0026edm=APrQDZQBAAAA\u0026ccb=7-4\u0026oh=00_AT9VMreSpclV8fH-_qdqbcwPtIIYd4oM7gB9du5_cll55g\u0026oe=6215AA97\u0026_nc_sid=6e5aa5","username":"bundeskanzler"}}},{"node":{"id":"1558377791","can_reply":true,"expiring_at":1645175951,"latest_reel_media":1645082100,"muted":false,"prefetch_count":0,"ranked_position":3,"seen":null,"seen_ranked_position":3,"user":{"id":"1558377791","profile_pic_url":"https://scontent-frt3-1.cdninstagram.com/v/t51.2885-19/s150x150/148615951_713644982659036_8728539854447901071_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com\u0026_nc_cat=104\u0026_nc_ohc=bR8CK2te8IQAX8JFiNT\u0026edm=APrQDZQBAAAA\u0026ccb=7-4\u0026oh=00_AT9dYCjsJdOn2VnWSgmFj4-KqsfY2PiCHelXxl2CtaLePA\u0026oe=62150C05\u0026_nc_sid=6e5aa5","username":"cdu"}}},{"node":{"id":"1484534097","can_reply":true,"expiring_at":1645175951,"latest_reel_media":1645039555,"muted":false,"prefetch_count":0,"ranked_position":4,"seen":null,"seen_ranked_position":4,"user":{"id":"1484534097","profile_pic_url":"https://scontent-frt3-1.cdninstagram.com/v/t51.2885-19/s150x150/75392900_729511987544694_1394569898121756672_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com\u0026_nc_cat=106\u0026_nc_ohc=yYlCVSOTcLcAX_HGvYd\u0026tn=mbZAwCpXjDw3Mq0v\u0026edm=APrQDZQBAAAA\u0026ccb=7-4\u0026oh=00_AT-ez7Q47h-o9qescfqGM2Gfh2DtdWA5uATxMuXoWHspgg\u0026oe=6214B0BD\u0026_nc_sid=6e5aa5","username":"afd.bund"}}},{"node":{"id":"211179","can_reply":true,"expiring_at":1645175951,"latest_reel_media":1645011063,"muted":false,"prefetch_count":0,"ranked_position":5,"seen":null,"seen_ranked_position":5,"user":{"id":"211179","profile_pic_url":"https://scontent-frt3-1.cdninstagram.com/v/t51.2885-19/s150x150/243784683_1256563118130198_457251837148671864_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com\u0026_nc_cat=106\u0026_nc_ohc=yvmNFKLkh7cAX9pq31J\u0026edm=APrQDZQBAAAA\u0026ccb=7-4\u0026oh=00_AT9A-NAvxBeFznwUDbCvRqz1z7u3_aUADitlgdOUloNr3A\u0026oe=62151EB7\u0026_nc_sid=6e5aa5","username":"spdde"}}},{"node":{"id":"537777060","can_reply":true,"expiring_at":1645175951,"latest_reel_media":1645085867,"muted":false,"prefetch_count":0,"ranked_position":6,"seen":null,"seen_ranked_position":6,"user":{"id":"537777060","profile_pic_url":"https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/205418712_493193541781504_6229182430385621998_n.jpg?stp=dst-jpg_s150x150\u0026_nc_ht=scontent-frx5-1.cdninstagram.com\u0026_nc_cat=1\u0026_nc_ohc=bOvziqOXYxEAX852vW4\u0026edm=APrQDZQBAAAA\u0026ccb=7-4\u0026oh=00_AT_ai8N6HwWxWUdx1JLYju-B75X0HM30C9z9Mk6xVGF5rg\u0026oe=6214EF38\u0026_nc_sid=6e5aa5","username":"dielinke"}}},{"node":{"id":"1573431041","can_reply":true,"expiring_at":1645175951,"latest_reel_media":1645082455,"muted":false,"prefetch_count":0,"ranked_position":7,"seen":null,"seen_ranked_position":7,"user":{"id":"1573431041","profile_pic_url":"https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/270262437_718253402485836_1137903027527013241_n.jpg?stp=dst-jpg_s150x150\u0026_nc_ht=scontent-frx5-1.cdninstagram.com\u0026_nc_cat=100\u0026_nc_ohc=PYjfXGnxmloAX_OfCGV\u0026edm=APrQDZQBAAAA\u0026ccb=7-4\u0026oh=00_AT8d8QsmPeM77iila3FVO7GFez-NrnFRmoWOwjh4G9sAYw\u0026oe=62144D0E\u0026_nc_sid=6e5aa5","username":"csu"}}}]}}}},"status":"ok"}
			let edges = result["data"]["user"]["feed_reels_tray"]["edge_reels_tray_to_reel"]["edges"]
			edges.forEach(element => userIds.push(element["node"]["id"]))
			sendResponse(userIds)   */
		}
	if (request.type === "userStories") {
		
		 fetch("https://www.instagram.com/graphql/query/?query_hash=303a4ae99711322310f25250d988f3b7&reel_ids=" + request.userId + "&precomposed_overlay=False")
			.then(r => r.json())
			.then(result => {
				let stories = []
				result['data']['reels_media'][0]['items'].forEach(element => stories.push(element))
				console.log(stories)
				sendResponse(stories)
			}) 
		
		
		// Sending Fake Data for Developement
		// let stories = []
		// let result = {"data":{"reels_media":[{"__typename":"GraphReel","id":"2127438079","latest_reel_media":1645004807,"can_reply":true,"owner":{"__typename":"GraphUser","id":"2127438079","profile_pic_url":"https://scontent-frt3-1.cdninstagram.com/v/t51.2885-19/s150x150/209570133_648060089924395_4086155218884088209_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com\u0026_nc_cat=107\u0026_nc_ohc=iW2SFHODkIAAX9VOZDW\u0026edm=AHlfZHwBAAAA\u0026ccb=7-4\u0026oh=00_AT-4yCQai8D9A1lVH7XS1bSC3u2_QZd0Tg3JOvsLoMf2PQ\u0026oe=621444C5\u0026_nc_sid=21929d","username":"fdp","followed_by_viewer":true,"requested_by_viewer":false},"can_reshare":true,"expiring_at":1645091207,"has_besties_media":null,"has_pride_media":false,"seen":null,"user":{"id":"2127438079","profile_pic_url":"https://scontent-frt3-1.cdninstagram.com/v/t51.2885-19/s150x150/209570133_648060089924395_4086155218884088209_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com\u0026_nc_cat=107\u0026_nc_ohc=iW2SFHODkIAAX9VOZDW\u0026edm=AHlfZHwBAAAA\u0026ccb=7-4\u0026oh=00_AT-4yCQai8D9A1lVH7XS1bSC3u2_QZd0Tg3JOvsLoMf2PQ\u0026oe=621444C5\u0026_nc_sid=21929d","username":"fdp","followed_by_viewer":true,"requested_by_viewer":false},"items":[{"audience":"MediaAudience.DEFAULT","__typename":"GraphStoryImage","id":"2774823923839598747","dimensions":{"height":1920,"width":1080},"display_resources":[{"src":"https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/273992612_1122474135253985_5110351909444440916_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com\u0026_nc_cat=105\u0026_nc_ohc=7mSyWgmaKhIAX8Nnbcq\u0026edm=AHlfZHwBAAAA\u0026ccb=7-4\u0026oh=00_AT8EYUJlwmD2D2GtEODnLwKbPId7MvyeQy31BDKQNADj5g\u0026oe=62102EDA\u0026_nc_sid=21929d","config_width":640,"config_height":1137},{"src":"https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/273992612_1122474135253985_5110351909444440916_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com\u0026_nc_cat=105\u0026_nc_ohc=7mSyWgmaKhIAX8Nnbcq\u0026edm=AHlfZHwBAAAA\u0026ccb=7-4\u0026oh=00_AT9Bybq-M_deoInacUbbqIyhdXN3a3_91y5--GkgVRAM3g\u0026oe=621025E1\u0026_nc_sid=21929d","config_width":750,"config_height":1333},{"src":"https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/273992612_1122474135253985_5110351909444440916_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com\u0026_nc_cat=105\u0026_nc_ohc=7mSyWgmaKhIAX8Nnbcq\u0026edm=AHlfZHwBAAAA\u0026ccb=7-4\u0026oh=00_AT8HPy9pECcy4FQb-MPe-G-nr7NZo93qodisMKfEN46Csg\u0026oe=62108F42\u0026_nc_sid=21929d","config_width":1080,"config_height":1920}],"display_url":"https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/273992612_1122474135253985_5110351909444440916_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com\u0026_nc_cat=105\u0026_nc_ohc=7mSyWgmaKhIAX8Nnbcq\u0026edm=AHlfZHwBAAAA\u0026ccb=7-4\u0026oh=00_AT8HPy9pECcy4FQb-MPe-G-nr7NZo93qodisMKfEN46Csg\u0026oe=62108F42\u0026_nc_sid=21929d","media_preview":"ABgqqBGPIBNL5beh/KpIkY8hcj6ZqXyyf4T/AN8im52dtP6+Z7Lmk7XRVKMBkggUVLJG+N20hRxnGKK0i7q/5FJ3V00/Qt25/dD6n+nuKuROq5JYc84/yTVayfEeB2Y/0q2Cx6fyrx6z96S6XfXz9GcEnq15v8yO+5hP4fzoqG9jO0uSccDb+P5e/TrRXfhv4a1vq/8Ahjpo/C7d/wBEZyOQuNxX2Gf6EVJ5zf8APRv8/jVait3BPX9F/kackXrZfcv8iV5WI27iw9//AK9FRUVSSWi/r7iklHRH/9k=","gating_info":null,"fact_check_overall_rating":null,"fact_check_information":null,"sharing_friction_info":{"should_have_sharing_friction":false,"bloks_app_url":null},"media_overlay_info":null,"sensitivity_friction_info":null,"taken_at_timestamp":1645004807,"expiring_at_timestamp":1645091207,"story_cta_url":null,"story_view_count":null,"is_video":false,"owner":{"id":"2127438079","profile_pic_url":"https://scontent-frt3-1.cdninstagram.com/v/t51.2885-19/s150x150/209570133_648060089924395_4086155218884088209_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com\u0026_nc_cat=107\u0026_nc_ohc=iW2SFHODkIAAX9VOZDW\u0026edm=AHlfZHwBAAAA\u0026ccb=7-4\u0026oh=00_AT-4yCQai8D9A1lVH7XS1bSC3u2_QZd0Tg3JOvsLoMf2PQ\u0026oe=621444C5\u0026_nc_sid=21929d","username":"fdp","followed_by_viewer":true,"requested_by_viewer":false},"tracking_token":"eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiZGE1ZTBjZWRjNTMwNDczMmJkMGM5YzIxYjRiNmU1ZjEyNzc0ODIzOTIzODM5NTk4NzQ3Iiwic2VydmVyX3Rva2VuIjoiMTY0NTA4OTU1MTM3N3wyNzc0ODIzOTIzODM5NTk4NzQ3fDUxNzIxMzgxNjc4fDk0ZWRiN2Y4YTRiOGRlNzU2MzNhZGY0ZDY5OGY0NmUzM2I0MjZlNzA3ZjIyYThiYWVlNzI1ZmI3NzZiMTI4M2QifSwic2lnbmF0dXJlIjoiIn0=","tappable_objects":[{"__typename":"GraphTappableFeedMedia","x":0.5,"y":0.575104546366473,"width":0.8240024062535851,"height":0.574944301904397,"rotation":0.0,"custom_title":null,"attribution":null,"media":{"id":"2774222413896261779","shortcode":"CaABJZENqCT"}}],"story_app_attribution":null,"edge_media_to_sponsor_user":{"edges":[]},"muting_info":null}]}]},"status":"ok"}
		// result['data']['reels_media'][0]['items'].forEach(element => stories.push(element))
		// console.log(stories)
		// sendResponse(stories)

	}

	if (request.type === "appwrite.createDocument") {
		appwrite.database.createDocument(request.collection, 'unique()', request.payload);
		console.log(request.payload)
	}
	
	return true;
	})