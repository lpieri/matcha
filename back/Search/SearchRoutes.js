/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SearchRoutes.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/16 14:35:16 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/25 21:32:06 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express');
var bodyParser = require('body-parser');
var Search = require('./Search');
var router = express.Router();
var utils = require('../utils/utils')
var search_utils = require('../utils/search_utils')
var sync_db = require('../settings/sync_db');

router.use(bodyParser.json());

/*************************************************************************************/
/**								Route Api get All users  							 */
/*************************************************************************************/

router.get('/get-search/', (req, res) => {
	const username = utils.getUsernameByToken(req.headers.authorization)
	const result = sync_db.query(`select ui.age, ui.gender, ui.sexual_orientation, ui.localization, ui.lat, ui.lng, up.score
	from users_infos as ui
	inner join users_popularity as up on ui.username = up.username where ui.username = ?`, [username])
	ageInterval = 5
	distanceInterval = 42000
	scoreInterval = 200
	searchGender = search_utils.defineSearchGender(result[0].gender, result[0].sexual_orientation)
	mySexualOrientation = result[0].sexual_orientation
	myLat = result[0].lat
	myLng = result[0].lng
	limit = 10
	if (req.query.data != undefined || req.query.data != null) {
		const d = JSON.parse(req.query.data)
		ageInterval = d.ageInterval
		distanceInterval = d.distanceInterval * 1000
		scoreInterval = d.scoreInterval
		searchGender = (d.gender != null) ? d.gender : searchGender
		mySexualOrientation = (d.sexualOrientation != null) ? d.sexualOrientation : mySexualOrientation
		limit = null
		if (d.city != null) {
			loc = utils.getLocWithCity(d.city)
			if (loc != null) {
				myLat = Number(loc.split(',')[0].split(':')[1])
				myLng = Number(loc.split(',')[1].split(':')[1])
			}
		}
	}
	if (result[0] != undefined) {
		const data = {
			myUsername: username,
			mySexualOrientation: mySexualOrientation,
			myGender: result[0].gender,
			gender: searchGender,
			maxAge: (Number(result[0].age) + Number(ageInterval)),
			minAge: (Number(result[0].age) - Number(ageInterval) < 18) ? 18 : (Number(result[0].age) - Number(ageInterval)),
			maxScore: (Number(result[0].age) + Number(scoreInterval)),
			minScore: (Number(result[0].age) - Number(scoreInterval) < 0) ? 0 : (Number(result[0].age) - Number(scoreInterval)),
			distance: distanceInterval,
			lat: myLat,
			lng: myLng,
			limit: limit,
			tags: (req.query.tags != undefined) ? req.query.tags : null
		}
		Search.getSearchInfos(data, (err, rows) => {
			if (err) {
				res.status(400).json(err);
			} else {
				rows = utils.addLocLikeInRow(username, rows)
				res.status(200).json(rows);
			}
		});
	}
});

/*************************************************************************************/
/**								Route Api Only put Methods							 */
/*************************************************************************************/

router.put('/update-search-gender/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.matchGender === null) {
		return (res.status(200).json({message: `Data in input is egal at null`}));
	}
	let data = {
		searchGender: req.body.data.searchGender,
		username: req.params.username
	};
	Search.updateSearchGender(data, function (err, rows) {
		if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his search gender!`);
		} else {
			res.status(400).json({message : `Error`})
		}
	})
}),

router.put('/update-search-sexual-orientation/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.searchSexualOrientation === null) {
		return (res.status(400).json({message: `Data in input is egal at null`}));
	}
	let data = {
		searchSexualOrientation: req.body.data.searchSexualOrientation,
		username: req.params.username
	};
	Search.updateSearchSexualOrientation(data, function (err, rows) {
		if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his search sexual orientation!`);
			res.status(200).json({message : `Success update search sexual orientation`})
		} else {
			res.status(400).json({message : `Error`})
		}
	})
})

module.exports = router;