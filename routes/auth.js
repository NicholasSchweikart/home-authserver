const router = require('express').Router();
const db = require('../db.js');


  /* GET users listing. */
  router.post('/registerUser', (req, res, next) => {

    console.log(`authRoutesMethods: registerUser: req.body is:`, req.body);

    //query db to see if the user exists already
    db.getUser(req.body.username, (err, doesUserExist) => {

      //check if the user exists
      if (err !== null || doesUserExist){

        //message to give summary to client
        const message = err !== null ? "Operation unsuccessful" : "User already exists"

        //detailed error message from callback
        const error =  err !== null ? err : "User already exists";

        sendResponse(res, message, err)

        return
      }

      //register the user in the db
      db.registerUser(req.body.username, req.body.password, (err) => {

        //create message for the api response
        const message =  err === null  ? "Registration was successful" : "Failed to register user";

        sendResponse(res, message, err)
      })
    })
  });

  router.post('/login', expressApp.oauth.grant());

//sends a response created out of the specified parameters to the client.
//The typeOfCall is the purpose of the client's api call
function sendResponse(res, message, error) {

  res
    .status(error !== null ? error !== null ? 400 : 200 : 400)
    .json({
      'message': message,
      'error': error,
    })
}




