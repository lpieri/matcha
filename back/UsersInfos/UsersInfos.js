/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersInfos.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/01 10:25:27 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/24 14:28:23 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var db = require('../settings/db');

var	UsersInfos = {

	getInfos (Username, callback) {
		data = [Username]
		query = `select u.username, u.first_name, u.last_name, ui.age, ui.bio, ui.localization, ui.gender, ui.sexual_orientation, ui.pic, s.search_gender, s.search_sexual_orientation, s.search_localization, up.views, up.likes, up.score
				from users as u
				inner join users_infos as ui on u.username = ui.username
				inner join search as s on u.username = s.username
				inner join users_popularity as up on u.username = up.username
				where u.username = ?`
		return db.query(query, data, callback)
	},

	updateBio (Users, callback) {
		data = [Users.bio, Users.username]
		query = 'update users_infos set bio = ? where username = ?';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query, data);
		}
	},

	updateLocalization (Users, callback) {
		data = [Users.localization, Users.lat, Users.lng, Users.username]
		query = 'update users_infos set localization = ?, lat = ?, lng = ? where username = ?';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query, data);
		}
	},

	updateAge (Users, callback) {
		data = [Users.age, Users.username]
		query = 'update users_infos set age = ? where username = ?';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query, data);
		}
	},


	updateSexualOrientation (Users, callback) {
		data = [Users.sexual_orientation, Users.username]
		query = 'update users_infos set sexual_orientation = ? where username = ?';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query, data);
		}
	},

	updateGender (Users, callback) {
		data = [Users.gender, Users.username]
		query = 'update users_infos set gender = ? where username = ?';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query, data);
		}
	},

	createInfos (Infos, callback) {
		data = [Infos.username, Infos.gender, Infos.age, Infos.sexual_orientation, Infos.localization, Infos.bio, Infos.pic, Infos.count_pic]
		query = 'Insert into users_infos(username, gender, age, sexual_orientation, localization, bio, pic, count_pic) values(?, ?, ?, ?, ?, ?, ?, ?)'
		return db.query(query, data, callback)
	},

	createDefaultInfos (Username, callback) {
		data = [Username]
		query = 'INSERT INTO USERS_INFOS(username) values(?);'
		return db.query(query, data, callback)
	}
};

module.exports = UsersInfos;