var express = require('express');
var router = express.Router();

const axios = require('axios');
var qs = require('qs');

var hash = require('object-hash');
var shopify_url = "https://seagrape-apothecary-2.myshopify.com"

var shopify_url_with_auth = "https://"
					+process.env.SHOPIFY_API_KEY
					+":"
					+process.env.SHOPIFY_API_SECRET_KEY
					+"@seagrape-apothecary-2.myshopify.com"


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create-draft-order', function(req, res, next) {
	console.log(req.body);
	createDraftOrder(req.body);
  
  function createDraftOrder(orderInfo) {
      var draftOrderItems = orderInfo.cart;
    
      var customerID = {
        "id": orderInfo.customer_id
      }
      
      let draft_order = {
          "line_items": draftOrderItems,
          "customer": customerID,
          "note": "PO #: "+orderInfo.po_number
        }

      postDraftOrder(draft_order)
  }
  
  // function getCustomerID() {
    
  // }
  
  // function getPONumber() {
    
  // }
  
  function postDraftOrder(data) {
    console.log(data);
    var draft_order = data;
    axios({
	  method: 'post',
	  url: shopify_url_with_auth+'/admin/api/2020-01/draft_orders.json',
	  data: {
	    draft_order
	  },
	  headers: { 'content-type': 'application/json' },
	})
	  .then(function (response) {
	    console.log(response.statusText);
	    completedOrder(response.statusText)
	  })
	  .catch(function (error) {
	    if (error.response) {
	      // The request was made and the server responded with a status code
	      // that falls out of the range of 2xx
	      console.log(error.response.data);
	      console.log(error.response.status);
	      console.log(error.response.headers);
	    } else if (error.request) {
	      // The request was made but no response was received
	      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
	      // http.ClientRequest in node.js
	      console.log(error.request);
	    } else {
	      // Something happened in setting up the request that triggered an Error
	      console.log('Error', error.message);
	    }
	    console.log(error.config);
	  })
	  .finally(function () {
	  });
	}

	function completedOrder(text) {
		res.send(text)
	}

});


module.exports = router;
