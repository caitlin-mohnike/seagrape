var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(process.env.SHOPIFY_API_KEY)
  res.render('index', { title: 'Express' });
});

module.exports = router;
