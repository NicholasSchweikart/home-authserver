const express = require('express'),
  jwt = require('jsonwebtoken'),
  router = express.Router();

/**
 * Preforms token authorization on all incoming requests.
 */
router.all('/*', (req, res, next) => {

  if(!req.headers.authorization && !req.headers.authorization.split(' ')[0] === 'Bearer')
  {
    res.status(401).json({error: "ERR_NOT_LOGGED_IN"});
    return;
  }

  let token = req.headers.authorization.split(' ')[1];

  jwt.verify(token,'#$%9095854Hg22erTuxxVVI058938?',(err, user) =>{

    if(err){
      console.log(`decode err: ${err}`);
      return res.json({success:false, msg: "failed to decode token"});
    }

    req.user = user;

    // Continue on to the next route match.
    next();
  });

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("index");
});

module.exports = router;
