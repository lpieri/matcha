var db = require('../settings/db');

var UsersHistory = {

	addHistory(datas, callback) {
		data = [datas.from_username, datas.to_username]
		query = 'insert into users_history (from_username, to_username) values (?, ?)';
		return db.query(query, data, callback)
	},

	getUserHistory(to_username, callback) {
		data = [to_username]
		query = `select u.username, u.first_name, u.last_name, ui.age, ui.bio, ui.pic, ui.localization, uh.view_at
		from users as u
		inner join users_infos as ui on u.username = ui.username
		inner join users_history as uh on u.username = uh.from_username where uh.to_username = ?`;
		return db.query(query, data, callback)
	}
}

module.exports = UsersHistory;