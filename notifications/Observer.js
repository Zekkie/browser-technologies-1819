class Observer {
	constructor(id) {
		this.id = id
		this.observers = [];
	};

	notify(data) {
		this.observers.forEach((r) => {
			if(!r.headersSent) {
				r.send(data);
			};
		})
		this.flush();
	};

	flush() {
		this.observers = [];
	};

	subscribe(pendingRequest) {
		this.observers.push(pendingRequest);
	};

};

module.exports = Observer;