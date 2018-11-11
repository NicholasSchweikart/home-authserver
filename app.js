const express = require("express"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  loginRouter = require("./routes/loginRouter"),
  app = express(),
  logger = require('morgan');

const indexRouter = require('./routes/index');

const mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = 'Home';

mongoose.connect(`mongodb://${server}/${database}`)
  .then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error')
  });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('#$%9095854Hg22erTuxxVVI058938?'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
  {
    secret: '#$%9095854Hg22erTuxxVVI058938?',
    saveUninitialized: true,
    resave: true,
    rolling: true,
    cookie: {
      path: "/",
      maxAge: 2 * 1800000,  // 60 min max cookie life
      httpOnly: true,       // Hide from JavaScript
      // secure: true       //TODO Require an HTTPS connection by uncommenting here
    },
    name: "id", // Change cookie name to obscure inner workings
  },
));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use('/auth', indexRouter);
app.use("/app/login", loginRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});
console.log("Lets get going");

module.exports = app;
