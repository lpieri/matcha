/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersNotifs.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/05 12:23:38 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/05 18:40:04 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var db = require('../settings/db');

var UsersNotifs = {

	getMsgNotifs (username, callback) {
		data = [username]
		query = `select id from users_notifs where notif like '%message%' AND username = ? AND vu = '0';`
		return db.query(query, data, callback)
	},

	updateMsgNotifs (username, callback) {
		data = [username]
		query = `update users_notifs set vu = '1' where username = ?;`
		return db.query(query, data, callback)
	},

	getAllNotifs (username, callback) {
		data = [username]
		query = `select notif, link, vu, create_at, id from users_notifs where username = ? order by create_at desc limit 20;`
		return db.query(query, data, callback)
	},


	updateSee (id, callback) {
		data = [id]
		query = 'update users_notifs set vu = 1 where id = ?'
		return db.query(query, data, callback)
	},

	createNotif (data, callback) {
		data = [data.username, data.notif, data.link]
		query = `insert into users_notifs(username, notif, link) values(?, ?, ?);`
		return db.query(query, data, callback);
	}
}

module.exports = UsersNotifs