const mongoose = require('mongoose')


const BookmarkSchema = new mongoose.Schema({
    snippet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snippet'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

})
module.exports = mongoose.model('Bookmark', BookmarkSchema)