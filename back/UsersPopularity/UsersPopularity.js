/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersPopularity.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/10 11:20:30 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/15 18:32:00 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var db = require('../settings/db');

var UsersPopularity = {

	addViews (username, callback) {
		data = [username]
		query = 'update users_popularity set views = views + 1 where username = ?'
		return db.query(query, data, callback)
	},

	addLikes (username, signe, callback) {
		data = [username]
		query = `update users_popularity set likes = likes ${signe} 1 where username = ?`
		return db.query(query, data, callback)
	},

	addMatchs (username, callback) {
		data = [username]
		query = 'update users_popularity set likes = likes + 1 where username = ?'
		return db.query(query, data, callback)
	},

	createData (datas, callback) {
		data = [datas.username, datas.matchs, datas.likes, datas.views]
		query = 'insert into users_popularity(username, matchs, likes, views) values(?, ?, ?, ?)'
		return db.query(query, data, callback)
	},

	createDefaultData (username, callback) {
		data = [username]
		query = 'insert into users_popularity(username) values(?)'
		return db.query(query, data, callback)
	}

};

module.exports = UsersPopularity;