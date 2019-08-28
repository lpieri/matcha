/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersBlock.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/12 10:29:41 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/12 12:20:13 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var db = require('../settings/db')

var UsersBlock = {

	createUserBlock (datas, callback) {
		data = [datas.fromUsername, datas.toUsername]
		query = 'insert into users_block(from_username, to_username) values(?, ?)'
		return db.query(query, data, callback)
	},

	deleteUserBlock (datas, callback) {
		data = [datas.fromUsername, datas.toUsername]
		query = 'delete from users_block where from_username = ? and to_username = ?'
		return db.query(query, data, callback)
	}

}

module.exports = UsersBlock