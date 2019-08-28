var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var UsersHistory = require('./UsersHistory');
var utils = require('../utils/utils');

router.use(bodyParser.json());

router.post('/add-history/:username', (req, res) => {
	const token = req.headers.authorization
	if (utils.checkToken(token) === false) {
		return res.status(401).json({authorization: 'You are not allowed to post this information'})
	}
	const data = {
		from_username: req.body.data.from_username,
		to_username: req.body.data.to_username
	}
	UsersHistory.addHistory(data, (err) => {
		if (err) {
			console.log(err)
			return res.status(500).json({error_message: 'Error'})
		} else {
			console.log(`[${Date(Date.now()).toString()}]: ${data.toUsername} has been visited by ${data.fromUsername}!`);
			return res.status(201).json({message: 'Success'})
		}
	})
})

router.get('/get-history', (req, res) => {
	const token = req.headers.authorization
	if (utils.checkAuthToken(token, utils.getUsernameByToken(token)) === false) {
			return res.status(401).json({authorization: 'You are not allowed to get this information'})
	}
	const fromUsername = utils.getUsernameByToken(token)

	UsersHistory.getUserHistory(fromUsername, (err, rows) => {
		if (rows) {
			rows = utils.addLocLikeInRow(fromUsername, rows)
			return res.status(200).json({
				message: 'get history OK',
				history: rows
			});
		} else {
			return res.status(400).json({error: err})
		}
	})
})

module.exports = router