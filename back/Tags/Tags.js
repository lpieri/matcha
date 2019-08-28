var db = require('../settings/db');

var Tags = {

	/****************************************************************/
	/*							Get Methods							*/
	/****************************************************************/

	getAllTags (callback) {
		query = `select * from tags;`
		return db.query(query, data, callback);
	},

	getTags (username, callback) {
		data = [username]
		query = `select t.name_tag, t.picture_tag from tags as t where t.name_tag != all (select user_name_tag from users_tags where username = ?);`
		return db.query(query, data, callback);
	},

	/****************************************************************/
	/*						Post Methods							*/
	/****************************************************************/

	// createTag (Tags, callback) {
	// 	data = [Tags.name_tag, Tags.picture_tag];
	// 	query = "INSERT INTO tags (name_tag, picture_tag) VALUES ('rock','music'), ('classique', 'music'), ('raeggeton', 'music'), ('soul', 'music'), ('disco', 'music'), ('rap','music'), ('blues', 'music'), ('RnB', 'music'), ('metal', 'music');";
	// 	return db.query(query, data, callback);
	// }
};

module.exports = Tags;