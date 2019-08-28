/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersToken.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/30 17:23:04 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/11 15:45:23 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var db = require('../settings/db');

const UsersToken = {

	/* ************************************************************ */
	/*						  Update Methods						*/
	/* ************************************************************ */

	updateEndatToken (token, callback) {
		data = [token]
		query = 'update users_token set end_at = now() where token = ?'
		return db.query(query, data, callback)
	},

	/* ************************************************************ */
	/*							Post Methods						*/
	/* ************************************************************ */

	createConnecToken (Token, callback) {
		data = [Token.uid, Token.token, Token.browser, Token.ip_address]
		query = 'Insert Into Users_Token(uid, token, navigator, ip_address) values(?, ?, ?, ?);'
		return db.query(query, data, callback)
	}

};

module.exports = UsersToken;