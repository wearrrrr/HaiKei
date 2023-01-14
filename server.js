require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const helmet = require("helmet");
const SQLiteStore = require('connect-sqlite3')(session);
const limit = require('express-limit').limit;
const app = express();
const port = process.env.PORT || 3000;

app.locals.pluralize = require('pluralize');

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    originAgentCluster: false,
    frameguard: false,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name : '.HKSECURITY',
  secret: process.env.AUTH_SECRET || "tacocat", // absolutely set a AUTH_SECRET for production...
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(flash());
app.use(csrf());
app.use(limit({max: 50, period: 30 * 1000, message: "Request Limit Exceeded!" }), passport.authenticate('session'));
app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);


app.set('views', 'public')
app.listen(port);

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error', {loginState: "false"});
// });

app.get('/test', (req, res) => {
    res.render('test.ejs')
})

app.use('/', require('./routers/index.js'));
app.use('/api', require('./routers/api.js'))
app.use('/', require('./routers/auth.js'))
app.use('/watchlist', require('./routers/watchlist.js'))
app.use('/search', require('./routers/search.js'));
app.use('/trending', require('./routers/trending.js'));
app.use('/releases', require('./routers/releases.js'));
app.use('/genres', require('./routers/anime/genre/genres.js'));
app.use('/genre/', require('./routers/anime/genre/genre.js'))
app.use('/watch', require("./routers/anime/watch.js"));

// let init = process.send("Web Server Init!")
