var request = require('request');
var data = null;

getData();

function getData(){
  var localVariable = "something important"; //just checking to see if this variable is accessible inside the callback function
  requestData(function(err, resp){
    data = resp;
    console.log("inside callback function");
    console.log(data);
    console.log('localVariable', localVariable);
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
      'authorization': 'Bearer A23AAG53i1fiRd2kS5kSwaQanYV7pxdnuPMaFa4wsPZLZgvZQycXnOBZDyxu4vEDTOZJhZs5TG0wSamO_gxFeTcRDnfiL-NsA',
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
