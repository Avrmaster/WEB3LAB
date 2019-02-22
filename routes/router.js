let express = require('express');
let router = express.Router();
let User = require('../models/user');
require("dotenv").config();

let nodemailer = require('nodemailer').createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
});

// GET route for reading data
router.get('/', function (req, res, next) {
	let errors = {duplicate: req.params["error"]};
	User.find().exec(function (err, data) {
		if (err)
			return callback(err);
		return res.render('index', {title: 'Реєстрація', data: data, errs: errors});
	});
});

router.post('/sendEmails', (req, res) => {

	User.find().exec((err, data) => {
		if (err) {
			return callback(err);
		}
		data.forEach((item) => {
			const mailOptions = {
				from: 'margal.nik@gmail.com',
				to: item['email'],
				subject: 'Розсилка в рамках курсу "Веб-орієнтовані системи"',
				text: req.body.msg
			};

			nodemailer.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});

		})
	});

	res.redirect('/')
});

router.post("/dump", (req, res) => {
	User.collection.drop();
	return res.redirect("/");
});

//POST route for updating data
router.post('/', (req, res) => {

	let userData = {
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
	};
	User.create(userData, (error, user) => {
		if (error) {
			return res.redirect("/?error=duplicate");
		} else {
			return res.redirect('/');
		}
	});
});

module.exports = router;