window.onload = function() {

	const meta = document.querySelector(".disable");
	window.stop();
	document.head.removeChild(meta);
	const score_home = document.querySelector(".score_home");
	const score_out = document.querySelector(".score_out");

	const poll = function() {
		const xhr = new XMLHttpRequest();

		xhr.onload = function(e) {

			const data = JSON.parse(e.currentTarget.response);
			console.log(data)

			score_out.innerText = data.team_uit.score
			score_home.innerText = data.team_thuis.score
			poll()
		}

		xhr.open("get",window.location.origin+"/poll"+window.location.search, true)
		xhr.send()

	}

	poll();



}
