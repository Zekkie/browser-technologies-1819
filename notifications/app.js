process.env.PORT = 80;

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");
const Observer = require("./Observer.js");

const date = new Date();

function getKey(array, item) {
	for(let i = 0; i < array.length; i++) {
		if(array[i].id == item.id) {
			return i;
			break;
		}
	}
}


const matchObservers = [];

const data = [
	{
		id:1,
		minuut:0,
		startDate:date,
		team_thuis: {
			naam: "FC Utrecht",
			score: 0
		},
		team_uit: {
			naam: "Ajax",
			score: 0
		}
	},
	{
		id:2,
		minuut:0,
		startDate: date,
		team_thuis: {
			naam: "Feyenoord",
			score: 0
		},
		team_uit: {
			naam: "AZ",
			score: 0
		}
	},
]


data.forEach((d) => {
	matchObservers.push(new Observer(d.id));
});



app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("static"));
app.use(cors());





io.on("connect", (s) => {
	s.emit("cp-data", data)
	s.on("score", (d) => {
		data[getKey(data, d)] = d;
		const observer = matchObservers.find((o) => {
			return o.id === d.id;
		});
		observer.notify(d);
	});
});


const initialPage = (req, res) => {

	res.render("index", {data: data});

};

const matchPage = (req, res) => {

	const q = parseInt(req.query.id); 
	const matchData = data.find((m) => {
		return m.id === q;
	});
	res.render("match", {match: matchData});
};

const poll = (req, res) => {
	const id = parseInt(req.query.id);
	const observer = matchObservers.find((o) => {
		return o.id === id;
	});
	observer.subscribe(res);
};

const controlpannel = (req, res) => {
	res.sendfile("./static/controlpannel/controlpannel.html");
};

const currentScore = (req, res) => {
	const id =+ req.query.id;

	const match = data.find(i => {
		return i.id = id;
	});



	res.send(JSON.stringify(match));
}


app.get("/",initialPage);
app.get("/match", matchPage);
app.get("/poll", poll);
app.get("/controlpannel", controlpannel);
app.get("/currentscore", currentScore)


server.listen(process.env.PORT);