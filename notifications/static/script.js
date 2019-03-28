window.onload = function() {
	const meta = document.querySelector(".disable");
	window.stop();
	document.head.removeChild(meta);


	const poll = function() {
		const xhr = new XMLHttpRequest();

		xhr.onload = function(e) {
			console.log(e)
			poll()
		}

		xhr.open("get",window.location.origin+"/poll", true)
		xhr.send()

	}

	poll();



}
