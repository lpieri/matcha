var express = require('express');
var bodyParser = require('body-parser');
var Tags = require('./Tags');
var router = express.Router();

router.use(bodyParser.json());

/*************************************************************************************/
/**								Route Api Only get Methods							 */
/*************************************************************************************/

/**
 * Route Api for get all tags
 */

router.get('/get-all-tags/', function (req, res) {
	Tags.getAllTags((err, rows) => {
		if (rows) {
			return res.status(200).json({
				message: 'Success get tags',
				tags: rows
			});
		} else {
			return res.status(400).json({error: err})
		}
	});
});

router.get('/get-all/:username', function (req, res) {
	const username = req.params.username
	Tags.getTags(username, (err, rows) => {
		if (rows) {
			return res.status(200).json({
				message: 'Success get tags',
				tags: rows
			});
		} else {
			return res.status(400).json({error: err})
		}
	});
});

router.post('/create', function (req, res) {
	const data = req.body.data;
	const new_data = {
		name_tag: data.name_tag,
		picture_tag: data.picture_tag
	};
	Tags.createTag(new_data, function (err) {
		if (err) {
			return res.status(400).json(err);
		} else {
			res_data = {
				message: 'New tag add'
			};
			return res.status(200).json(res_data);
		}
	});
});


router.put('/insert-tags', function (req, res) {
	Tags.createTags( function (err, rows) {
		if (rows) {
			// console.log('Success first name');
			return res.status(200).json({message: ``});
		} else {
			return res.status(400).json({message: `Error`});
		}
	});
});

module.exports = router;
