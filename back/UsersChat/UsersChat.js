var db = require('../settings/db');

var UsersChat = {

addMessage(UsersChat, callback) {
	data = [UsersChat.username, Userschat.message]
	query = 'insert into users_chat (username, message) values (?,?)';
	if (callback){
		return db.query(query, data, callback);
	} else {
		return db.query(query, data);
	}
},

createRoom(data, callback) {
	data = [data.username_1, data.username_2]
	query = 'insert into chatroom (username_1, username_2) values (?,?)';
	if (callback){
		return db.query(query, data, callback);
	} else {
		return db.query(query, data);
	}
},

deleteRoomOne(data, callback) {
	data = [data.username_1, data.username_2]
	query = 'delete from chatroom where username_1 = ? and username_2 = ?';
	if (callback){
		return db.query(query, data, callback);
	} else {
		return db.query(query, data);
	}
},

deleteRoomTwo(data, callback) {
	data = [data.username_2, data.username_1]
	query = 'delete from chatroom where username_1 = ? and username_2 = ?';
	if (callback){
		return db.query(query, data, callback);
	} else {
		return db.query(query, data);
	}
},

getUserChat(username, callback) {
	data = [username]
	query = `select u.username, u.first_name, u.last_name, ui.pic, ui.localization, uc.send_at
	from users as u
	inner join users_infos as ui on u.username = ui.username
	inner join users_chat as uc on u.username = uc.username where uc.username = ?`;
	return (db.query, data, callback)
	}
}

module.exports = UsersChat;