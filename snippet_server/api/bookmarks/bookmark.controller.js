const Bookmark = require('./bookmark.model')
const util = require('../util')



const createBookmark = async (req, res) => {
    const { body } = req;

