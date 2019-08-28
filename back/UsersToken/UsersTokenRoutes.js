/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersTokenRoutes.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/11 15:46:05 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/11 16:10:54 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var UsersToken = require('./UsersToken')

router.use(bodyParser.json())

router.get('/disconnect', (req, res) => {
	const token = req.headers.authorization.split(' ')[1]
	UsersToken.updateEndatToken(token, (err, rows) => {
		if (err) {
			return res.status(500).json({error_message: 'Error'})
		} else if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: Good Bye ${token}!`)
			return res.status(200).json({message: 'Success'})
		}
	})
})

module.exports = router