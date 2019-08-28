/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sync_db.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/31 16:57:02 by cpieri            #+#    #+#             */
/*   Updated: 2019/07/31 16:59:02 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var mysql = require('sync-mysql')

var db = new mysql({
	host: 'localhost',
	user: 'root',
	password: 'matcha',
	database: 'matcha_db'
});

module.exports = db