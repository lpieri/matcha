var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var UsersChat = require('./UsersChat');
var utils = require('../utils/utils');


router.use(bodyParser.json());




router.post('/new-room/', function (req, res) {
	// const token = req.headers.authorization
	// const username_1 = utils.getUsernameByToken(token)
	// const username_2 = req.params.username
	// if (utils.checkToken(token) === false) {
	// 	return res.status(401).json({authorization: 'You are not allowed to get this information'})
	// }
	if (req.body.data.username_1 === null && req.body.data.username_2 === null) {
		return (res.status(200).json({err_message: `Data in input is egal at null`}));
	}
	data = {
		username_1: req.body.data.username_1,
		username_2: req.body.data.username_2
	}
	UsersChat.createRoom(data, function (err) {
		if (err) {
			return res.status(400).json({message: `Error`})
		} else {
			console.log(`[${Date(Date.now()).toString()}]: ${data.username_1} and ${data.username_2}  has just create a new room!`);
			return res.status(201).json({message : `Success Message`})
		}
	});
});

router.post('/delete-room/', function (req, res) {
	// const token = req.headers.authorization
	// const username_1 = utils.getUsernameByToken(token)
	// const username_2 = req.params.username
	// if (utils.checkToken(token) === false) {
	// 	return res.status(401).json({authorization: 'You are not allowed to get this information'})
	// }
	if (req.body.data.username_1 === null && req.body.data.username_2 === null) {
		return (res.status(200).json({err_message: `Data in input is egal at null`}));
	}
	const data = {
		username_1: req.body.data.username_1,
		username_2: req.body.data.username_2
	}
	if (utils.checkIfRoomExist(data) === 1) {
		console.log('coucou')
		UsersChat.deleteRoomOne(data, function (err) {
			if (err) {
				return res.status(400).json({message: `Error`})
			} else {
				console.log(`[${Date(Date.now()).toString()}]: ${data.username_1} and ${data.username_2} has just delete their room.`);
				return res.status(201).json({message : `Success Message`})
			}

		});
	}
	else if (utils.checkIfRoomExist(data) === 2) {
		UsersChat.deleteRoomTwo(data, function (err) {
			if (err) {
				return res.status(400).json({message: `Error`})
			} else {
				console.log(`[${Date(Date.now()).toString()}]: ${data.username_1} and ${data.username_2} has just delete their room.`);
				return res.status(201).json({message : `Success Message`})
			}

		});
	}
});

router.post('/add-users-message/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.userMessage === null) {
		return (res.status(200).json({err_message: `Data in input is egal at null`}));
	}
	data = {
		message: req.body.data.userMessage,
		username: username
	}
	UsersChat.addMessage(data, function (err) {
		if (err) {
			return res.status(400).json({message : `Error`})
		} else {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just add new message!`);
			return res.status(201).json({message : `Success Message`})
		}
	});
});



router.get('/get-message', (req, res) => {
	const token = req.headers.authorization
	if (utils.checkAuthToken(token, utils.getUsernameByToken(token)) === false) {
			return res.status(401).json({authorization: 'You are not allowed to get this information'})
	}
	const username = utils.getUsernameByToken(token)

	UsersChat.getUserMessage(username, (err, rows) => {
		if (rows) {
			for (let i = 0; i < rows.length; i++) {
				rows[i]['localization'] = utils.getCityWithLoc(rows[i]['localization']);
			}
			return res.status(200).json({
				message: 'get message OK',
				messageChat: rows
			});
		} else {
			return res.status(400).json({error: err})
		}
	})
})

module.exports = router