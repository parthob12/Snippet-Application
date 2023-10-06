const Snippet = require('./snippet.model')
const util = require('../util')


// get all users 
const getSnippets = async (req, res) => {
    const { query } = req;
    const language = query.language;
    const includeBookmarks = util.queryToBoolean(query.bookmarks)

    let filter = {};
    if (language) {
        filter = { programming_language: { $regex: language, $options: 'i' } };
    }

    try {
        const snippets = await Snippet.find(filter);
        res.json(snippets);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

