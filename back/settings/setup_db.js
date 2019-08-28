var ex_mysql = require('mysql');

var mysql = ex_mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'matcha'
});

mysql.connect(function (err) {
	if (err) throw err;
	console.log('---  Connected in Mysql  ---');

	/**
	 * Create Database "matcha_db"
	 */
	mysql.query('create database if not exists matcha_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;', function (err) {
		if (err) throw err;
		console.log('---  Database `matcha_db` Created  ---');
	});

	/**
	 * Create Table "Users"
	 *
	 * This Table content the min information for created one user
	 */
	mysql.query(`create table if not exists matcha_db.users(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		username VARCHAR(255) NOT NULL UNIQUE,
		first_name VARCHAR(255) NOT NULL,
		last_name VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL,
		password TEXT NOT NULL,
		confirmation_token VARCHAR(255) NULL UNIQUE,
		confirmed_at DATETIME NULL,
		reset_token VARCHAR(255) NULL UNIQUE,
		mail_active TINYINT(1) DEFAULT 1 NOT NULL,
		admin TINYINT(1) DEFAULT 0 NOT NULL
	);`, function (err) {
		if (err) throw err;
		console.log('---  Table `users` Created  ---');
	});

	/**
	 * Create Table "Users_infos"
	 *
	 * This Table content all information for completed one user
	 */
	mysql.query(`create table if not exists matcha_db.users_infos(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		username VARCHAR(255) NOT NULL UNIQUE,
		gender VARCHAR(21) NOT NULL DEFAULT "non-binaire",
		age INT NOT NULL DEFAULT 18,
		sexual_orientation VARCHAR(42) DEFAULT "bisexuelle" NOT NULL,
		localization VARCHAR(255) not NULL default "latitude:0, longitude:0",
		lat float(53) not null default 0,
		lng float(53) not null default 0,
		bio VARCHAR(255) NULL,
		pic VARCHAR(255) NOT NULL DEFAULT "default.gif",
		count_pic int not null default 0
	);`, function (err) {
		if (err) throw err;
		console.log('---  Table `users_infos` Created  ---');
	});


	/**
	 * Create Table "Users_connect_token"
	 *
	 * This table content all token of connection for one user
	 */
	mysql.query(`create table if not exists matcha_db.users_token(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		uid INT NOT NULL,
		token VARCHAR(250) NOT NULL UNIQUE,
		navigator VARCHAR(250) NULL,
		ip_address VARCHAR(250) NULL,
		created_at DATETIME DEFAULT now() NOT NULL,
		end_at datetime null
	);`, function (err) {
		if (err) throw err;
		console.log('---  Table `users_connect_token` Created  ---');
	});

	mysql.query(`create table if not exists matcha_db.users_notifs(
		id int not null auto_increment primary key,
		username varchar(255) not null,
		notif varchar(255) not null,
		link varchar(255) not null,
		vu BOOLEAN default false not null,
		create_at datetime default now() not null
	);`, function (err) {
		if (err) throw err;
		console.log('---  Table `users_notifs` Created  ---');
	});

	/**
	 * Create Table "users_photos"
	 */
	mysql.query(`create table if not exists matcha_db.users_photos(
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			username VARCHAR(255) NOT NULL,
			pic_name VARCHAR(255) NOT NULL
		);`, function (err) {
		if (err) throw err;
		console.log('---  Table `users_photos` Created  ---');
	});

	/**
	 * Create Table "users_popularity"
	 */
	mysql.query(`create table if not exists matcha_db.users_popularity(
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			username VARCHAR(255) NOT NULL unique,
			matchs int not null default 0,
			likes int not null default 0,
			views int not null default 0,
			score int not null default 0
	);`, function (err) {
		if (err) throw err;
		console.log('---  Table `users_popularity` Created  ---');
	});

	/**
	 * Create Table "Likes"
	 */
	mysql.query(`create table if not exists matcha_db.likes(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		from_username VARCHAR(255) NOT NULL,
		to_username VARCHAR(255) NOT NULL
	);`, function (err) {
		if (err) throw err;
		console.log('---  Table `likes` Created  ---');
	});

	/**
	 * Create Table "Tags"
	 */
	mysql.query(`create table if not exists matcha_db.tags(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		name_tag VARCHAR(255) UNIQUE NOT NULL,
		picture_tag VARCHAR(255) NOT NULL
	);`, function (err) {
		if (err) throw err;
		console.log('---  Table `tags` Created  ---');
	});

	/**
	 * Insert Table "Tags"
	 */
	mysql.query(`INSERT IGNORE INTO matcha_db.tags (name_tag, picture_tag)
	VALUES ('rock','music'), ('classique', 'music'), ('raeggeton', 'music'), ('soul', 'music'), ('disco', 'music'), ('rap','music'), ('blues', 'music'), ('RnB', 'music'), ('metal', 'music'), ('piscine', 'dumbbell'), ('boxe', 'dumbbell'), ('course', 'dumbbell'), ('tennis', 'dumbbell'), ('musculation', 'dumbbell'), ('football', 'dumbbell'), ('danse', 'dumbbell'), ('piscine', 'dumbbell'), ('golf', 'dumbbell'), ('soirée','cocktail'), ('amis', 'cocktail'), ('lire', 'cocktail'), ('peindre', 'cocktail'), ('concert', 'cocktail'), ('cinéma','cocktail'), ('restaurent', 'cocktail'), ('action', 'film'), ('indépendant', 'film'), ('animation', 'film'), ('thriller','film'), ('horreur', 'film'), ('documentaire','film'), ('science-fiction', 'film');`,
	function (err) {
		if (err) throw err;
		console.log('---  Table `tags` Updated  ---');
	});

	/**
	 * Create Table "Users_tags"
	 */
	mysql.query(`create table if not exists matcha_db.users_tags(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		username VARCHAR(255) NOT NULL,
		user_name_tag VARCHAR(255) NOT NULL,
		user_picture_tag VARCHAR(255) NOT NULL
		);`, function (err) {
		if (err) throw err;
		console.log('---  Table `users_tags` Created  ---');
	});



	/**
	 * Create Table "Search"
	 */
	mysql.query(`create table if not exists matcha_db.search(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		username VARCHAR(255) NOT NULL UNIQUE,
		search_age int not null default 18,
		search_gender VARCHAR(21) NOT NULL default "non-binaire",
		search_sexual_orientation VARCHAR(42) DEFAULT "bisexuelle" NOT NULL,
		search_localization VARCHAR(255) NULL,
		search_popularity int not null default 0
	);`, function (err) {
		if (err) throw err;
		console.log('---  Table `search` Created  ---');
	});


	/**
	 * Create Table "FakeAccounts"
	 */
	mysql.query(`create table if not exists matcha_db.fake_accounts(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		username VARCHAR(255) NOT NULL UNIQUE
	);`, function (err) {
		if (err) throw err;
		console.log('---  Table `fake_accounts` Created  ---');
	});

	/**
	 * Create Table "users_block"
	 */
	mysql.query(`create table if not exists matcha_db.users_block(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		from_username VARCHAR(255) NOT NULL,
		to_username VARCHAR(255) NOT NULL
	);`, function (err) {
		if (err) throw err;
		console.log('---  Table `users_block` Created  ---');
	});

	/**
	 * Create Table "users_history"
	 */
	mysql.query(`create table if not exists matcha_db.users_history(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		from_username VARCHAR(255) NOT NULL,
		to_username VARCHAR(255) NOT NULL,
		view_at datetime not null default now()
	);`, function (err) {
		if (err) throw err;
		console.log('---  Table `users_history` Created  ---');
	});

	/**
	 * Create Table "users_chat"
	 */
	mysql.query(`create table if not exists matcha_db.users_chat(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		username VARCHAR(255) NOT NULL,
		message VARCHAR(255) NOT NULL,
		send_at datetime not null default now(),
		id_room INT NOT NULL
	) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`, function (err) {
		if (err) throw err;
		console.log('---  Table `users_chat` Created  ---');
	});


	/**
	 * Create Table "chatroom"
	 */
	mysql.query(`create table if not exists matcha_db.chatroom(
		id int not null auto_increment primary key,
		username_1 VARCHAR(255) not null,
		username_2 VARCHAR(255) not null
		);`, function (err) {
			if (err) throw err;
			console.log('---  Tables `chatroom` Created  ---');
	});
});

module.exports = mysql;