require('./settings/setup_db');
var utils = require('./utils/utils')
var db = require('./settings/db')
const app = require('./settings/app');

const url = 'localhost';
const port = 3001;

const server = app.listen(port, function () {
	console.log(`---  Server Start in Url http://${url}:${port} ---`);
	console.log('-----------------------------------------------------');
	const all_routes = require('express-list-endpoints');
	console.log(all_routes(app));
	console.log('-----------------------------------------------------');
});

const io = require('socket.io')(server);


io.on('connection', function(socket) {
	console.log(socket.id)
	console.log("La connexion à fonctionné.")


/**
 *
 * SEND MESSAGE
 *
 **/
	socket.on('SEND_MESSAGE', function(data) {
		console.log(data)

		data.send_at = Date.now();
		socket.join(data.id_room);
		db.query('INSERT INTO users_chat(username, message, send_at, id_room) values(?, ?, ?, ?)', [
			data.username,
			data.message,
			new Date(data.send_at),
			data.id_room
			], function (err) {
				if (err){
				socket.emit('error', err.code)
			} else {
				db.query(`select pic from users_infos where username = ?`, [data.username], (err, rows) => {
					if (rows) {
						if (rows[0]) {
							data['pic'] = rows[0].pic
							console.log(data)
							console.log('colin')
							// io.sockets.emit('MESSAGE', data)
							io.to(data.id_room).emit('MESSAGE', data)
						}
					}
				})
			}
		})
	});


/**
 *
 * GET MESSAGE
 *
 **/

	socket.on('GET_MESSAGE', function (data) {
		console.log(data)
		db.query(`select u.username, u.first_name, u.last_name, ui.pic, uc.message, uc.send_at
		from users as u
		inner join users_infos as ui on u.username = ui.username
		inner join users_chat as uc on u.username = uc.username where id_room = ? ORDER BY send_at desc limit 10`, [data.id_room], (err, rows) => {
			if (err) {
				socket.emit('error', err.code)
			} else {
				io.emit('RECEIVE_MESSAGE', rows)
			}
		})
	});


/**
 *
 * GET ID ROOM
 *
 **/

	socket.on('GET_USERNAME', function (data) {
		// console.log('debug')
		console.log(data)
		db.query(`select id, username_1, username_2 from chatroom where username_1 = ? and username_2 = ?`, [data.to_user, data.user], (err, rows) => {

			if (rows[0] != undefined){
				console.log('me')
				io.emit('GET_IDROOM', rows)
			} else {
				db.query(`select id, username_1, username_2 from chatroom where username_1 = ? and username_2 = ?`, [data.user, data.to_user], (err, rows) => {
					if (rows[0] != undefined){
						console.log('not me')
						io.emit('GET_IDROOM', rows)
					}
				})
			}
		})
	});


	socket.on('getMyFriends', function (data) {
		console.log(data)
		db.query(`select u.username, u.first_name, u.last_name, ui.pic, c.id, c.username_1, c.username_2
		from users as u
		inner join users_infos as ui on u.username = ui.username
		inner join chatroom as c on u.username = c.username_2 where c.username_1 = ?`, [data.user, data.to_user], (err, rows) => {
			let rows_1 = rows
			db.query(`select u.username, u.first_name, u.last_name, ui.pic, c.id, c.username_1, c.username_2
			from users as u
			inner join users_infos as ui on u.username = ui.username
			inner join chatroom as c on u.username = c.username_1 where c.username_2 = ?`, [data.user, data.to_user], (err, rows) => {
				let rows_2 = rows
				let final_rows = rows_1.concat(rows_2)
				console.log(final_rows)
				socket.emit('getIdRoom', final_rows)
			})
		})
	});

	socket.on('sendIdRoom', function (data) {
		console.log(data)
		db.query(`select u.username, u.first_name, u.last_name, ui.pic, uc.message, uc.send_at
		from users as u
		inner join users_infos as ui on u.username = ui.username
		inner join users_chat as uc on u.username = uc.username where id_room = ? ORDER BY send_at desc limit 10`, [data.id], (err, rows) => {
			if (err) {
				socket.emit('error', err.code)
			} else {
				socket.emit('RECEIVE_MESSAGE', rows)
			}
		})
	});


});




