const express = require('express');
const songController = require('../controllers/songController');
const router = express.Router();
router.get('/', songController.getAll);
router.get('/search', songController.search);
module.exports = router;