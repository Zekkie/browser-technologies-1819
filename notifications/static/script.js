window.onload = function() {
	if("Event" in window) {
		window.ABORT_REQUEST =  new Event("abort-request");
	};
	if("XMLHttpRequest" in window) {
		let state = false;
		const wrapper = document.querySelector(".match-wrapper");
		const label = document.createElement("label");
		const button = document.createElement("button");
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
		const meta = document.querySelector(".disable");
		window.stop();
		document.head.removeChild(meta);
		const score_home = document.querySelector(".score_home");
		const score_out = document.querySelector(".score_out");
		const poll = function() {
			const xhr = new XMLHttpRequest();
			console.log(xhr)
			xhr.onload = function(e) {
				const data = JSON.parse(e.currentTarget.response);
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