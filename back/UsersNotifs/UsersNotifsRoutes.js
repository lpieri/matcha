/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersNotifsRoutes.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/05 12:34:48 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/26 11:57:20 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var UsersNotifs = require('./UsersNotifs')
var utils = require('../utils/utils')
var db_sync = require('../settings/sync_db')

router.use(bodyParser.json())

router.get('/get-notifs/:username', (req, res) => {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth == false) {
		return res.status(401).json({authorization: 'You are not authorize for get this information'})
	}
	UsersNotifs.getAllNotifs(username, (err, rows) => {
		if (err) {
			return res.status(500).json({err_message: 'Error !!'})
		} else {
			if (!rows[0]) {
				return res.status(200).json({message: 'no data'})
			}
			console.log(`[${Date(Date.now()).toString()}]: Notifs of ${username} get by ${token.split(' ')[1]}!`);
			return res.status(200).json(rows)
		}
	})
})

router.put('/set-see/:id', (req, res) => {
	const username = req.body.data.username
	const idNotif = req.params.id
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth == false) {
		return res.status(401).json({authorization: 'You are not authorize for update this information'})
	}
	result = db_sync.query('select vu from users_notifs where id = ?', [idNotif]);
	if (result[0] && result[0].vu === 1) {
		return res.status(200).json({message: `Success`});
	}
	UsersNotifs.updateSee(idNotif, (err, rows) => {
		if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has see this notification ${idNotif}!`);
			res.status(200).json({message: `Success`});
		} else {
			res.status(400).json({message: `Error`});
		}
	})
})

router.post('/create/:username', (req, res) => {
	const reason = req.body.data.reason
	const toUsername = req.params.username
	const token = req.headers.authorization
	const myUsername = utils.getUsernameByToken(token)
	const auth = utils.checkToken(token)
	if (auth == false || myUsername == toUsername) {
		return res.status(401).json({authorization: 'You are not authorize for create this information'})
	}
	const data = generateData(toUsername, myUsername, reason)
	UsersNotifs.createNotif(data, (err) => {
		if (err) {
			return res.status(500).json({err_message: 'Error !!'})
		} else {
			console.log(`[${Date(Date.now()).toString()}]: ${myUsername} has created a new notification for ${toUsername}!`);
			return res.status(201).json({message: 'Success'})
		}
	})
})

function generateData(toUsername, myUsername, reason) {
	var notifMsg
	var linkUrl

	if (reason == 'like') {
		notifMsg = `${toUsername} vous avez été liké par ${myUsername} !`
		linkUrl = `http://localhost:8080/#/profile/${myUsername}`
	} else if (reason == 'visite') {
		notifMsg = `${toUsername} votre profile a été visité par ${myUsername} !`
		linkUrl = `http://localhost:8080/#/profile/${myUsername}`
	} else if (reason == 'message') {
		notifMsg = `${toUsername} vous avez reçu un message de ${myUsername} !`
		linkUrl = `http://localhost:8080/#/chat`
	} else if (reason == 'back-like') {
		notifMsg = `${toUsername} vous avez été liké en retour par ${myUsername} !`
		linkUrl = `http://localhost:8080/#/profile/${myUsername}`
	} else if (reason == 'match') {
		notifMsg = `${toUsername} vous avez matché avec ${myUsername} !`
		linkUrl = `http://localhost:8080/#/profile/${myUsername}`
	} else {
		notifMsg = `${toUsername} vous avez été un-liké par votre match ${myUsername} !`
		linkUrl = `http://localhost:8080/#/profile/${myUsername}`
	}
	const data = {
		username: toUsername,
		notif: notifMsg,
		link: linkUrl
	}
	return data
}

module.exports = router