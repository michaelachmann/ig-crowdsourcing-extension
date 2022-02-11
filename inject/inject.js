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
		// fetch('https://www.instagram.com/graphql/query/?query_hash=d15efd8c0c5b23f0ef71f18bf363c704&only_stories=True')
		// 	.then(r => r.json())
		// 	.then(result => {
		// 		let userIds = []
		// 		let edges = result["data"]["user"]["feed_reels_tray"]["edge_reels_tray_to_reel"]["edges"]
		// 		edges.forEach(element => userIds.push(element["node"]["id"]))
		// 		console.log(userIds)
		// 		sendResponse(userIds)
		// 	})
		sendResponse({})
	}

	if (request.type === "userStories") {
		// fetch("https://www.instagram.com/graphql/query/?query_hash=303a4ae99711322310f25250d988f3b7&reel_ids=" + request.userId + "&precomposed_overlay=False")
		// 	.then(r => r.json())
		// 	.then(result => {
		// 		let stories = []
		// 		result['data']['reels_media'][0]['items'].forEach(element => stories.push(element))
		// 		console.log(stories)
		// 		sendResponse(stories)
		// 	})
		
		// Sending Fake Data for Developement
		sendResponse([
			{
				"audience": "MediaAudience.DEFAULT",
				"__typename": "GraphStoryImage",
				"id": "2770765457985688229",
				"dimensions": {
					"height": 1920,
					"width": 1080
				},
				"display_resources": [
					{
						"src": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/273616112_522333825852419_1532046777282632362_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=111&_nc_ohc=AQHdgMgsacUAX8G23wa&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT8sqKBSz8BaWcsOWMKfv17_wJUtK2mPS464BtLvKTw_sg&oe=620903AC&_nc_sid=21929d",
						"config_width": 640,
						"config_height": 1137
					},
					{
						"src": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/273616112_522333825852419_1532046777282632362_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=111&_nc_ohc=AQHdgMgsacUAX8G23wa&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT-nRXBsBuryglOQdVql-5ShW4PP8r6IHr5nihlyzlngKg&oe=620878B0&_nc_sid=21929d",
						"config_width": 750,
						"config_height": 1333
					},
					{
						"src": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/273616112_522333825852419_1532046777282632362_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=111&_nc_ohc=AQHdgMgsacUAX8G23wa&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT_aOAkUzXH-r3m7kbDXzZ5XrW0zZmPiGJY_YKY4xDUiBw&oe=62088E6F&_nc_sid=21929d",
						"config_width": 1080,
						"config_height": 1920
					}
				],
				"display_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/273616112_522333825852419_1532046777282632362_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=111&_nc_ohc=AQHdgMgsacUAX8G23wa&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT_aOAkUzXH-r3m7kbDXzZ5XrW0zZmPiGJY_YKY4xDUiBw&oe=62088E6F&_nc_sid=21929d",
				"media_preview": "ABgq6INk1myyyK7CIAkDkt0Gf5mr6kA8Vm3A+YHJXJ7fT0pMcdXqPtp5AypMF+bIDL69cEe/Y/hRUUKFpAclsNnB7YFFCHJWZRudQlDtsOFzxj096kswWQsxy2eSeeorP2BlJyc4z098fy5q9alUDcntwR9P6k/lVu1rEJ2dwmu2tJQRznkg+n9Dxx+tFZs5zIScnJzk8GihIG7kkcqhdpHPrSNNkYGQfXNVqWqsSO68seaKsqx8vr6/1ooA/9k=",
				"gating_info": null,
				"fact_check_overall_rating": null,
				"fact_check_information": null,
				"sharing_friction_info": {
					"should_have_sharing_friction": false,
					"bloks_app_url": null
				},
				"media_overlay_info": null,
				"sensitivity_friction_info": null,
				"taken_at_timestamp": 1644520998,
				"expiring_at_timestamp": 1644607398,
				"story_cta_url": null,
				"story_view_count": null,
				"is_video": false,
				"owner": {
					"id": "1573431041",
					"profile_pic_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/270262437_718253402485836_1137903027527013241_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=100&_nc_ohc=DJltoZXewHgAX9pNexj&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT9eP89zMn8VCW2KoTyiENVgPu_j9fFQ-ZT14I_gYMYXRg&oe=620C77B6&_nc_sid=21929d",
					"username": "christlichsozialeunion",
					"followed_by_viewer": true,
					"requested_by_viewer": false
				},
				"tracking_token": "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiNzc4NWNiZjUwOWQ2NDE4YWJjYmVlNWNmY2JhYjliMmIyNzcwNzY1NDU3OTg1Njg4MjI5Iiwic2VydmVyX3Rva2VuIjoiMTY0NDU4ODQ4MjU5MXwyNzcwNzY1NDU3OTg1Njg4MjI5fDUxNzIxMzgxNjc4fDdmODcxZWMyODIxMWViNDhjOTNkOWFiMjQ1MDJjYjRiZDg4NDJhMzgxMmMwYTIzM2MyZDhkMzRmZDhjY2VhMjEifSwic2lnbmF0dXJlIjoiIn0=",
				"tappable_objects": [
					{
						"__typename": "GraphTappableMention",
						"x": 0.48844445800781205,
						"y": 1.112624999463558,
						"width": 0.64032,
						"height": 0.05174999892711601,
						"rotation": 0,
						"custom_title": null,
						"attribution": null,
						"username": "klaus_holetschek",
						"full_name": "Klaus Holetschek",
						"is_private": false
					}
				],
				"story_app_attribution": null,
				"edge_media_to_sponsor_user": {
					"edges": []
				},
				"muting_info": null
			},
			{
				"audience": "MediaAudience.DEFAULT",
				"__typename": "GraphStoryImage",
				"id": "2771251137174871275",
				"dimensions": {
					"height": 1920,
					"width": 1080
				},
				"display_resources": [
					{
						"src": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/273662605_644555343440698_3603422804840392156_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=110&_nc_ohc=OMchD3E5H_0AX9oOj1L&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT_-oyHBPuBcF0Jyyu7x7imsnav0fN5Q4TTRPI9anVQt2w&oe=6208B495&_nc_sid=21929d",
						"config_width": 640,
						"config_height": 1137
					},
					{
						"src": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/273662605_644555343440698_3603422804840392156_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=110&_nc_ohc=OMchD3E5H_0AX9oOj1L&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT9fSnmZKjMuqNkMBhYmE1kc0-iTttHhEAqoPTA-pDG5ow&oe=6208F151&_nc_sid=21929d",
						"config_width": 750,
						"config_height": 1333
					},
					{
						"src": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/273662605_644555343440698_3603422804840392156_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=110&_nc_ohc=OMchD3E5H_0AX9oOj1L&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT9SIcOT8V_-YplpBEKcncTERR-NndGJ5CYNr-xwNLBx2w&oe=6208A692&_nc_sid=21929d",
						"config_width": 1080,
						"config_height": 1920
					}
				],
				"display_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/273662605_644555343440698_3603422804840392156_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=110&_nc_ohc=OMchD3E5H_0AX9oOj1L&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT9SIcOT8V_-YplpBEKcncTERR-NndGJ5CYNr-xwNLBx2w&oe=6208A692&_nc_sid=21929d",
				"media_preview": "ABgqrQ6ZJKgkBQBhkZJz/KpP7Hl/vJ+Z/wAKz4oWlOFGfw/zini2YgsOi9T2rUzLM2lywoZGZCFGTgnP8qKpvEUGfWigCe1dU+YsVIPQdxSmT5cA5B6g/wCe/enw2IkQP5iLkZweo+vNP/s0f89U/T/4qlpe49bW/r8ypMwIAGOABRVqawWKMt5isRzgHr7AZ60U0IqQTmHO0A7hg5Hb8+9WBqMg6BPX7vtj19APyqhRQImmnaYgtgbRgY/+vmioaKYH/9k=",
				"gating_info": null,
				"fact_check_overall_rating": null,
				"fact_check_information": null,
				"sharing_friction_info": {
					"should_have_sharing_friction": false,
					"bloks_app_url": null
				},
				"media_overlay_info": null,
				"sensitivity_friction_info": null,
				"taken_at_timestamp": 1644578898,
				"expiring_at_timestamp": 1644665298,
				"story_cta_url": null,
				"story_view_count": null,
				"is_video": false,
				"owner": {
					"id": "1573431041",
					"profile_pic_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/270262437_718253402485836_1137903027527013241_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=100&_nc_ohc=DJltoZXewHgAX9pNexj&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT9eP89zMn8VCW2KoTyiENVgPu_j9fFQ-ZT14I_gYMYXRg&oe=620C77B6&_nc_sid=21929d",
					"username": "christlichsozialeunion",
					"followed_by_viewer": true,
					"requested_by_viewer": false
				},
				"tracking_token": "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiNzc4NWNiZjUwOWQ2NDE4YWJjYmVlNWNmY2JhYjliMmIyNzcxMjUxMTM3MTc0ODcxMjc1Iiwic2VydmVyX3Rva2VuIjoiMTY0NDU4ODQ4MjU5MXwyNzcxMjUxMTM3MTc0ODcxMjc1fDUxNzIxMzgxNjc4fGNkMmMwOGNjYzRiMDg2NDc1MzdjZTU4ZTUxM2UzMmMzOWUyNWJmMDNkMmM5OWE1NTE2OWRkNDA3MDUyMjc5OGMifSwic2lnbmF0dXJlIjoiIn0=",
				"tappable_objects": [
					{
						"__typename": "GraphTappableMention",
						"x": 1.132586424411903,
						"y": 0.46512046028276705,
						"width": 0.125665138950631,
						"height": 0.012125542224550001,
						"rotation": 0.215861420818129,
						"custom_title": null,
						"attribution": null,
						"username": "bayroteskreuz",
						"full_name": "Bayerisches Rotes Kreuz",
						"is_private": false
					},
					{
						"__typename": "GraphTappableFeedMedia",
						"x": 0.5,
						"y": 0.43149999237060505,
						"width": 0.872,
						"height": 0.6225,
						"rotation": 0,
						"custom_title": null,
						"attribution": null,
						"media": {
							"id": "2771247936148503177",
							"shortcode": "CZ1c1CyqnqJ"
						}
					}
				],
				"story_app_attribution": null,
				"edge_media_to_sponsor_user": {
					"edges": []
				},
				"muting_info": null
			},
			{
				"audience": "MediaAudience.DEFAULT",
				"__typename": "GraphStoryVideo",
				"id": "2771281045363569385",
				"dimensions": {
					"height": 1136,
					"width": 640
				},
				"display_resources": [
					{
						"src": "https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e15/273631792_505762630908878_785499129427130993_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=S78STbwxG5kAX_NDkMu&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT8eEZWfEjnUQNyiiqomOwQs52GlrWS1YwdVRAIJ0M_sHw&oe=62086DE1&_nc_sid=21929d",
						"config_width": 640,
						"config_height": 1136
					},
					{
						"src": "https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e15/273631792_505762630908878_785499129427130993_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=S78STbwxG5kAX_NDkMu&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT8eEZWfEjnUQNyiiqomOwQs52GlrWS1YwdVRAIJ0M_sHw&oe=62086DE1&_nc_sid=21929d",
						"config_width": 750,
						"config_height": 1331
					},
					{
						"src": "https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e15/273631792_505762630908878_785499129427130993_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=S78STbwxG5kAX_NDkMu&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT8eEZWfEjnUQNyiiqomOwQs52GlrWS1YwdVRAIJ0M_sHw&oe=62086DE1&_nc_sid=21929d",
						"config_width": 1080,
						"config_height": 1917
					}
				],
				"display_url": "https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/e15/273631792_505762630908878_785499129427130993_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=S78STbwxG5kAX_NDkMu&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT8eEZWfEjnUQNyiiqomOwQs52GlrWS1YwdVRAIJ0M_sHw&oe=62086DE1&_nc_sid=21929d",
				"media_preview": "ABgqhwaMEUikkcA0jZ9K6rs5LIM0Uwk4wegoouKxJbMV+Yfrk1Y3bWyf0/wqhbSLhgwyVwynJHGRuHHtyPxp0lwUlaM9mIBHpnj61jCyk2+uh0zu4JLpqWLl8r0I5HWiq0zcUVpLR2MY6q5RDY570M+5tx6+v0qKisDosTmZmGCcj0oqCii4WR//2Q==",
				"gating_info": null,
				"fact_check_overall_rating": null,
				"fact_check_information": null,
				"sharing_friction_info": {
					"should_have_sharing_friction": false,
					"bloks_app_url": null
				},
				"media_overlay_info": null,
				"sensitivity_friction_info": null,
				"taken_at_timestamp": 1644582464,
				"expiring_at_timestamp": 1644668864,
				"story_cta_url": null,
				"story_view_count": null,
				"is_video": true,
				"owner": {
					"id": "1573431041",
					"profile_pic_url": "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/270262437_718253402485836_1137903027527013241_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=100&_nc_ohc=DJltoZXewHgAX9pNexj&edm=AHlfZHwBAAAA&ccb=7-4&oh=00_AT9eP89zMn8VCW2KoTyiENVgPu_j9fFQ-ZT14I_gYMYXRg&oe=620C77B6&_nc_sid=21929d",
					"username": "christlichsozialeunion",
					"followed_by_viewer": true,
					"requested_by_viewer": false
				},
				"tracking_token": "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiNzc4NWNiZjUwOWQ2NDE4YWJjYmVlNWNmY2JhYjliMmIyNzcxMjgxMDQ1MzYzNTY5Mzg1Iiwic2VydmVyX3Rva2VuIjoiMTY0NDU4ODQ4MjU5MnwyNzcxMjgxMDQ1MzYzNTY5Mzg1fDUxNzIxMzgxNjc4fDgxNjE0MWRiOTk3MDliZDZhMDg1MDg3YTM3NWU3NDQ2OGQ1YWFkOTcwZTAzMDNlNzAzMjg1MTM5ODdmMjRmZTIifSwic2lnbmF0dXJlIjoiIn0=",
				"has_audio": false,
				"video_duration": 5,
				"video_resources": [
					{
						"src": "https://scontent-frt3-1.cdninstagram.com/v/t50.12441-16/273773700_430470752198683_357648705729354404_n.mp4?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=107&_nc_ohc=yGGa_DXHy7YAX8QgVic&edm=AHlfZHwBAAAA&ccb=7-4&oe=6208C334&oh=00_AT9G1kColZmQhjaXwusFDRFHtNdyMic-x0Lw1AIaL5vj2w&_nc_sid=21929d",
						"config_width": 480,
						"config_height": 852,
						"mime_type": "video/mp4; codecs=\"avc1.42E01E\"",
						"profile": "BASELINE"
					},
					{
						"src": "https://scontent-frx5-2.cdninstagram.com/v/t50.12441-16/273692936_3054792864764013_7030025433125379465_n.mp4?_nc_ht=scontent-frx5-2.cdninstagram.com&_nc_cat=109&_nc_ohc=QeMbui-1TLoAX_iCN_T&tn=gf7-L9EQUw17yV8S&edm=AHlfZHwBAAAA&ccb=7-4&oe=6208B1AA&oh=00_AT-iOPjDr6FmEav4vYEcZ9UJEKOS2Isgv1w0OfdBWfVkWA&_nc_sid=21929d",
						"config_width": 640,
						"config_height": 1136,
						"mime_type": "video/mp4; codecs=\"avc1.4D401E\"",
						"profile": "MAIN"
					}
				],
				"tappable_objects": [
					{
						"__typename": "GraphTappableFeedMedia",
						"x": 0.5,
						"y": 0.5709924355758951,
						"width": 0.822832924480125,
						"height": 0.574128300789923,
						"rotation": 0,
						"custom_title": null,
						"attribution": null,
						"media": {
							"id": "2771279281700532759",
							"shortcode": "CZ1j9LnKPIX"
						}
					}
				],
				"story_app_attribution": null,
				"edge_media_to_sponsor_user": {
					"edges": []
				},
				"muting_info": null
			}
		])

	}

	
	return true;
	})