var express = require('express');
var bodyParser = require('body-parser');
// var Users = require('./Users');
var UsersToken = require('../UsersToken/UsersToken')
var UsersInfos = require('../UsersInfos/UsersInfos')
var FakeAccounts = require('../FakeAccounts/FakeAccounts')
var router = express.Router();
var utils = require('../utils/utils')

router.use(bodyParser.json());

router.post('/add-fake-account/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkToken(token)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	FakeAccounts.addFakeAccounts(username, (err) => {
		if (err) {
			console.log(err)
			return res.status(500).json({error_message: 'Error'})
		} else {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has signal an account`);
			return res.status(200).json({message: 'Success'})
		}
	})
})

module.exports = router;