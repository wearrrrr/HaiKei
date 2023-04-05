const express = require('express');
const app = express.Router();
const axios = require('axios');
const config = require('../../config.js');
const consumetURL = config.app.api_url3;

app.get("/:status", async (req, res) => {
    let fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
    const allowedStatus = ["RELEASING", "NOT_YET_RELEASED", "FINISHED"]
    function rewriteStatusNameForClient() {
        switch (inputtedStatus) {
            case "RELEASING":
                return "Releasing Anime:";
            case "NOT_YET_RELEASED":
                return "Not Yet Released Anime:";
            case "FINISHED":
                return "Finished Anime:";
            case "CANCELLED":
                return "Cancelled Anime:";
            default:
                return "Unknown Status:";
        }
    }
    const inputtedStatus = req.params.status.toUpperCase();
    if (!allowedStatus.includes(inputtedStatus)) {
        return res.status(400).send("Invalid status!");
    }
    try {
        let loginState;
        const loginCheck = req.user !== undefined ? loginState = true : loginState = false;
        const requestData = await axios.get(`${consumetURL}meta/anilist/advanced-search?status=${inputtedStatus}`)
        const responseData = await requestData.data;
        const properStatusName = rewriteStatusNameForClient();
        if (loginCheck == true) {
            let username = req.user.username;
            return res.status(200).render("status.ejs", {data: responseData, status: properStatusName, url: fullURL, loginState: loginState, username: username})
        } else {
            return res.status(200).render("status.ejs", {data: responseData, status: properStatusName, url: fullURL, loginState: loginState})
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send("Internal Server Error");
    }

});

module.exports = app;