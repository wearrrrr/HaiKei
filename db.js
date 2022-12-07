var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');
var crypto = require('crypto');

mkdirp.sync('var/db');

var db = new sqlite3.Database('var/db/todos.db');

db.serialize(function() {
  // create the database schema for the todos app
  db.run("CREATE TABLE IF NOT EXISTS users ( \
    email TEXT UNIQUE, \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    email_verified TEXT, \
    hashed_password BLOB, \
    salt BLOB \
  )");
  
  db.run("CREATE TABLE IF NOT EXISTS watchlists ( \
    id INTEGER PRIMARY KEY, \
    owner_id INTEGER NOT NULL, \
    title TEXT NOT NULL, \
    content TEXT \
  )");
});

module.exports = db;
