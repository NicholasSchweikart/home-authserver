/**
 * Login router file for Voto system.
 * @type {*|createApplication}
 */
const express = require("express"),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.model('Users', new Schema({
  email: { type: String, default: '' },
  password: { type: String },
  username: { type: String }
}));

const User = mongoose.model('Users');

/**
 * @api {post} api/login Login as a specific user
 * @apiName Login User
 * @apiGroup Login
 * @apiPermission ALL
 *
 * @apiParam {String} userName Users unique name.
 * @apiParam {String} password Users account password.
 *
 * @apiParamExample {json} Request Example
 * {"userName":"User123", "password":"password"}
 *
 * @apiSuccess {json} user The user.
 * @apiSuccess {json} token The new access token.
 * @apiSuccessExample {json} The user object and a new access token
 *    HTTP/1.1 200 OK
 *    [{
 *   "user": {
 *       "userId": 1,
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "userName": "User123",
 *       "creationDate": "2017-08-23T03:35:50.000Z",
 *       "type": "T",
 *       "email": "teacher@teacher.com"
 *   },
 *   "token": "eyJhbGciOiJ...."
 * }]
 */
router.post('/', (req, res) => {

  console.log(req.body);
  User.findOne({username:req.body.username, password:req.body.password})
    .lean()
    .exec((err, usr)=>{
      if(usr){
        console.log(`user:${usr}`);

        // Create and send token
        jwt.sign(usr,'#$%9095854Hg22erTuxxVVI058938?',{expiresIn:'7d'}, (err, token)=>{
          if(err)
            res.status(500).json({error: err});
          else
            res.cookie('token', token,{maxAge: 86400000, signed: true})
              .json({token:token});
        });
      }
      else
      {
        console.log(`failed to login: ${err}`);
        res.status(401).json({ error: err });
      }
    });

});

router.post("/newUser", (req, res) => {
  const user = new User({username:req.body.username, password:req.body.password});
  user.save((err, usr)=>{
      if(usr){
        console.log(`new user:${usr}`);
        let u = {username:req.body.username, password:req.body.password};
        // Create and send token
        jwt.sign(u,"#$%9095854Hg22erTuxxVVI058938?",{expiresIn:60*60*24}, (err, token)=>{
          if(err)
            res.status(500).json({error: err});
          else
            res.json({token:token});
        });
      }
      else
      {
        console.log(`failed to create user: ${err}`);
        res.status(401).json({ error: err });
      }
    });

});


module.exports = router;
