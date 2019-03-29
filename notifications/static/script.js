window.onload = function() {
	if("Event" in window) {
		window.ABORT_REQUEST =  new Event("abort-request");
	};
	if("XMLHttpRequest" in window) {
		var state = false;
		var wrapper = document.getElementByClassName(".match-wrapper");
		var label = document.createElement("label");
		var button = document.createElement("button");
		button.innerHTML = "Zet live updates aan";
		button.style.background = "red";
		wrapper.appendChild(button);
		button.onclick = function() {
			if(!state) {
				state = true;
				button.style.background = "green";
				this.innerHTML = "Zet live updates uit";
				console.log("Start Polling");
				poll();
			}else if(state) {
				dispatchEvent(ABORT_REQUEST);
				state = false;
				button.style.background = "red";
				this.innerHTML = "Zet live updates aan";
			};
		};
		var meta = document.getElementByClassName(".disable")[0];
		window.stop();
		document.head.removeChild(meta);
		var score_home = document.getElementByClassName(".score_home")[0];
		var score_out = document.getElementByClassName(".score_out")[0];
		var poll = function() {
			var xhr = new XMLHttpRequest();
			console.log(xhr)
			xhr.onload = function(e) {
				var data = JSON.parse(e.currentTarget.response);
				score_out.innerText = data.team_uit.score;
				score_home.innerText = data.team_thuis.score;
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
};