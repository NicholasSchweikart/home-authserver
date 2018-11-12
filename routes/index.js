const express = require('express'),
  jwt = require('jsonwebtoken'),
  router = express.Router();

/**
 * Preforms token authorization on all incoming requests.
 */
router.all('/*', (req, res, next) => {

  let token = req.signedCookies.token;

  if(!token && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  {
    token = req.headers.authorization.split(' ')[1];
  }

  jwt.verify(token,'#$%9095854Hg22erTuxxVVI058938?',(err, decodedToken) =>{

    if(err){
      console.log(`decode err: ${err}`);
      if(err.name === 'TokenExpiredError')
        res.clearCookie('token');
      return res.status(401).json({err: err});
    }
    next()
  });


});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("");
});

module.exports = router;
