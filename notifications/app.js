process.env.PORT = 2000;



const updateTime = () => {
	let time = 0;
	setInterval(() => {
		time = time + 1;
		data[0].minuut = time;
		data[1].minuut = time;
		console.log(time)
	}, 1000)
}


updateTime();

const data = [
	{
		id:1,
		minuut:0,
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


const express = require("express");
const app = express();


app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("static"));

const initialPage = (req, res) => {
		res.render("index", {data:data})
}

const matchPage = (req, res) => {

	const q = parseInt(req.query.id); 


	const matchData = data.find((m) => {
		return m.id === q;
	})
	console.log("refresh")
	res.render("match", {match: matchData})
}


app.get("/",initialPage)


app.get("/match", matchPage)


app.listen(process.env.PORT, () => {
	console.log('APP IS RUNNING ON PORT: ' + process.env.PORT)
})



