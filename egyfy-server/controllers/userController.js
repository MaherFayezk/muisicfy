const User = require('../models/user');

User.load();
exports.login = (req, res) => {
    let user = User.authonticate(req.body.username, req.body.password);
    if (user == null) {
        return res.status(400).send("NOT FOUND");
    }
    else {
        res.status(200).send(user);
    }
}

exports.getPlaylist = (req, res) => {
    console.log("Token on server",req.headers["token"]);
    let user = User.getByToken(req.headers["token"]);
    let playlist=user.getPlaylist();
    res.status(200).send(playlist);
}

exports.addToList = (req, res) => {

    let user = User.getByToken(req.body.token);
    let list = user.addToPlaylist(req.params.sId);
    if (list == null) {
        return res.status(400).send("NOT FOUND");
    }
    else {
        res.status(200).send(list);
    }
}

exports.removeFromList = (req, res) => {
    let user = User.getByToken(req.body.token);
    console.log("ee", req.params.sId);
    let list = user.removeFromPlaylist(req.params.sId);
    if (list == null) {
        return res.status(400).send("NOT FOUND");
    }
    else {
        res.status(200).send(list);
    }
}