require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const helmet = require("helmet");
const SQLiteStore = require('connect-sqlite3')(session);
const limit = require('express-limit').limit;
const { createServer } = require("http");
const { Server } = require("socket.io");
const filter = require('leo-profanity');
const { getSources, getShowInfo, getVideoSourcesGogoanime, getVideoSourcesZoro } = require('./utils/getSources');

const app = express();
const port = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {   
    cors: {
    origin: process.env.WEBSITE_URL && "http://localhost:3000",
    methods: ["GET", "POST"]
} });

const roomData = {};

io.on("connection", (socket) => {
  let room;
  setInterval(() => {
    checkRoomMembers(roomData);
  }, 1000);
  function createRoom(roomID) {
    room = roomID
    socket.join(room)
    roomData[room] = {
      users: {},
      hostID: socket.id,
      currentTime: 0,
      roomID: roomID,
      isPublic: true,
      roomName: "Untitled Room",
      roomDescription: "No description provided.",
      playing: false,
      currentManifest: ""
    }
    roomData[room].users[socket.id] = {
      ping: -1,
      id: socket.id,
      isHost: true,
    }
  }

  function joinRoom(roomID) {
    room = roomID
    socket.join(room)
    roomData[room].users[socket.id] = {
      ping: -1,
      id: socket.id,
      isHost: false,
    }
    console.log("send video down to user")
    if (roomData[room].playing == true) {
      if (roomData[room].currentManifest == "") return console.log("No manifest to send to user");
      socket.emit("receiveUserVideoFromHost", {videoData: roomData[room].currentManifest, currentTime: roomData[room].currentTime});
    }
  }

  socket.on("init", (data) => {
    if(io.sockets.adapter.rooms.get(data.roomID) != undefined && io.sockets.adapter.rooms.get(data.roomID).size > 0){
      joinRoom(data.roomID)
    } else {
      createRoom(data.roomID)
    }
  })
  socket.on('disconnect', () => {
    let idToRemove = socket.id
    // Update the user information to make sure they are not a host, because it will be recycled to another user and we want to avoid edge cases :)
    if (roomData[room] !== undefined) {
      roomData[room].users[socket.id] = {
        ping: -1,
        id: socket.id,
        isHost: false,
      }
      socket.disconnect()
      delete roomData[room].users[idToRemove]
    }
  });

  function checkRoomMembers() {
    if (roomData[room] == undefined) return
      if (Object.keys(roomData[room].users).length < 1) {
        delete roomData[room]
      }
  }
  socket.on("ping", (callback) => {
      callback();
  });

  socket.on("updateUserPing", (data) => {
    if (roomData[room] === undefined) return;
    roomData[room].users[socket.id].ping = data.ping;
    socket.emit("receiveNewUserList", {users: roomData[room].users}) 
    let shouldRotateHost = true; 
    for (let userId in roomData[room].users) {
      if (roomData[room].users.hasOwnProperty(userId)) {
        const user = roomData[room].users[userId];
        if (user.id == roomData[room].hostID) shouldRotateHost = false;
      }
    }
    if (shouldRotateHost) {
      const potentialHostList = Object.keys(roomData[room].users);
      const newHostId = potentialHostList[Math.floor(Math.random() * potentialHostList.length)];
      roomData[room].hostID = newHostId;
      const newHostSocket = io.sockets.sockets.get(newHostId);
      roomData[room].users[newHostId].isHost = true;
      newHostSocket.emit("receiveNewHostMessage", {message: "You are now the host!"});
    }
  });


  socket.on("updateRoomName", (data) => {
    if (roomData[room] === undefined) return;
    if (roomData[room].users[socket.id].isHost == false) return socket.emit("permissionDenied", {message: "You are not the host!"});
    let cleanRoomName = filter.clean(data.newRoomName);
    roomData[room].roomName = cleanRoomName;
  })

  socket.on("updateRoomDescription", (data) => {
    if (roomData[room] === undefined) return;
    if (roomData[room].users[socket.id].isHost == false) return socket.emit("permissionDenied", {message: "You are not the host!"});
    let cleanRoomDescription = filter.clean(data.newRoomDescription);
    roomData[room].roomDescription = cleanRoomDescription;
  });

  socket.on("playVideo", async (data) => {
    try {
      if (roomData[room] === undefined) return;
      if (roomData[room].users[socket.id].isHost == false) return socket.emit("permissionDenied", {message: "You are not the host!"});
      if (data.videoID == undefined) return;
      let videoID = data.videoID;
      let showInfo = await getShowInfo(videoID);
      let malID = showInfo.malId;
      let videoInfo = await getSources(malID);
      socket.emit("receiveNewVideo", {videoData: videoInfo, showInfo: showInfo});
    } catch {
      return socket.emit("permissionDenied", {message: "An error occured while trying to obtain video info!"});
    }
  });

  socket.on("serverGetNewSource", (data) => {
    if (roomData[room] === undefined) return;
    if (roomData[room].users[socket.id].isHost == false) return socket.emit("permissionDenied", {message: "You are not the host!"});
    
    console.log(data)
  })

  socket.on("playNewVideo", async (data) => {
    if (roomData[room] === undefined) return;
    if (roomData[room].users[socket.id].isHost == false) return socket.emit("permissionDenied", {message: "You are not the host!"});
    if (data.showID == undefined) return socket.emit("permissionDenied", {message: "No video ID provided!"});
    let videoID = data.showID;
    if (data.source == "gogoanime") {
      let sources = await getVideoSourcesGogoanime(data.episodeID);
      io.to(data.roomID).emit("sendNewVideo", { source: sources })
    }
    if (data.source == "zoro") {
      let sources = await getVideoSourcesZoro(data.zoroID, data.episodeNumber);
      io.to(data.roomID).emit("sendNewVideoZoro", { source: sources })
    }
  })

  socket.on("updateVideoStatus", async (data) => {
    if (roomData[room] === undefined) return;
    if (roomData[room].users[socket.id].isHost == false) return socket.emit("permissionDenied", {message: "You are not the host!"});
    roomData[room].playing = data.status;
    console.log(roomData[room].playing)
  })

  socket.on("serverUpdateManifest", (data) => {
    if (roomData[room] === undefined) return;
    if (roomData[room].users[socket.id].isHost == false) return socket.emit("permissionDenied", {message: "You are not the host!"});
    roomData[room].currentManifest = data.currentManifest;
    console.log(roomData[room].currentManifest)
  })

  socket.on("getCurrentTime", (data) => {
    if (roomData[room] === undefined) return;
    socket.emit("receiveCurrentTime", {currentTime: roomData[room].currentTime})
  })
  
  socket.on("beginCurrentTimeUpdates", (data) => {
    if (roomData[room] === undefined) return;
    if (roomData[room].users[socket.id].isHost == false) return socket.emit("permissionDenied", {message: "You are not the host!"});
    setInterval(() => {
      console.log(roomData[room].currentTime)
      socket.emit("receiveCurrentTime", {currentTime: roomData[room].currentTime})
    }, 5000);
  })
});




io.listen(3001);

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
app.use(limit({max: 10, period: 5 * 1000, message: "Request Limit Exceeded!" }), passport.authenticate('session'));

app.use(express.static('public'))
app.engine('art', require('express-art-template'));

app.set('views', 'public')
app.listen(port);

function getRoomData() {
  return roomData;
}

module.exports = {
  getRoomData
};


// Set up app routes
app.use('/', require('./routers/index.js'));
app.use('/', require('./routers/auth.js'));
app.use('/w2g', require('./routers/w2g.js'));
app.use('/api', require('./routers/api.js'))
app.use('/ajax', require('./routers/ajax.js'))
app.use('/watchlist', require('./routers/watchlist.js'))
app.use('/search', require('./routers/search.js'));
app.use('/trending', require('./routers/trending.js'));
app.use('/releases', require('./routers/releases.js'));
app.use('/genres', require('./routers/anime/genre/genres.js'));
app.use('/genre/', require('./routers/anime/genre/genre.js'))
app.use('/watch', require("./routers/anime/watch.js"));
