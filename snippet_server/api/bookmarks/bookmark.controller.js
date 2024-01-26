const Bookmark = require('./bookmark.model')
const util = require('../util')



const createBookmark = async (req, res) => {
    const { body } = req;

    try {
        const bookmark = await Bookmark.create(body);
        res.json(bookmark);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}
