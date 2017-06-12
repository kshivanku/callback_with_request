var request = require('request');
var data = null;

getData();

function getData(){
  requestData(function(err, resp){
    data = resp;
    console.log("inside callback function");
    console.log(data);
  });
  console.log("this gets executed anyway");
}

function requestData(callback){
  console.log("inside requestData function");
  var requestBody = {
    "amount": {
      "value": "12",
      "currency": "USD"
    },
    "payee": {
      "id": "abcbusiness@business.com",
      "type": "EMAIL"
    },
    "fee": {
      "payer": "PAYER"
    },
    "payment_type": "PERSONAL"
  }
  request({
    headers: {
      'authorization': 'Bearer A23AAEyVzKAkM3OJ1USo5knmWeQEyChwZo5AEZ448AXwKZl4PuP_CmQL8VCrZfk67Z_NbtM80L5qpSKZ-FYVqFOiQ9r8I8jCA',
      'accept': 'application/json',
      'accept_language': 'en_US',
      'content_type': 'application/json'
    },
    uri: 'https://api.sandbox.paypal.com/v1/payments/personal-payments/funding-options',
    json: requestBody,
    method: 'POST'
  }, function(err, response, body) {
    console.log("request completed");
    callback(null, body.funding_options);
    // return body.funding_options;
  });
}
