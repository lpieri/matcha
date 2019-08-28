/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersPhotos.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/07 10:27:28 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/09 14:49:45 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var db = require('../settings/db');

var UsersPhotos = {

	/****************************************************************/
	/*							Get Methods							*/
	/****************************************************************/

	getPics (callback) {
		query = 'select uid, pic from photos';
		return db.query(query, callback);
	},

	getUserPic (username, callback) {
		data = [username]
		query = 'select pic_name, id from users_photos where username = ?'
		return db.query(query, data, callback)
	},

	setPp (data, callback) {
		data = [data.pic_name, data.username];
		query = 'update users_infos set pic = ? where username = ?';
		return db.query(query, data, callback);
	},

	/****************************************************************/
	/*						Post Methods							*/
	/****************************************************************/

	create (Photos, callback) {
		data = [Photos.username, Photos.pic_name]
		query = 'INSERT INTO users_photos (username, pic_name) values(?, ?)'
		return db.query(query, data, callback);
	},

	delete (Photos, callback) {
		data = [Photos.pid]
		query = 'delete from users_photos where id = ?'
		return db.query(query, data, callback)
	}
};

module.exports = UsersPhotos;