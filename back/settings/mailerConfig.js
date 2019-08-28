var nodemailer = require('nodemailer');

const userMail = 'email'
const userPass = 'password'

class mailer {
	constructor () {
		this.config = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: userMail,
				pass: userPass
			}
		})
	}

	sendEmail (mailUser, mailSubject, mailMessage) {
		let mailOption = {
			from: `Matcha <${userMail}>`,
			to: mailUser,
			subject: mailSubject,
			text: mailMessage,
			headers: {
				'X-Priority': '3',
				'X-Mailer': 'EOAMailer 5.0.0',
				'MIME-Version': '1.0',
				'Content-Transfer-Encoding': '8bit',
				'Content-Type': 'text/html; charset="iso-8859-1"'
			}
		};
		this.config.sendMail(mailOption, (err, info) => {
			if (err) {
				console.log(err);
			}
			return (info);
		})
	}
}



module.exports = new mailer
