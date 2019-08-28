/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersBlockRoutes.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/12 10:48:31 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/12 12:20:12 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express');
var bodyParser = require('body-parser');
var UsersBlock = require('../UsersBlock/UsersBlock')
var router = express.Router();
var utils = require('../utils/utils')

router.use(bodyParser.json());

router.post('/add-block-users/:username', function (req, res) {
	const toUsername = req.params.username
	const token = req.headers.authorization
	if (utils.checkToken(token) === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	const fromUsername = utils.getUsernameByToken(token)
	data = {
		fromUsername: fromUsername,
		toUsername: toUsername
	}
	UsersBlock.createUserBlock(data, (err) => {
		if (err) {
			console.log(err)
			return res.status(500).json({error_message: 'Error'})
		} else {
			console.log(`[${Date(Date.now()).toString()}]: ${fromUsername} has just blocked this user ${toUsername}`);
			return res.status(201).json({message: 'Success'})
		}
	})
})

router.post('/remove-block-users/:username', function (req, res) {
	const toUsername = req.params.username
	const token = req.headers.authorization
	if (utils.checkToken(token) === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	const fromUsername = utils.getUsernameByToken(token)
	data = {
		fromUsername: fromUsername,
		toUsername: toUsername
	}
	UsersBlock.deleteUserBlock(data, (err) => {
		if (err) {
			console.log(err)
			return res.status(500).json({error_message: 'Error'})
		} else {
			console.log(`[${Date(Date.now()).toString()}]: ${fromUsername} has just unblocked this user ${toUsername}`);
			return res.status(201).json({message: 'Success'})
		}
	})
})

module.exports = router;