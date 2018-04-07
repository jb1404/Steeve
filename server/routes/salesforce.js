const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');


var jsforce = require('jsforce');
var conn = new jsforce.Connection({
  serverUrl : 'https://eu8.lightning.force.com',
  sessionId : 'Y418sfqB38wyuQnCi9UkP50wO'
});


conn.login('julien@bloch.com', 'd817a40fc2Y418sfqB38wyuQnCi9UkP50wO', function(err, userInfo) {
  if (err) { return console.error(err); }
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ...
});


router.put('/opportunity', passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  console.log("DEBUG req.body", req.body);
  
  conn.sobject("Opportunity").update({ 
    Id : '0060N00000VXUluQAH',
    Description : req.body.description
  }, function(err, ret) {
    if (err || !ret.success) { return console.error(err, ret); }
    console.log('Updated Successfully : ' + ret.id);
    // ...
  });

})


module.exports = router;