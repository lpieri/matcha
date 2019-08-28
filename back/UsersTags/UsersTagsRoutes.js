var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var UsersTags = require('./UsersTags');
var utils = require('../utils/utils');

router.use(bodyParser.json());

/*************************************************************************************/
/**							Route Api can update value in Db						 */
/*************************************************************************************/

router.post('/add-users-tags/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.userNameTag === null && req.body.data.userPictureTag === null) {
		return (res.status(200).json({err_message: `Data in input is egal at null`}));
	}
	data = {
		user_name_tag: req.body.data.userNameTag,
		user_picture_tag: req.body.data.userPictureTag,
		username: username
	}
	UsersTags.openTags(data, function (err) {
		if (err) {
			return res.status(400).json({message : `Error`})
		} else {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just add his tags!`);
			return res.status(201).json({message : `Success Tags`})
		}
	});
});

router.put('/delete-users-tags/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.userNameTag === null && req.body.data.userPictureTag === null) {
		return (res.status(200).json({err_message: `Data in input is egal at null`}));
	}
	data = {
		id: req.body.data.id,
	}
	UsersTags.deleteTag(data, function (err) {
		if (err) {
			console.log (err)
			return res.status(400).json({message : `Error`})

		} else {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just delete his tags!`);
			return res.status(200).json({message : `Success Tags`})
		}
	});
});

/*************************************************************************************/
/**								Route Api Only get Methods							 */
/*************************************************************************************/

router.get('/get-users-tags/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkToken(token)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	UsersTags.getUserTags(username, (err, rows) => {
		if (err) {
			return res.status(500).json({err_message: 'Error !!'})
		} else {
			if (!rows) {
				return res.status(200).json({err_message: 'No data link at this username !'})
			}
			console.log(`[${Date(Date.now()).toString()}]: ${username} get his tags`);
			res.status(200).json({
				message: 'OK',
				userTags: rows})
			}
	});
});

module.exports = router