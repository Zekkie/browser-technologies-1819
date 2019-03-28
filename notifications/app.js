process.env.PORT = 2000;


const express = require("express");
const app = express();
const cors = require("cors");
const Observer = require("./Observer.js");

const matchObserver = new Observer();


app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("static"));
app.use(cors());


const date = new Date();






const updateTime = () => {
	let time = 0;
	setInterval(() => {
		matchObserver.notify(data);
	}, 1000)
}


updateTime();

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

const initialPage = (req, res) => {
	res.render("index", {data:data})
}

const matchPage = (req, res) => {
	const q = parseInt(req.query.id); 
	const matchData = data.find((m) => {
		return m.id === q;
	})
	res.render("match", {match: matchData});
};

const poll = (req, res) => {
	matchObserver.subscribe(res);
};

app.get("/",initialPage);


app.get("/match", matchPage)

app.get("/poll", poll);

app.listen(process.env.PORT, () => {
	console.log('APP IS RUNNING ON PORT: ' + process.env.PORT)
});