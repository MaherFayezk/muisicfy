const Song = require('../models/songs');

exports.getAll = (req, res) => {
    res.status(200).send(Song.fetchAll());
}
exports.search = (req, res) => {
    res.status(200).send(Song.find(req.query.keyword));
}
exports.getById = (req, res) => {
    res.status(200).send(Song.findById(req.params.sId));
}