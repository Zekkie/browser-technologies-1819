window.onload = function() {
	if("Event" in window) {
		window.ABORT_REQUEST =  new Event("abort-request");
	};
	if("XMLHttpRequest" in window) {
		var state = false;
		var wrapper = document.getElementsByClassName("match-wrapper")[0];
		var label = document.createElement("label");
		var button = document.createElement("button");
		button.innerHTML = "Zet live updates aan";
		button.style.background = "#e74c3c";
		wrapper.appendChild(button);
		button.onclick = function() {
			if(!state) {
				state = true;
				button.style.background = "#2ecc71";
				this.innerHTML = "Zet live updates uit";
				console.log("Start Polling");
				poll();
			}else if(state) {
				dispatchEvent(ABORT_REQUEST);
				state = false;
				button.style.background = "#e74c3c";
				this.innerHTML = "Zet live updates aan";
			};
		};


		var meta = document.getElementsByClassName("disable")[0];
		window.stop();
		var score_home = document.getElementsByClassName("score_home")[0];
		var score_out = document.getElementsByClassName("score_out")[0];
		var poll = function() {
			var xhr = new XMLHttpRequest();
			console.log(xhr)
			xhr.onload = function(e) {
				var data = JSON.parse(e.currentTarget.response);
				score_out.innerText = data.team_uit.score;
				score_home.innerText = data.team_thuis.score;
				document.getElementsByClassName("screenreader")[0].innerHTML = diffScore(data);
				
				poll();
			};
			xhr.open("get",window.location.origin+"/poll"+window.location.search, true)
			if(state){
				xhr.send();
			};
			window.addEventListener("abort-request", (e) => {
				xhr.abort();
			});
		};
	};


	var getCurrentScoreStatic = function() {
		var xhr = new XMLHttpRequest();

		xhr.onload = function(e) {
			const match = JSON.parse(this.response);
			window.currentScore = match;
			console.log(window.currentScore)
		}


		xhr.open("GET",window.location.origin+"/currentscore"+window.location.search, true);
		xhr.send();
	}

	getCurrentScoreStatic();


	var diffScore = function(newScore){
		var prevScore = window.currentScore;
		
		var str = ""

		if(newScore.team_uit.score > prevScore.team_uit.score) {
			console.log("uit scoort")
			str = newScore.team_uit.naam+" scoort. Tussenstand is " + newScore.team_thuis.naam + " " + newScore.team_thuis.score + " " + newScore.team_uit.naam + " " + newScore.team_uit.score;
		}else if(newScore.team_thuis.score > prevScore.team_thuis.score) {
			console.log("thuis scoort")
			str = newScore.team_thuis.naam+" scoort. Tussenstand is " + newScore.team_thuis.naam + " " + newScore.team_thuis.score + " " + newScore.team_uit.naam + " " + newScore.team_uit.score;
		}

		window.currentScore = newScore;

		return str;
	}
};