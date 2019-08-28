/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UsersRoutes.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/31 13:18:54 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/26 15:52:54 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var mailer = require('../settings/mailerConfig');
var Users = require('./Users');
var UsersToken = require('../UsersToken/UsersToken')
var UsersInfos = require('../UsersInfos/UsersInfos')
var UsersPopularity = require('../UsersPopularity/UsersPopularity')
var Search = require('../Search/Search')
var router = express.Router();
var utils = require('../utils/utils')

/**
 * Const Variable
 */
const saltRound = 10;
const crypto = require('crypto');


router.use(bodyParser.json());

/*************************************************************************************/
/**								Route Api Only get Methods							 */
/*************************************************************************************/

/**
 * Route Api for get all users
 */
router.get('/get-all', function (req, res) {
	Users.getUsers(function (err, rows) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.json(rows);
		}
	});
});

router.get('/get-basic-info/:username', (req, res) => {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	Users.getBasicInfos(username, (err, rows) => {
		if (err) {
			return res.status(400).json({error_message: 'Error'});
		} else {
			if (!rows[0]) {
				return res.status(400).json({error_message: 'No data link at this username !'});
			}
			return res.status(200).json(rows[0]);
		}
	});
})

router.get('/reset-password/:token', function (req, res) {
	Users.getPassToken(req.params.token, function (err, rows) {
		if (err) {
			res.status(400).json(err);
		} else {
			if (!rows[0]) {
				res.status(400).json({message: 'No data link at this token !'});
			}
			res.status(200).json(rows[0]);
		}
	});
});


/*************************************************************************************/
/**							Route Api can update value in Db						 */
/*************************************************************************************/

/**
 * Route Api for send email for reset user password
 *
 * This route generate a token update user and send email at this user
 *
 * @method Get
 * @params :id it's the username of user who do request
 * @argument req it's the all request body (req.params for get params or req.body.data for get data post)
 * @argument res it's the response of request html
 */
router.get('/request-reset-password/:id', function (req, res) {
	let token = crypto.randomBytes(50).toString('hex');
	data = {
		reset_token: token,
		username: String(req.params.id)
	}
	Users.requestResetPass(data, function (err, rows) {
		if (err) {
			console.log(err);
		} else {
			if (rows.changedRows == 0) {
				res.status(400).json({message: 'Failure your username doesn\'t exist'});
			} else {
				Users.getUserEmail({username: String(req.params.id)}, function (err, rows) {
					if (err) {
						console.log(err);
					} else {
						const email = rows[0].email;
						const subject = 'Matcha: Nouveau mot de passe';
						const message = `Clique sur le lien pour changer de mot de passe, \n\nhttp://localhost:8080/#/reset-password/${token}\n\nA tout de suite ;) !`;
						mailer.sendEmail(email, subject, message);
					}
				});
				res_data = {
					message: 'Success you have recieve mail'
				};
				res.status(200).json(res_data);
			}
		}
	});
});

router.get('/confirme-email/:token', function (req, res) {
	const data = {
		token: req.params.token
	};
	Users.confirmeEmail(data, function (err, rows) {
		if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: A user has validated his email!`);
			res.status(200).json({message: `Your email was confirmed !`});
		} else {
			res.status(400).json({message: `Error`});
		}
	});
});

/**
 * Route Api for update email
 *
 * This route update email for a particular token
 */

router.put('/update-email/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.email === null) {
		return (res.status(200).json({error_message: `Data in input is egal at null`}));
	}
	data = {
		email: req.body.data.email,
		username: username
	}
	Users.updateEmail(data, function (err, rows) {
		if (err) {
			return res.status(400).json({message : `Error`})
		} else if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his email!`);
			return res.status(200).json({message : `Success Email`})
		}
	});
});

/**
 * Route Api for update last_name with confimation
 *
 * This route update last_name for a specific token
 */
router.put('/update-last-name/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.last_name === null) {
		return (res.status(200).json({err_message: `Data in input is egal at null`}));
	}
	data = {
		last_name: req.body.data.last_name,
		username: username
	}
	Users.updateLastName(data, function (err, rows) {
		if (err) {
			return res.status(400).json({error_message : `Error`})
		} else if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his last_name!`);
			return res.status(200).json({message : `Success Last Name`})
		}
	});
});

/**
 * Route Api for update first_name with confimation
 *
 * This route update first_name for a specific token
 */
router.put('/update-first-name/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	if (req.body.data.first_name === null) {
		return (res.status(200).json({error_message: `Data in input is egal at null`}));
	}
	data = {
		first_name: req.body.data.first_name,
		username: username
	}
	Users.updateFirstName(data, function (err, rows) {
		if (err) {
			return res.status(400).json({error_message : `Error`})
		} else if (rows.changedRows) {
			console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his first_name!`);
			return res.status(200).json({message : `Success First Name`})
		}
	});
});
/**
 * Route Api for update password with confimation
 *
 * This route update password for a specific token
 */
