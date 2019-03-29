const loc = window.location.origin;



const socket = io(loc)

function createPanel(data) {
	data.forEach(f => {
		const wrapper = document.createElement("div");
		const btn_home = document.createElement("button");
		const btn_out = document.createElement("button");
		btn_out.innerHTML = f.team_uit.naam;
		btn_home.innerHTML = f.team_thuis.naam;

		wrapper.data = f;

		btn_home.onclick = function() {
			this.parentElement.data.team_thuis.score++
			socket.emit("score", this.parentElement.data)
		}

		btn_out.onclick = function() {
			this.parentElement.data.team_uit.score++
			socket.emit("score", this.parentElement.data)
		}

		wrapper.appendChild(btn_home);
		wrapper.appendChild(btn_out);
		document.body.appendChild(wrapper)
	})
}


socket.on("cp-data", (d) => {
	createPanel(d)
})