/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersPopularityRoutes.js                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/10 11:55:01 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/10 18:32:42 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var UsersPopularity = require('./UsersPopularity')
var utils = require('../utils/utils')

router.use(bodyParser.json())

router.put('/add-views/:username', (req, res) => {
	const username = req.params.username
	const token = req.headers.authorization
	if (utils.checkToken(token) == false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	UsersPopularity.addViews(username, (err, rows) => {
		if (err) {
			console.log(err)
			return res.status(500).json({error_message : `Error`})
		} else if (rows.changedRows) {
			res_data = utils.recalcScore(username)
			console.log(`[${Date(Date.now()).toString()}]: ${username}'s profile has juste views!`);
			return res.status(200).json(res_data)
		}
	})
})

router.put('/add-likes/:username', (req, res) => {
	const username = req.params.username
	const token = req.headers.authorization
	if (utils.checkToken(token) == false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	UsersPopularity.addLikes(username, '+', (err, rows) => {
		if (err) {
			console.log(err)
			return res.status(500).json({error_message : `Error`})
		} else if (rows.changedRows) {
			res_data = utils.recalcScore(username)
			console.log(`[${Date(Date.now()).toString()}]: ${username}'s profile has juste like!`);
			return res.status(200).json(res_data)
		}
	})
})

router.put('/remove-likes/:username', (req, res) => {
	const username = req.params.username
	const token = req.headers.authorization
	if (utils.checkToken(token) == false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	UsersPopularity.addLikes(username, '-', (err, rows) => {
		if (err) {
			console.log(err)
			return res.status(500).json({error_message : `Error`})
		} else if (rows.changedRows) {
			res_data = utils.recalcScore(username)
			console.log(`[${Date(Date.now()).toString()}]: ${username}'s profile has juste like!`);
			return res.status(200).json(res_data)
		}
	})
})

router.put('/add-matchs/:username', (req, res) => {
	const username = req.params.username
	const token = req.headers.authorization
	if (utils.checkToken(token) == false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	UsersPopularity.addMatchs(username, (err, rows) => {
		if (err) {
			console.log(err)
			return res.status(500).json({error_message : `Error`})
		} else if (rows.changedRows) {
			res_data = utils.recalcScore(username)
			console.log(`[${Date(Date.now()).toString()}]: ${username}'s profile has juste matchs!`);
			return res.status(200).json(res_data)
		}
	})
})

module.exports = router