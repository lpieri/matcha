/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersInfosRoutes.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/31 13:18:15 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/25 22:02:40 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var UsersInfos = require('./UsersInfos');
var utils = require('../utils/utils');

router.use(bodyParser.json());

/*************************************************************************************/
/**								Route Api Only get Methods							 */
/*************************************************************************************/

/**
 * Route Api for get all users
 */
router.get('/get-infos/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkToken(token)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not authorize for get this information'})
	}
	blocked = utils.checkIfUsersIsBlocked({fromUsername: utils.getUsernameByToken(token), toUsername: username})
	if (blocked.blockedTo === true || blocked.blockedBy === true) {
		return res.status(200).json({username: username, blockedTo: blocked.blockedTo, blockedBy: blocked.blockedBy})
	}
	UsersInfos.getInfos(username, (err, rows) => {
		if (err) {
			console.log(err)
			return res.status(500).json({err_message: 'Error !!'})
		} else {
			if (!rows[0]) {
				return res.status(404).json({err_message: 'No data link at this username !'})
			}
			json = utils.checkConnectByUsername(username)
			rows[0]['blockedTo'] = blocked.blockedTo
			rows[0]['blockedBy'] = blocked.blockedBy
			rows[0]['is_connected'] = json.is_connected
			rows[0]['last_connect'] = json.last_connect
			rows[0]['city'] = utils.getCityWithLoc(rows[0].localization)
			rows[0]['latitude'] = Number(rows[0].localization.split(',')[0].split(':')[1])
			rows[0]['longitude'] = Number(rows[0].localization.split(',')[1].split(':')[1])
			console.log(`[${Date(Date.now()).toString()}]: Information of ${username} get by ${token.split(' ')[1]}!`);
			return res.status(200).json(rows[0])
		}
	});
});

/*************************************************************************************/
/**							Route Api can update value in Db						 */
/*************************************************************************************/

/**
 * Route Api for update bio with confimation
 *
 * This route update bio for a specific token
 */
router.put('/update-bio/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.message === null) {
		return (res.status(200).json({err_message: `Data in input is egal at null`}));
	}
	data = {
		bio: req.body.data.message,
		username: username
	}
	UsersInfos.updateBio(data, function (err, rows) {
		if (err) {
			return res.status(400).json({message : `Error`})
		} else if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his bio!`);
			return res.status(200).json({message : `Success Bio`})
		}
	});
});

/**
 * Route Api for update loc with confimation
 *
 * This route update loc for a specific token
 */
router.put('/update-loc/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	let localization = req.body.data.localization
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.localization === null) {
		return (res.status(200).json({err_message: `Data in input is egal at null`}));
	}
	if (req.body.data.localization.search('latitude') == -1) {
		localization = utils.getLocWithCity(req.body.data.localization)
		if (localization === null) {
			return res.status(200).json({message: 'City not found'})
		}
	}
	data = {
		localization: localization,
		lat: localization.split(',')[0].split(':')[1],
		lng: localization.split(',')[1].split(':')[1],
		username: username
	}
	UsersInfos.updateLocalization(data, function (err, rows) {
		if (err) {
			console.log(err)
			return res.status(400).json({message : `Error`})
		} else if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his localization!`);
			return res.status(200).json({message : `Success Loc`})
		}
	});
});

/**
 * Route Api for update age with confimation
 *
 * This route update age for a specific token
 */
router.put('/update-age/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.age === null) {
		return (res.status(200).json({message: `Data in input is egal at null`}));
	}
	let data = {
		age: req.body.data.age,
		username: username
	}
	UsersInfos.updateAge(data, function (err, rows) {
		if (err) {
			return res.status(400).json({message : `Error`})
		} else if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his age!`);
			return res.status(200).json({message : `Success Age`})
		}
	});
});

/**
 * Route Api for update gender with confimation
 *
 * This route update age for a specific token
 */
router.put('/update-gender/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.gender === null) {
		return (res.status(200).json({message: `Data in input is egal at null`}));
	}
	let data = {
		gender: req.body.data.gender,
		username: username
	};
	UsersInfos.updateGender(data, function (err, rows) {
		if (err) {
			return res.status(400).json({message : `Error`})
		} else if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his age!`);
			return res.status(200).json({message : `Success Gender`})
		}
	});
});

/**
 * Route Api for update sexual orientation with confimation
 *
 * This route update sexual orientation for a specific token
 */
router.put('/update-sexual-orientation/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.sexualOrientation === null) {
		return (res.status(200).json({message: `Data in input is egal at null`}));
	}
	let data = {
		sexual_orientation: req.body.data.sexualOrientation,
		username: username
	};
	UsersInfos.updateSexualOrientation(data, function (err, rows) {
		if (err) {
			return res.status(400).json({message : `Error`})
		} else if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his sexual orientation!`);
			return res.status(200).json({message : `Success update sexual orientation`})
		}
	})
})

module.exports = router