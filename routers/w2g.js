const express = require('express')
const router = express.Router()
const makeID = require('../utils/makeID.js')
const { getRoomData } = require('../server.js');


router.get("/", (req, res) => {
    const roomData = getRoomData();
    const filteredRoomData = {}
    Object.keys(roomData).forEach((room) => {
        if (roomData[room].isPublic == true) {
            filteredRoomData[room] = roomData[room]
        }
    }) 
    res.render("w2g.ejs", {
        loginState: req.user ? true : false,
        username: req.user ? req.user.username : null,
        url: req.originalUrl,
        roomData: JSON.stringify(filteredRoomData),
    })
})

router.get("/create", (req, res) => {
    const roomName = makeID(5);
    res.redirect(`/w2g/room/${roomName}`)
})

router.get("/room/:room", (req, res) => {
    res.render("w2g_room.ejs", {
        loginState: req.user ? true : false,
        username: req.user ? req.user.username : null,
        url: req.originalUrl,
        room: req.params.room,
    })
})


module.exports = router;