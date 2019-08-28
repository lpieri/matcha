/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Users.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/31 13:18:44 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/25 23:23:53 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var db = require('../settings/db');

var Users = {

	/****************************************************************/
	/*							Get Methods							*/
	/****************************************************************/

	getUsers (callback) {
		query = 'Select * from users';
		return db.query(query, callback);
	},

	getPassToken (Token, callback) {
		if (Token) {
			data = [Token];
			query = 'select id, username from users where reset_token = ?';
		}
		return db.query(query, data, callback);
	},

	getUser (Users, callback) {
		if (Users.username) {
			data = [Users.username];
			query = 'select * from users where username = ?';
		} else if (Users.id) {
			data = [Users.id];
			query = 'select * from users where id = ?';
		}
		return db.query(query, data, callback);
	},

	getBasicInfos (username, callback) {
		data = [username];
		query = 'select first_name, last_name, email from users where username = ?';
		return db.query(query, data, callback);
	},

	getUserEmail (Users, callback) {
		data = [Users.username];
		query = 'select email from users where username = ?';
		return db.query(query, data, callback);
	},

	getPassword (Users, callback) {
		if (Users.username) {
			data = [Users.username];
			query = 'select password, confirmation_token, id from users where username = ?';
		} else if (Users.remember_token) {
			data = [Users.remember_token];
			query = 'select password from users where remember_token = ?';
		}
		return db.query(query, data, callback);
	},

	/****************************************************************/
	/*						Update Methods							*/
	/****************************************************************/

	confirmeEmail (Users, callback) {
		data = [Users.token];
		query = 'update users set confirmation_token = null where confirmation_token = ?';
		return db.query(query, data, callback);
	},

	requestResetPass (Users, callback) {
		data = [Users.reset_token, Users.username];
		query = 'update users set reset_token = ? where username = ?';
		return db.query(query, data, callback);
	},

	updatePassword (Users, callback) {
		data = [Users.password, Users.username];
		query = 'update users set password = ? where username = ?';
		return db.query(query, data, callback);
	},

	updateEmail (Users, callback) {
		data = [Users.email, Users.username]
		query = 'update users set email = ? where username = ?';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query, data);
		}
	},

	updateFirstName (Users, callback) {
		data = [Users.first_name, Users.username]
		query = 'update users set first_name = ? where username = ?';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query, data);
		}
	},

	updateLastName (Users, callback) {
		data = [Users.last_name, Users.username]
		query = 'update users set last_name = ? where username = ?';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query, data);
		}
	},

	changePassword (Users, callback) {
		data = [Users.reset_token, Users.password, Users.username];
		query = 'update users set reset_token = ?, password = ? where username = ?';
		return db.query(query, data, callback);
	},

	/****************************************************************/
	/*						Post Methods							*/
	/****************************************************************/

	createUser (Users, callback) {
		data = [Users.first_name, Users.last_name, Users.username, Users.email, Users.password, Users.confirmation_token];
		query = 'INSERT INTO USERS(first_name, last_name, username, email, password, confirmation_token) values(?, ?, ?, ?, ?, ?)';
		return db.query(query, data, callback);
	},
}

module.exports = Users;