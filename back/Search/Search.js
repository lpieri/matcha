/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Search.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/10 11:30:55 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/25 15:02:06 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var db = require('../settings/db');

var Search = {

	getSearchInfos (datas, callback) {
		let lat = datas.lat
		let lng = datas.lng
		base_query = `select ui.pic, ui.age, ui.localization, u.first_name, u.last_name, u.username, ui.lat, ui.lng, u.username, up.score,
		(6371 * acos(cos(radians(${lat})) * cos(radians(lat)) * cos(radians(lng) - radians(${lng})) + sin(radians(${lat})) * sin(radians(lat)))) as distance
		from search as s inner join users as u on u.username = s.username inner join users_infos as ui on ui.username = s.username
		inner join users_popularity as up on up.username = s.username inner join users_tags as ut on ut.username = s.username`
		end_query = ` group by u.username having distance < ${datas.distance} order by distance` + ((datas.limit === 10) ? ' limit 10' : '')
		tags = (datas.tags != null) ? ` and ut.user_name_tag in (${datas.tags.map(el => {return `'${el}'`})})` : ' and ut.user_name_tag = any (select user_name_tag from users_tags where username = ?)'
		if (datas.gender === null) {
			data = [datas.mySexualOrientation, datas.maxAge, datas.minAge,
				datas.maxScore, datas.minScore, datas.myUsername, datas.myUsername]
			where_query = ` where s.search_sexual_orientation = ? and ui.age <= ? and ui.age >= ?
				and up.score <= ? and up.score >= ? and u.username != ?`
			where_query += tags
		} else {
			data = [datas.mySexualOrientation, datas.myGender, datas.gender, datas.maxAge,
				datas.minAge, datas.maxScore, datas.minScore, datas.myUsername, datas.myUsername]
			where_query = ` where s.search_sexual_orientation = ? and s.search_gender = ?
				and ui.gender = ? and ui.age <= ? and ui.age >= ?
				and up.score <= ? and up.score >= ? and u.username != ?`
			where_query += tags
		}
		query = base_query + where_query + end_query
		return db.query(query, data, callback)
	},

	updateSearchSexualOrientation (Search, callback) {
		data = [Search.searchSexualOrientation, Search.username]
		query = 'update search set search_sexual_orientation = ? where username = ?';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query,data);
		}
	},

	updateSearchGender (Search, callback) {
		data = [Search.searchGender, Search.username]
		query = 'update search set search_gender = ? where username = ?';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query,data);
		}
	},

	createSearch (datas, callback) {
		data = [datas.username, datas.search_gender, datas.search_sexual_orientation, datas.search_localization]
		query = 'INSERT INTO search(username, search_gender, search_sexual_orientation, search_localization) values(?, ?, ?, ?);'
		return db.query(query, data, callback)
	},


	createDefaultSearch (Username, callback) {
		data = [Username]
		query = 'INSERT INTO search(username) values(?);'
		return db.query(query, data, callback)
	}
};

module.exports = Search;
