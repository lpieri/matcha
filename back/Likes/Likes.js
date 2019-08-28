/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Likes.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/10 15:27:02 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/10 17:37:54 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var db = require('../settings/db')

var Likes = {

	getLikes (datas, callback) {
		data = [datas.fromUsername, datas.toUsername]
		query = 'select * from likes where from_username = ? and to_username = ?'
		return db.query(query, data, callback)
	},

	getUserAllLikes(to_username, callback) {
		data = [to_username]
		query = `select u.username, u.first_name, u.last_name, ui.age, ui.bio, ui.pic, ui.localization
		from users as u
		inner join users_infos as ui on u.username = ui.username
		inner join likes as l on u.username = l.from_username where l.to_username = ?`;
		return db.query(query, data, callback)
	},

	create (datas, callback) {
		data = [datas.fromUsername, datas.toUsername]
		query = 'insert into likes(from_username, to_username) values(?, ?)'
		return db.query(query, data, callback)
	},

	delete (datas, callback) {
		data = [datas.fromUsername, datas.toUsername]
		query = 'delete from likes where from_username = ? and to_username = ?'
		return db.query(query, data, callback)
	}


}

module.exports = Likes