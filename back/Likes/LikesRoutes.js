/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   LikesRoutes.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/10 15:31:10 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/10 18:30:35 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var Likes = require('./Likes')
var utils = require('../utils/utils')

router.use(bodyParser.json())

router.get('/check-like/:username', (req, res) => {
	const token = req.headers.authorization
	const fromUsername = utils.getUsernameByToken(token)
	const toUsername = req.params.username
	if (utils.checkToken(token) === false) {
		return res.status(401).json({authorization: 'You are not allowed to get this information'})
	}
	const data = {
		fromUsername: fromUsername,
		toUsername: toUsername
	}
	Likes.getLikes(data, (err, rows) => {
		if (err) {
			return res.status(500).json({error_message: 'Error'})
		} else {
			console.log(`[${Date(Date.now()).toString()}]: ${fromUsername} get if like ${toUsername}!`);
			if (!rows[0]) {
				return res.status(200).json({message: 'Sucesss', liked: false})
			} else {
				if (utils.likeCheckIfMatch(data) === true) {
					return res.status(200).json({message: 'Sucesss', liked: true, matched: true})
				}
				return res.status(200).json({message: 'Sucesss', liked: true, matched: false})
			}
		}
	})
})

router.get('/get-likes', (req, res) => {
	const token = req.headers.authorization
	if (utils.checkAuthToken(token, utils.getUsernameByToken(token)) === false) {
			return res.status(401).json({authorization: 'You are not allowed to get this information'})
	}
	const fromUsername = utils.getUsernameByToken(token)

	Likes.getUserAllLikes(fromUsername, (err, rows) => {
		if (rows) {
			rows = utils.addLocLikeInRow(fromUsername, rows)
			return res.status(200).json({
				message: 'get likes OK',
				likes: rows
			});
		} else {
			return res.status(400).json({error: err})
		}
	})
})


router.post('/like', (req, res) => {
	const token = req.headers.authorization
	if (utils.checkToken(token) === false) {
		return res.status(401).json({authorization: 'You are not allowed to post this information'})
	}
	const data = {
		fromUsername: req.body.data.from_username,
		toUsername: req.body.data.to_username
	}
	Likes.create(data, (err) => {
		if (err) {
			console.log(err)
			return res.status(500).json({error_message: 'Error'})
		} else {
			if (utils.likeCheckIfMatch(data) == true) {
				utils.incrementCountMatch(data, '+')
				console.log(`[${Date(Date.now()).toString()}]: ${data.toUsername} has be matched with ${data.fromUsername}!`);
				return res.status(201).json({message: 'Success', matched: true})
			}
			console.log(`[${Date(Date.now()).toString()}]: ${data.toUsername} has be liked by ${data.fromUsername}!`);
			return res.status(201).json({message: 'Success', matched: false})
		}
	})
})

router.post('/unlike', (req, res) => {
	const token = req.headers.authorization
	if (utils.checkToken(token) === false) {
		return res.status(401).json({authorization: 'You are not allowed to post this information'})
	}
	const data = {
		fromUsername: req.body.data.from_username,
		toUsername: req.body.data.to_username
	}
	if (utils.likeCheckIfMatch(data) == true) {
		utils.incrementCountMatch(data, '-')
		console.log(`[${Date(Date.now()).toString()}]: ${data.toUsername} has be unmatched with ${data.fromUsername}!`);
	}
	Likes.delete(data, (err) => {
		if (err) {
			console.log(err)
			return res.status(500).json({error_message: 'Error'})
		} else {
			console.log(`[${Date(Date.now()).toString()}]: ${data.toUsername} has be unliked by ${data.fromUsername}!`);
			return res.status(200).json({message: 'Success'})
		}
	})
})

module.exports = router