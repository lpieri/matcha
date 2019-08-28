var db = require('../settings/db');

var UsersTags = {

	openTags (UsersTags, callback) {
		data = [UsersTags.username, UsersTags.user_name_tag, UsersTags.user_picture_tag]
		query = 'insert into users_tags (username, user_name_tag, user_picture_tag) values (?,?,?)';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query, data);
		}
	},

	deleteTag (UsersTags, callback) {
		data = [UsersTags.id]
		query = 'delete from users_tags where id = ?';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query, data);
		}
	},

	getUserTags (username, callback) {
		if (username) {
			data = [username];
			query = 'select id, user_name_tag, user_picture_tag from users_tags where username = ?'
		}
		return db.query(query, data, callback);

	}
}

module.exports = UsersTags;