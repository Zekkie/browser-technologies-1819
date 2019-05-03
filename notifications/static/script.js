window.onload = function() {
	const meta = document.querySelector(".disable");
	window.stop();
	document.head.removeChild(meta);


	const poll = function() {
		const xhr = new XMLHttpRequest();

		xhr.onload = function(e) {
			poll()
		}

		xhr.open("get","http://192.168.178.15:2000/poll", true)
		xhr.send()
		console.log(xhr)
	}

	poll();



}
