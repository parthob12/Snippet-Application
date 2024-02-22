const router = require('express').Router();
const controller  = require('./bookmark.controller.js');
const middleware = require("../middleware/authorization.js")
const util = require('../util');


// POST /bookmarks
router.post('/', middleware.verifyToken, controller.createBookmark);

// DELETE /bookmarks/:id
router.delete('/:id',middleware.verifyToken, controller.deleteBookmark);

module.exports = router;
