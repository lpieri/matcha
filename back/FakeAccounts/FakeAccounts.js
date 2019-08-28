var db = require('../settings/db');

var FakeAccounts = {

	addFakeAccounts (username, callback) {
		data = [username]
		query = 'insert into fake_accounts (username) values (?)';
		if (callback) {
			return db.query(query, data, callback);
		} else {
			return db.query(query, data);
		}
	}
}

module.exports = FakeAccounts;