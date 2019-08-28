/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   generator.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/15 12:37:48 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/25 21:26:43 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var request = require('sync-request')
var utils = require('./utils')
var search_utils = require('../utils/search_utils')
var bcrypt = require('bcrypt')
var crypto = require('crypto')
var fs = require('fs')
var sync_db = require('../settings/sync_db')
var request_as = require('request');
var Users = require('../Users/Users');
var UsersInfos = require('../UsersInfos/UsersInfos')
var UsersPhotos = require('../UsersPhotos/UsersPhotos')
var UsersPopularity = require('../UsersPopularity/UsersPopularity')
var Search = require('../Search/Search')
var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
router.use(bodyParser.json())

const saltRound = 10


function download (uri, filename, callback) {
  request_as.head(uri, (err, res, body) => {
    request_as(uri).pipe(fs.createWriteStream(`./UsersPhotos/pictures/${filename}`)).on('close', callback);
  })
}

function randomTags(username) {
	const tagsList = [{name_tag: 'rock', picture_tag: 'music'}, {name_tag: 'classique', picture_tag: 'music'}, {name_tag: 'raeggeton', picture_tag: 'music'},
	{name_tag: 'soul', picture_tag: 'music'}, {name_tag: 'disco', picture_tag: 'music'}, {name_tag: 'rap', picture_tag: 'music'}, {name_tag: 'blues', picture_tag: 'music'},
	{name_tag: 'RnB', picture_tag: 'music'}, {name_tag: 'metal', picture_tag: 'music'}, {name_tag: 'piscine', picture_tag: 'dumbbell'}, {name_tag: 'boxe', picture_tag: 'dumbbell'},
	{name_tag: 'course', picture_tag: 'dumbbell'}, {name_tag: 'tennis', picture_tag: 'dumbbell'}, {name_tag: 'musculation', picture_tag: 'dumbbell'}, {name_tag: 'football', picture_tag: 'dumbbell'},
	{name_tag: 'danse', picture_tag: 'dumbbell'}, {name_tag: 'piscine', picture_tag: 'dumbbell'}, {name_tag: 'golf', picture_tag: 'dumbbell'}, {name_tag: 'soirée', picture_tag: 'cocktail'},
	{name_tag: 'amis', picture_tag: 'cocktail'}, {name_tag: 'lire', picture_tag: 'cocktail'}, {name_tag: 'peindre', picture_tag: 'cocktail'}, {name_tag: 'concert', picture_tag: 'cocktail'},
	{name_tag: 'cinéma', picture_tag: 'cocktail'}, {name_tag: 'restaurent', picture_tag: 'cocktail'}, {name_tag: 'action', picture_tag: 'film'}, {name_tag: 'indépendant', picture_tag: 'film'},
	{name_tag: 'animation', picture_tag: 'film'}, {name_tag: 'thriller', picture_tag: 'film'}, {name_tag: 'horreur', picture_tag: 'film'}, {name_tag: 'documentaire', picture_tag: 'film'}, {name_tag: 'science-fiction', picture_tag: 'film'}]

	tagsRandom = []
	for (let i = 0; i != 10; i++) {
		i = utils.getRandomInt(tagsList.length)
		if (tagsRandom.includes(tagsList[i]) === false) {
			tagsRandom.push(tagsList[i])
			sync_db.query('insert into users_tags (username, user_name_tag, user_picture_tag) values (?,?,?)', [username, tagsList[i].name_tag, tagsList[i].picture_tag])
		}
	}
}

function randomCity () {
	const cityList = ['Paris', 'Lyon', 'Hendaya', 'Sevran', 'Ivry-sur-Seine', 'Clichy', 'Aubervilliers', 'Villeurbanne', 'Vernay', 'Oullins']
	i = utils.getRandomInt(cityList.length)
	return (cityList[i])
}

function randomGender() {
	random = utils.getRandomInt(3)
	gender = 'Non-Binaire'
	if (random === 0) {
		gender = 'Femme'
	} else if (random === 1) {
		gender = 'Homme'
	}
	return (gender)
}

function randomOSexuel() {
	random = utils.getRandomInt(3)
	sexual_orientation = 'Bisexuelle'
	if (random === 0) {
		sexual_orientation = 'Homosexuelle'
	} else if (random === 1) {
		sexual_orientation = 'Hétérosexuelle'
	}
	return (sexual_orientation)
}

function generator (counter, country) {
	if (counter > 500 || !counter) {
		counter = 500
	}
	if (!country) {
		country = 'france'
	}
	const url = `https://uinames.com/api/?amount=${counter}&region=${country}&ext`
	const res = request('GET', url).getBody()
	const data = JSON.parse(res)
	for (let i = 0; i < data.length; i++) {
		const name = data[i].name
		const surname = data[i].surname
		const username = `${name.charAt(0)}${surname}`.toLowerCase()
		const new_data = {
			first_name: name,
			last_name: surname,
			username: username,
			email: `${name}.${surname}@gmail.com`.toLowerCase(),
			password: bcrypt.hashSync('1', saltRound),
			confirmation_token: null
		}
		Users.createUser(new_data, (err) => {
			if (err) {
				console.log('Error')
			} else {
				const file_name = `${crypto.randomBytes(10).toString('hex')}.jpg`
				const gender = randomGender()
				const sexual_orientation = randomOSexuel()
				const loc = utils.getLocWithCity(randomCity())
				const search_gender = search_utils.defineSearchGender(gender, sexual_orientation)
				download(data[i].photo, file_name, () => {
					console.log(`[${Date(Date.now()).toString()}]: ${new_data.username} picture download !`);
				})
				UsersInfos.createInfos({
					username: username,
					gender: gender,
					age: data[i].age,
					sexual_orientation: sexual_orientation,
					localization: loc,
					bio: `Je suis ${new_data.first_name} ${new_data.last_name} ! J'aime bien Matcha !! Like moi stp !!!`,
					pic: file_name,
					count_pic: 1
				}, () => (console.log(`[${Date(Date.now()).toString()}]: ${new_data.username}'s infos created !`)))
				UsersPhotos.create({
					username: username,
					pic_name: file_name
				}, () => (console.log(`[${Date(Date.now()).toString()}]: ${new_data.username}'s pictures created !`)))
				UsersPopularity.createData({
					username: username,
					matchs: utils.getRandomInt(50),
					likes: utils.getRandomInt(50),
					views: utils.getRandomInt(50)
				}, () => {
					utils.recalcScore(username)
					console.log(`[${Date(Date.now()).toString()}]: ${new_data.username}'s scores created !`)
				})
				Search.createSearch({
					username: username,
					search_age: data[i].age,
					search_gender: (search_gender === null) ? "Non-Binaire" : search_gender,
					search_sexual_orientation: sexual_orientation,
					search_localization: loc
				}, (err) => {
					if (err) {
						console.log(err)
					}
					console.log(`[${Date(Date.now()).toString()}]: ${new_data.username}'s search created !`)
				})
				randomTags(username)
				console.log(`[${Date(Date.now()).toString()}]: New User ${new_data.username} created !`);
			}
		})
	}
}

router.get('/:counter/:country?', (req, res) => {
	const counter = req.params.counter
	const country = req.params.country
	generator(counter, country)
})

module.exports = router