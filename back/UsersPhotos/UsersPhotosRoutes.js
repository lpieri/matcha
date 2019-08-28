/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersPhotosRoutes.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/07 11:56:38 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/09 15:04:58 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
const crypto = require('crypto');
var UsersPhotos = require('./UsersPhotos');
var utils = require('../utils/utils')
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.json({limit: '20mb', extended: true}))
router.use(bodyParser.urlencoded({limit: '20mb', extended: true}))

/*************************************************************************************/
/**								Route Api Only get Methods							 */
/*************************************************************************************/

router.get('/get-all/:username', (req, res) => {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkToken(token)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to get this information'})
	}
	UsersPhotos.getUserPic(username, (err, rows) => {
		if (err) {
			return res.status(500).json({error_message: "Error"})
		} else if (rows) {
			data = {
				count_pic: utils.getNbImageUser(username),
				images: rows
			}
			console.log(`[${Date(Date.now()).toString()}]: ${username} pictures get by this ${token}!`);
			return res.status(200).json(data)
		}
	})
})


/*************************************************************************************/
/**								Route Api Only get Methods							 */
/*************************************************************************************/

router.put('/set-pp/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to get this information'})
	}
	const data = {
		username: username,
		pic_name: req.body.data.pic_name
	}
	UsersPhotos.setPp(data, (err, rows) => {
		if (err) {
			res.status(500).json(err);
		} else if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his pp!`);
			return res.status(200).json({message : `Success Loc`})
		}
	});
});

router.post('/create/:username', (req, res) => {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	const count_pic = utils.getNbImageUser(username)
	if (auth === false || count_pic === false || count_pic >= 5) {
		return res.status(401).json({authorization: 'You are not allowed to create this photo'})
	}
	const type = req.body.data.image_type.split('/')[1]
	const pic_name = `${crypto.randomBytes(10).toString('hex')}.${type}`
	const pic_data = req.body.data.image_data.split(',')[1]
	const buff = new Buffer(pic_data, 'base64');
	fs.writeFileSync(`./UsersPhotos/pictures/${pic_name}`, buff)
	const data = {
		pic_name: pic_name,
		username: username
	}
	UsersPhotos.create(data, (err, rows) => {
		if (err) {
			return res.status(500).json({error_message: 'Error'});
		} else {
			const new_id = rows.insertId
			utils.incrementCountImageUser(username, '+')
			console.log(`[${Date(Date.now()).toString()}]: ${username} upload new Photo ${pic_name} !`);
			return res.status(201).json({message: "Success", pic_name: pic_name, id: new_id});
		}
	})
})

router.post('/delete/:username', (req, res) => {
	const username = req.params.username
	const token = req.headers.authorization
	if (utils.checkAuthToken(token, username) === false) {
		return res.status(401).json({authorization: 'You are not allowed to delete this photo'})
	}
	const data = {
		pid: req.body.data.id,
		username: username
	}
	UsersPhotos.delete(data, (err) => {
		if (err) {
			return res.status(500).json({error_message: 'Error'})
		} else {
			const pic_name = req.body.data.pic_name
			fs.unlinkSync(`./UsersPhotos/pictures/${pic_name}`)
			utils.incrementCountImageUser(username, '-')
			console.log(`[${Date(Date.now()).toString()}]: ${username} delete this Photo ${pic_name} !`);
			return res.status(200).json({message: "Success"});
		}
	})
})

module.exports = router