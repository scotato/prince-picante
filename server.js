require("dotenv-defaults").config();
const fetch = require("node-fetch");

const host = process.env.OCTOPRINT_HOST;
const auth = process.env.OCTOPRINT_KEY;

const octoprint = (type) =>
	fetch(`${host}/api/${type}`, {
		headers: {
			"X-Api-Key": auth,
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());

octoprint("job").then((body) => console.log(body));
