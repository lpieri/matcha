/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/31 13:09:50 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/26 12:40:15 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var db = require('../settings/sync_db');
var request = require('sync-request')
var accents = require('remove-accents');

const googleApiToken = 'token'

function checkIfUsernameExist(username) {
	res = db.query('select id from users where username = ?', [username])
	if (res[0]) {
		if (res[0].id === null) {
			return false
		} else {
			return true
		}
	}
}

function checkAuthToken(auth, username) {
	const token = auth.split(' ')[1]
	result = db.query('select id from users where username = ?', [username])
	const uid = result[0].id
	result = db.query('select uid from users_token where token = ?', [token])
	if (result[0]) {
		if (uid === result[0].uid) {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}

function checkToken(auth) {
	if (auth != null) {
		const token = auth.split(' ')[1]
		result = db.query('select uid from users_token where token = ?', [token])
		if (result[0]) {
			if (result[0].uid) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	} else {
		return false
	}
}

function checkAdminAuth(auth, username) {
	const ret = checkAuthToken(auth, username)

	if (ret === true) {
		result = db.query('select admin from users where username = ?', [username])
		if (result[0].admin === 1) {
			return (true)
		} else {
			return (false)
		}
	} else {
		return (false)
	}
}

function getUsernameByToken(auth) {
	const token = auth.split(' ')[1]
	result = db.query('select uid from users_token where token = ?', [token])
	const uid = result[0].uid
	result = db.query('select username from users where id = ?', [uid])
	return result[0].username
}

function checkConnectByUsername(username) {
	result = db.query('select id from users where username = ?', [username])
	var uid = 0
	if (result[0])
		uid = result[0].id
	result = db.query('select end_at from users_token where uid = ? order by end_at desc', [uid])
	var last_connect = null
	var is_connected = false
	if (result[0]) {
		all = result
		last_connect = all[0].end_at
		for (let i = 0; i < all.length; i++) {
			if (all[i].end_at === null) {
				last_connect = null
				is_connected = true
			}
		}
	}
	return {last_connect: last_connect, is_connected: is_connected}
}

function getCityWithLoc(localization) {
	const latitude = Number(localization.split(',')[0].split(':')[1])
	const longitude = Number(localization.split(',')[1].split(':')[1])
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiToken}`
	let res = request('GET', url).getBody()
	const data = JSON.parse(res)
	let city = null
	for (let i = 0; i < data.results.length; i++) {
		if (data.results[i].address_components && city === null) {
			for (let y = 0; y < data.results[i].address_components.length; y++) {
				if (data.results[i].address_components[y].types[0] === 'locality') {
					city = data.results[i].address_components[y].long_name
					break
				}
			}
		}
	}
	if (city === null) {
		city = "The Earth"
	}
	return (city)
}

function getLocWithCity(city) {
	city = accents.remove(city)
	const url = `https://maps.googleapis.com/maps/api/geocode/json?components=locality:${city}|country:FR&key=${googleApiToken}`
	let res = request('GET', url).getBody()
	const data = JSON.parse(res)
	if (data.results[0] != undefined) {
		let localization = `latitude:${data.results[0].geometry.location.lat}, longitude:${data.results[0].geometry.location.lng}`
		return localization
	} else {
		return null
	}
}

function getNbImageUser(username) {
	result = db.query('select count_pic from users_infos where username = ?', [username])
	if (result[0]) {
		return result[0].count_pic
	} else {
		return false
	}
}

function incrementCountImageUser(username, signe) {
	result = db.query(`update users_infos set count_pic = count_pic ${signe} 1 where username = ?`, [username])
	if (result.changedRows === 1) {
		return true
	} else {
		return false
	}
}

function recalcScore(username) {
	result = db.query('select views, likes, matchs, score from users_popularity where username = ?', [username])
	const total = result[0].views + result[0].likes + result[0].matchs
	const new_score = (result[0].views + result[0].likes * 2 + result[0].matchs * 8) / 100 * total
	res = db.query('update users_popularity set score = ? where username = ?', [new_score, username])
	return ({score: new_score, views: result[0].views, likes: result[0].likes})
}

function likeCheckIfMatch(datas) {
	data = [datas.toUsername, datas.fromUsername]
	result = db.query('select * from likes where from_username = ? and to_username = ?', data)
	if (result[0]) {
		return true
	}
	return false
}

function incrementCountMatch(datas, signe) {
	data = [datas.toUsername, datas.fromUsername]
	result = db.query(`update users_popularity set matchs = matchs ${signe} 1 where username = ?`, [datas.fromUsername])
	result = db.query(`update users_popularity set matchs = matchs ${signe} 1 where username = ?`, [datas.toUsername])
}

function checkIfRoomExist(datas) {
	data = [datas.username_1, datas.username_2]
	result = db.query('select * from chatroom where username_1 = ? and username_2 = ?', data);
	if (result[0]) {
		return 1
	} else {
		data = [datas.username_2, datas.username_1]
		console.log('test')
		result = db.query('select * from chatroom where username_1 = ? and username_2 = ?', data);
		console.log(result)
		if (result[0]) {
			return 2
		} else {
			return 3
		}
	}
}


function checkIfUsersIsBlocked (datas) {
	data = [datas.fromUsername, datas.toUsername]
	result = db.query('select * from users_block where from_username = ? and to_username = ?', data)
	if (result[0] != undefined) {
		return {blockedTo: true, blockedBy: false}
	}
	data = [datas.toUsername, datas.fromUsername]
	result = db.query('select * from users_block where from_username = ? and to_username = ?', data)
	if (result[0] != undefined) {
		return {blockedTo: false, blockedBy: true}
	}
	return {blockedTo: false, blockedBy: false}
}

function getLikes(datas) {
	data = [datas.fromUsername, datas.toUsername]
	query = 'select * from likes where from_username = ? and to_username = ?'
	return db.query(query, data)
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function addLocLikeInRow(fromUsername, rows) {
	for (let i = 0; i < rows.length; i++) {
		rows[i]['localization'] = getCityWithLoc(rows[i]['localization']);
		const data = {
			fromUsername: fromUsername,
			toUsername: rows[i].username
		}
		isBlocked = checkIfUsersIsBlocked(data)
		if (isBlocked.blockedTo === true || isBlocked.blockedBy === true) {
			rows.splice(i, 1)
			i--
			continue
		}
		likes_rows = getLikes(data)
		if (!likes_rows[0]) {
			rows[i]['liked'] = false
			continue
		} else {
			rows[i]['liked'] = true
			if (likeCheckIfMatch(data) === true) {
				rows[i]['matched'] = true
				continue
			}
			rows[i]['matched'] = false
			continue
		}
	}
	return (rows)
}


module.exports = {
	checkIfUsernameExist: checkIfUsernameExist,
	checkAuthToken: checkAuthToken,
	checkAdminAuth: checkAdminAuth,
	checkToken: checkToken,
	getUsernameByToken: getUsernameByToken,
	checkConnectByUsername: checkConnectByUsername,
	getCityWithLoc: getCityWithLoc,
	getLocWithCity: getLocWithCity,
	incrementCountImageUser: incrementCountImageUser,
	getNbImageUser: getNbImageUser,
	recalcScore: recalcScore,
	likeCheckIfMatch: likeCheckIfMatch,
	incrementCountMatch: incrementCountMatch,
	checkIfUsersIsBlocked: checkIfUsersIsBlocked,
	getLikes: getLikes,
	getRandomInt: getRandomInt,
	addLocLikeInRow: addLocLikeInRow,
	checkIfRoomExist: checkIfRoomExist
}