router.put('/update-password/:username', function (req, res) {
	const username = req.params.username
	const token = req.headers.authorization
	const auth = utils.checkAuthToken(token, username)
	if (auth === false) {
		return res.status(401).json({authorization: 'You are not allowed to update this information'})
	}
	const oldPassword = req.body.data.old_password;
	const confirmationPassword = req.body.data.confirmation_password;
	const newPassword = req.body.data.new_password;
	if (oldPassword === null || confirmationPassword === null || newPassword === null) {
		return (res.status(200).json({message: `Data in input is egal at null`}));
	}
	const data = {
		username: username
	};
	Users.getPassword(data, (err, rows) => {
		const password = rows[0].password;
		const check_pass = bcrypt.compareSync(oldPassword, password);
		if (check_pass === true) {
			if (newPassword === confirmationPassword) {
				const check_pwd = bcrypt.compareSync(newPassword, password);
				if (check_pwd === false) {
					new_data = {
						password: bcrypt.hashSync(newPassword, saltRound),
						username: username
					}
					Users.updatePassword(new_data, function (err, rows) {
						if (rows.changedRows) {
							console.log(`[${Date(Date.now()).toString()}]: ${username} has just changed his password!`);
							res.status(200).json({message: `Password update`});
						} else {
								res.status(400).json({error_message: `Error`});
						}
					});
				}
			}
		}
	});
});

/*************************************************************************************/
/**								Route Api only Post Methods							 */
/*************************************************************************************/

/**
 *	Route Api for request of connection
 *
 *	This route Api check if the password send and the password saved in db are the same,
 *	if the passwords are not the same we return error, else we check if this user
 *	are confirmed this email, if this email are confirmed this route generate a random
 *	unique token and update the user in db and return Success with token
 *
 *	@method Post
 *	@params :username it's the username of user
 *	@argument req it's the all request body (req.params for get params or req.body.data for get data post)
 *	@argument res it's the response of request html
 */
router.post('/connect/:username', function (req, res) {
	const data = req.body.data;
	const password = data.password;
	const username = req.params.username;
	const new_data = { username: username };
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	const navigator = req.useragent

	if (navigator.isBot === true || navigator.isCurl === true) {
		res.status(403).json({msg: 'Bot or Curl doesn\'t authorized'})
		console.log(`[${Date(Date.now()).toString()}]: Curl or Bot request, his IP Address: ${ip}`)
		return
	}
	Users.getPassword(new_data, function (err, rows) {
		if (err) {
			res.status(500).json({error_message: 'Error !'});
			console.log(err);
		} else if (rows[0] && rows[0].confirmation_token === null && 'password' in rows[0]) {
			const password_hash = rows[0].password;
			const check_pass = bcrypt.compareSync(password, password_hash);

			if (check_pass === false) {
				res.status(200).json({error_message: `Failure !! Password invalid.`});
			} else if (check_pass === true) {
				const new_token = crypto.randomBytes(50).toString('hex');
				const post_data = {
					uid: rows[0].id,
					token: new_token,
					browser: navigator.browser,
					ip_address: ip
				}

				UsersToken.createConnecToken(post_data, (err, rows) => {
					if (err) {
						res.status(500).json({error_message: 'Failed !'});
					}
					console.log(`[${Date(Date.now()).toString()}]: Welcome back ${username} !`);
					res.status(201).json({
						message: `Succes !! Welcome back ${username}`,
						token: new_token
					});
				});
			}
		} else {
			res.status(200).json({error_message: `Failure !! Please Confirme your email !`});
		}
	});
});

router.post('/reset-password/:token', function (req, res) {
	const data = req.body.data;
	const new_hash = bcrypt.hashSync(data.password, saltRound);
	const token = null;
	const new_data = {
		username: data.username,
		password: new_hash,
		reset_token: token,
	};
	Users.changePassword(new_data, function (err) {
		if (err) {
			res.status(500).json({error_message: 'Error !'});
		} else {
			console.log(`[${Date(Date.now()).toString()}]: User ${data.username} password changed !`);
			res.status(200).json({message: `User ${data.username} Password was changed !`})
		}
	});
});

/**
 * Route Api for create new User
 */
router.post('/create', function (req, res) {
	/** Protect the input data */
	data = req.body.data;
	let hash = bcrypt.hashSync(data.password, saltRound);
	let token = crypto.randomBytes(50).toString('hex');
	new_data = {
		first_name: data.first_name,
		last_name: data.last_name,
		username: data.username,
		email: data.email,
		password: hash,
		confirmation_token: token
	};
	if (utils.checkIfUsernameExist(new_data.username) === true) {
		return res.status(200).json({message: 'Username exist try again !'})
	} else {
		/** Create users in Db */
		Users.createUser(new_data, function (err) {
			if (err) {
				console.log(err)
				return res.status(500).json({error_message: 'Error'});
			} else {
				UsersInfos.createDefaultInfos(new_data.username)
				UsersPopularity.createDefaultData(new_data.username)
				Search.createDefaultSearch(new_data.username)
				const subject = 'Matcha: Confirme ton inscription';
				const message = `Salut ${new_data.first_name},\n\nhttp://localhost:8080/#/confirme-email/${new_data.confirmation_token}\n\nA tout de suite ;) !`;

				mailer.sendEmail(new_data.email, subject, message);
				res_data = {
					message: 'Success User ' + req.body.username + ' is created'
				};
				console.log(`[${Date(Date.now()).toString()}]: New User ${new_data.username} created !`);
				return res.status(201).json(res_data);
			}
		});
	}
});

module.exports = router;