require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var csrf = require('csurf');
var passport = require('passport');

var SQLiteStore = require('connect-sqlite3')(session);

var authRouter = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

app.locals.pluralize = require('pluralize');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name : '.HKSECURITY',
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(flash());
app.use(csrf());
app.use(passport.authenticate('session'));
app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);


app.set('views', 'public')
app.listen(port);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.use('/', require('./routers/index.js'));
app.use('/', authRouter)
app.use('/search', require('./routers/search.js'));
app.use('/trending', require('./routers/trending.js'));
app.use('/releases', require('./routers/releases.js'));
app.use('/anime', require('./routers/anime.js'))
app.use('/genres', require('./routers/anime/genre/genres.js'));
app.use('/genre/', require('./routers/anime/genre/genre.js'))
app.use('/watch', require("./routers/anime/watch.js"));

// let init = process.send("Web Server Init!")
